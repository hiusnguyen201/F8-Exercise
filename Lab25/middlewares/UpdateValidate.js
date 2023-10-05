const { check } = require("express-validator");
const Customer = require("../models/Customer");

module.exports = () => {
    return [
        check('name', "Ten bat buoc phai nhap").notEmpty(),
        check('name', "Ten phai tu 5 ki tu").isLength({min: 5}),
        check('email', "Email bat buoc phai nhap").notEmpty(),
        check('email', "Email khong dung dinh dang").isEmail(),
        check('email').custom(async (emailVal, {req}) => {
            const { id } = req.query;
            const customer =  await Customer;
            const currentCustomer = await customer.findOne({
                where: {
                    id: id,
                }
            });

            if(currentCustomer.dataValues.email !== emailVal) {
                const customerData = await customer.findOne({
                    where: {
                        email: emailVal,
                    },
                });
    
                if(customerData) {
                    throw new Error('Email da co nguoi su dung');
                }
            }
        })
    ];
};