const model = require("../models/index");
const { getPaginateUrl } = require("../utils/url");
const validate = require("../utils/validate");

const { Op } = require("sequelize");
const moment = require("moment");
const md5 = require("md5");
const { validationResult } = require("express-validator");
const session = require("express-session");

const { PER_PAGE } = process.env;
const Customer = model.Customer;
const Province = model.Province;

module.exports = {
    index: async (req, res) => {
        if(!req.session.isLogged) {
            res.redirect("/customers/login");
            return;
        }

        // Filters
        const { keyword, status } = req.query; 
        const filters = {};
        if(status === "active" || status === 'inactive') {
            filters.status = (status === "active")? 1 : 0;
        }
        if(keyword) {
            filters[Op.or] = [
                {
                    name: {
                        [Op.like]: `%${keyword}%`
                    }
                },
                {
                    email: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            ]
        }
        // Check User
        const { user_id, id } = req.session.isLogged;
        if(!(+user_id === 2)) {
            filters.user_id = 1;
            filters.createdBy = id;
        }
        // Tinh tong so ban ghi
        const totalCount = await (await Customer.findAll({where: filters})).length;
        // Tinh tong so trang
        const totalPage = Math.ceil(totalCount / PER_PAGE);
        // Lay trang hien tai
        let { page } = req.query;
        if (!page || page < 1) {
            page = 1;
        } else if(page > totalPage) {
            page -= 1;
        }
        req.session.curPage = page;
        // Tinh offset
        const offset = (page - 1) * PER_PAGE;
        // Lay danh sach customer
        const customerList = await Customer.findAll({
            where: filters,
            limit: +PER_PAGE,
            offset: offset,
        });
        // Lay danh sach name nguoi tao
        const createdByList = [];
        for(var i = 0; i < customerList.length; i++) {
            let customer = await Customer.findByPk(customerList[i].createdBy);
            createdByList.push(customer);
        }
        res.render("customers/index", {req, session, customerList, page, PER_PAGE, moment, totalPage, getPaginateUrl, session, user_id, createdByList});
    },

    login: async (req, res) => {
        if(req.session.isLogged) {
            res.redirect("/");
            return;
        }
        const oldEmail = req.flash("oldEmail");
        const errors = req.flash("errors");
        const msg = req.flash("msg");
        res.render("customers/login", {errors, validate, msg, oldEmail});
    },
    
    hanldeLogin: async (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            const customerLogged = await Customer.findOne({
                where: {
                    email: req.body.email,
                }
            });
            req.session.isLogged = customerLogged;
            res.redirect("/");
        } 
        else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui long nhap day du thong tin");
            req.flash("oldEmail", req.body.email);
            res.redirect("/customers/login");
        }
    },

    logout: async(req, res) => {
        delete req.session.isLogged;
        delete req.session.curPage;
        res.redirect("/customers/login");
    },

    create: async (req, res) => {
        if(!req.session.isLogged) {
            res.redirect("/customers/login");
            return;
        }
        const provinceList = await Province.findAll();
        const msg = req.flash("msg");
        const success = req.flash("success");
        const errors = req.flash("errors");
        const oldValueObj = (req.session.oldValueList)? req.session.oldValueList : {};
        const { user_id } = req.session.isLogged; 
        res.render("customers/create", { msg, validate, errors, provinceList, oldValueObj, success , user_id});
    },

    store: async (req, res) => {
        const errors = validationResult(req);
        req.session.oldValueList = req.body;
        if (errors.isEmpty()) {
            req.body.password = md5(req.body.password);
            req.body.province_id = +req.body.province_id;

            const { user_id, id } = req.session.isLogged;
            if(user_id === 2) {
                req.body.user_id = +req.body.user_id;
            }
            req.body.createdBy = id;
            req.body.updatedAt = new Date();
            req.session.oldValueList = {};
            await Customer.create(req.body);
            req.flash("success", "Them khach hang thanh cong");
            res.redirect("/customers/create");
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui long nhap day du thong tin");
            res.redirect("/customers/create");
        }
    },

    update: async(req, res) => {
        if(!req.session.isLogged) {
            res.redirect("/customers/login");
            return;
        }
        const curPage = req.session.curPage;
        const { id } = req.params;
        const { msg } = req.flash("msg");
        const success = req.flash("success");
        const errors = req.flash("errors");
        
        // Check User
        const filters = {};
        const { user_id } = req.session.isLogged;
        if(!(+user_id === 2)) {
            filters.user_id = 1;
        }
        filters.id = id;

        const customerDetail = await (await Customer.findOne({
            where: filters
        }));

        const provinceList = await (await Province.findAll());
        if(!customerDetail) {
            res.redirect("/error"); 
            return;
        }
        res.render("customers/update", {success, msg, user_id, customerDetail, validate, errors, provinceList, curPage});
    },

    handleUpdate: async(req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);
        const customerDetail = await Customer.findByPk(id);
        if(!customerDetail) {
            res.redirect("/error");
            return;
        } 

        if(errors.isEmpty()) {
            if(req.body.password) {
                req.body.password = md5(req.body.password);
            } else {
                delete req.body.password;
            }

            await customerDetail.update(req.body);
            req.flash("success", "Cap nhat thong tin nguoi dung thanh cong");
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui long nhap day du thong tin");
        }
        
        res.redirect(`/customers/update/${id}`);
    },

    destroy: async(req, res) => {
        if(!req.session.isLogged) {
            res.redirect("/customers/login");
            return;
        }
        const { id } = req.params;

        // Check User
        const filters = {};
        const { user_id } = req.session.isLogged;
        if(!(+user_id === 2)) {
            filters.user_id = 1;
        }
        filters.id = +id;
        
        const customerDetail = await Customer.findOne({
            where: filters
        });

        if(!customerDetail) {
            res.redirect("/error");
            return;
        } 

        customerDetail.destroy(customerDetail);
        res.redirect("/customers");
    },

    destroyAll: async (req, res) => {
        if(!req.session.isLogged) {
            res.redirect("/customers/login");
            return;
        }

        const { stringIds } = req.body;
        const listId = stringIds.split('&');

        for(var i = 0; i < listId.length; i++) {
            let customer = await Customer.findByPk(+listId[i]);

            if(customer) {
                customer.destroy(customer);
            }
        }

        res.redirect("/customers");
    }
};