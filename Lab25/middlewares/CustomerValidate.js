const { check } = require("express-validator");
const Customer = require("../models/Customer");

module.exports = () => {
    return [
        check('name', "Ten bat buoc phai nhap").notEmpty(),
        check('name', "Ten phai tu 5 ki tu").isLength({min: 5}),
        check('email', "Email bat buoc phai nhap").notEmpty(),
        check('email', "Email khong dung dinh dang").isEmail(),
        check('password', 'Mat khau bat buoc phai nhap').notEmpty(),
        check('password', 'Mat khau khong du manh').isStrongPassword({
            minLength: 6,
            minNumbers: 1,
            minUppercase: 1,
            minLowercase: 1,
            minSymbols: 1,
        }),
        check('email').custom(async (emailVal) => {
            // Truy van database
            const customer =  await Customer;
            const customerData = await customer.findOne({
                where: {
                    email: emailVal,
                },
            });

            if(customerData) {
                throw new Error('Email da co nguoi su dung');
            }
        })
    ];
};