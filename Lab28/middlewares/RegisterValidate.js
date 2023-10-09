
const { check } = require("express-validator");
const model = require("../models/index");
const Customer = model.Customer;

module.exports = () => {
    return [
        check('name', "Ten bat buoc phai nhap").notEmpty(),
        check('name', "Do dai ten phai lon hon 3").isLength({min:4}),
        check('email', "Email bat buoc phai nhap").notEmpty(),
        check('email', "Email khong dung dinh dang").isEmail(),
        check('email').custom(async (emailVal) => {
            const customerData = await Customer.findOne({
                where: {
                    email: emailVal,
                }
            })

            if (customerData) {
                throw new Error('Email da co nguoi su dung');
            }
        }),
        check('password', "Mat khau bat buoc phai nhap").notEmpty(),
        check('password', "Mat khau khong du manh").isStrongPassword({
            minLength: 4,
            minNumbers: 1,
            minUppercase: 0,
            minLowercase: 1,
            minSymbols: 0,
        }),
        check('repeat', "Vui long nhap lai mat khau").notEmpty(),
        check('repeat').custom((repeatVal, {req}) => {
            if(!(repeatVal === req.body.password)) {
                throw new Error("Mat khau nhap lai khong dung");
            }
        }),
    ];
};