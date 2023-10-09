const { Op } = require('sequelize');
const { check } = require("express-validator");
const validator = require("validator");
const model = require("../models/index");
const Customer = model.Customer;
const md5 = require("md5");

module.exports = () => {
    return [
        check('name', "Ten bat buoc phai nhap").notEmpty(),
        check('name', "Ten phai tu 4 ki tu").isLength({ min: 4 }),
        check('email', "Email bat buoc phai nhap").notEmpty(),
        check('email', "Email khong dung dinh dang").isEmail(),
        check('email').custom(async (emailVal, { req }) => {
            if (req.url === '/login') {
                const customerData = await Customer.findOne({
                    where: {
                        email: emailVal,
                    }
                })

                if (!customerData) {
                    throw new Error('Khong tim thay dia chi Email');
                }
            } else {
                const { id } = req.params;
                const customerData = await Customer.findOne({
                    where: {
                        email: emailVal,
                        id: {
                            [Op.not]: id,
                        }
                    },
                });

                if (customerData) {
                    throw new Error('Email da co nguoi su dung');
                }
            }
        }),
        check('password').custom(async (passVal, { req }) => {
            const { id } = req.params;

            if (!passVal && !id) {
                throw new Error("Mat khau bat buoc phai nhap");
            }
        }),
        check('password').custom(async (passVal, { req }) => {
            if (req.url === '/login') {
                const customerData = await Customer.findOne({
                    where: {
                        email: req.body.email,
                        password: md5(passVal)
                    }
                });

                if(!customerData) {
                    throw new Error("Vui long kiem tra lai mat khau");
                }
            } else {
                const { id } = req.params;
                const customerData = await Customer.findByPk(id);

                let passwordRule = {
                    minLength: 4,
                    minNumbers: 1,
                    minUppercase: 0,
                    minLowercase: 1,
                    minSymbols: 0,
                };

                if (id) {
                    if (passVal && customerData.password !== passVal && !validator.isStrongPassword(passVal, passwordRule)) {
                        throw new Error("Mat khau khong du manh");
                    }
                } else {
                    if (!validator.isStrongPassword(passVal, passwordRule)) {
                        throw new Error("Mat khau khong du manh");
                    }
                }
            }
        }),
    ];
};