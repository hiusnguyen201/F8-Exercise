const { check } = require("express-validator");
const model = require("../models/index");
const Customer = model.Customer;
const md5 = require("md5");

module.exports = () => {
    return [
        check('email', "Email bat buoc phai nhap").notEmpty(),
        check('email', "Email khong dung dinh dang").isEmail(),
        check('email').custom(async (emailVal) => {
                const customerData = await Customer.findOne({
                    where: {
                        email: emailVal,
                    }
                })

                if (!customerData) {
                    throw new Error('Khong tim thay dia chi Email');
                }
        }),
        check('password', "Mat khau bat buoc phai nhap").notEmpty(),
        check('password').custom(async (passVal, { req }) => {
                const customerData = await Customer.findOne({
                    where: {
                        email: req.body.email,
                        password: md5(passVal)
                    }
                });

                if(!customerData) {
                    throw new Error("Vui long kiem tra lai mat khau");
                }
        }),
    ];
};