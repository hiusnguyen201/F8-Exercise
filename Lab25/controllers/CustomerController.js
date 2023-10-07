const Customer = require("../models/Customer");
const Province = require("../models/Province");
const moment = require("moment");
const { Op } = require("sequelize");
const { PER_PAGE } = process.env;
const { getPaginateUrl } = require('../utils/url');
const { validationResult } = require('express-validator');
const validate = require("../utils/validate");
const md5 = require("md5");
const session = require("express-session");

// console.log(PER_PAGE);
// console.log(moment().format('dddd'));

module.exports = {
    // Get lists
    index: async (req, res) => {
        const province = await Province;
        const provinceList = await province.findAll();
        const { keyword, status } = req.query;
        const customer = await Customer;
        const filters = {};

        console.log(Customer);
        console.log(customer);


        if (status === 'active' || status === 'inactive') {
            filters.status = status === "active" ? 1 : 0;
        }

        if (keyword) {
            filters[Op.or] = [
                {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
                {
                    email: {
                        [Op.like]: `%${keyword}%`,
                    }
                }
            ];
        }

        filters.deleted_at = {
            [Op.is]: null
        };

        // Tinh tong so ban ghi
        const totalCountObj = await customer.findAndCountAll({
            where: filters,
        });

        const totalCount = totalCountObj.count;

        // Tinh tong so trang
        const totalPage = Math.ceil(totalCount / PER_PAGE);

        let { page } = req.query;

        // Lay trang hien tai
        if (!page || page < 1) {
            page = 1;
        } else if(page > totalPage) {
            page -= 1;
        }
        req.session.curPage = page;
        
        // Tinh offset
        const offset = (page - 1) * PER_PAGE;

        // console.log(filters);

        const customerList = await customer.findAll({
            // attributes: ['id', 'name', 'email', 'status'],
            where: filters,
            limit: +PER_PAGE, // them + de ep kieu int
            offset: offset,
        });
        
        // console.log(customerList);
        const msg = req.flash("msg");
        res.render("customers/index", { customerList, moment, req, totalPage, page, getPaginateUrl, msg, PER_PAGE, provinceList, session: req.session});
    },

    //Get Form
    create: async (req, res) => {
        const province = await Province;
        const provinceList = await province.findAll();
        const msg = req.flash("msg");
        const errors = req.flash("errors");
        // console.log(errors);
        res.render('customers/create', { provinceList, msg, errors, validate });
    },

    //Post Create
    store: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //Khong co loi
            // console.log('ko co loi');

            //Them du lieu
            const customer = await Customer;
            req.body.password = md5(req.body.password);
            customer.create(req.body);

            req.flash("msg", "Them khach hang thanh cong");
            res.redirect("/customers");
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui long nhap day du thong tin");
            res.redirect("/customers/create");
        }
    },

    update: async (req, res) => {
        const { id } = req.query;
        const customer = await Customer;
        const province = await Province;
        const provinceList = await province.findAll();
        const msg = req.flash("msg");
        const errors = req.flash("errors");

        const customerData = await customer.findOne({
            where: {
                id: id,
            }
        })

        // console.log(customerData);

        const provinceData = await province.findOne({
            where: {
                id: customerData.province_id,
            }
        })

        if (customerData) {
            // console.log({provinceData});
            res.render("customers/update", { customerData, provinceData, provinceList, errors, msg, validate});
        } else {
            res.redirect("/customers");
        }
    },

    updateStore: async (req, res) => {
        const errors = validationResult(req);
        const { id } = req.query;
        if (errors.isEmpty()) {
            const customer = await Customer;
            const customerData = await customer.findOne({
                where: {
                    id: id,
                }
            });

            if (customerData) {
                let listKeyUpdate = {};
                if (customerData.dataValues.name !== req.body.name) {
                    listKeyUpdate.name = req.body.name;
                }

                if (customerData.dataValues.email !== req.body.email) {
                    listKeyUpdate.email = req.body.email;
                }

                if (customerData.dataValues.status !== +req.body.status) {
                    listKeyUpdate.status = req.body.status;
                }

                if ((customerData.dataValues.province_id !== +req.body.province) && (+req.body.province !== 0)) {
                    listKeyUpdate.province_id = req.body.province;
                }


                if (Object.keys(listKeyUpdate).length) {
                    customerData.update(listKeyUpdate);
                    req.flash("msg", "Sua thong tin khach hang thanh cong");
                    res.redirect(`/customers?page=${req.session.curPage}`);
                } else {
                    res.redirect(`/customers/update?id=${id}`);
                }
            }
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Vui long nhap day du thong tin");
            res.redirect(`/customers/update?id=${id}`);
        }
    },

    delete: async (req, res) => {
        const customer = await Customer;
        const { status, keyword } = req.query;
        const customerData = await customer.findOne({
            where: {
                id: req.session.cusId,
            }
        });

        if(customerData) {
            customerData.update({
                deleted_at: moment().format('YYYY/MM/DD hh:mm:ss'),
            });
            
            req.flash("msg", "Xoa thong tin nguoi dung thanh cong");
            if(typeof status === 'undefined' && typeof keyword === 'undefined') {
                res.redirect(`/customers?page=${req.session.curPage}`);
            } else {
                res.redirect(`/customers?status=${status}&keyword=${keyword}&page=${req.session.curPage}`);
            }
        } else {
            res.redirect("/");
        }
    }
};