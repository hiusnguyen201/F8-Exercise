const model = require("../models/index");
const { getPaginateUrl } = require("../utils/url");
const validate = require("../utils/validate");

const { Op } = require("sequelize");
const moment = require("moment");
const md5 = require("md5");
const { validationResult } = require("express-validator");

const { PER_PAGE } = process.env;
const Customer = model.Customer;
const Province = model.Province;

module.exports = {
    index: async (req, res) => {
        const { keyword, status } = req.query; 
        const session = req.session;
        // Filters
        const filters = {};
        
        filters.deletedAt = {
            [Op.is]: null
        }

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

        // Tinh tong so ban ghi
        const totalCount = await (await Customer.findAndCountAll({ where: filters })).count;

        // Tinh tong so trang
        const totalPage = Math.ceil(totalCount / PER_PAGE);

        // Lay trang hien tai
        let { page } = req.query;
        if (!page || page < 1) {
            page = 1;
        } else if(page > totalPage) {
            page -= 1;
        }
        
        // Tinh offset
        const offset = (page - 1) * PER_PAGE;

        const customerList = await Customer.findAll({
            where: filters,
            limit: +PER_PAGE,
            offset: offset,
        });

        res.render("customers/index", {req, session, customerList, page, PER_PAGE, moment, totalPage, getPaginateUrl});
    },

    create: async (req, res) => {
        const provinceList = await Province.findAll();
        const { msg } = req.flash("msg");
        const success = req.flash("success");
        const errors = req.flash("errors");
        const oldValueObj = (req.session.oldValueList)? req.session.oldValueList : {};
        res.render("customers/create", { msg, validate, errors, provinceList, oldValueObj, success });
    },

    store: async (req, res) => {
        const errors = validationResult(req);
        req.session.oldValueList = req.body;
        if (errors.isEmpty()) {
            req.body.password = md5(req.body.password);
            req.body.province_id = +req.body.province_id;
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
        const { id } = req.params;
        const { msg } = req.flash("msg");
        const success = req.flash("success");
        const errors = req.flash("errors");
        
        const customerDetail = await (await Customer.findByPk(id)).dataValues;
        const provinceList = await (await Province.findAll());
        if(!customerDetail) {
            next(createError(404));
            return;
        } 

        if(customerDetail) {
            res.render("customers/update", {success, msg, customerDetail, validate, errors, provinceList});
        } else {
            res.redirect("/error");
        }
    },

    handleUpdate: async(req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);
        const customerDetail = await Customer.findByPk(id);
        if(!customerDetail) {
            next(createError(404));
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
        const { id } = req.params;
        const customerDetail = await Customer.findByPk(id);
        if(!customerDetail) {
            next(createError(404));
            return;
        } 

        customerDetail.destroy(customerDetail);
        res.redirect("/customers");
    },

    destroyAll: async (req, res) => {
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