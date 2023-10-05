const { check } = require('express-validator');
const Account = require("../models/Account");

module.exports = () => {
    return [
        check("name", "Name must be input").notEmpty(),
        check("name", "Length name must be greater than 6").isLength({min: 6}),
        check("email", "Email address must be input").notEmpty(),
        check("email", "Invalid email address").isEmail(),
        check("password", "Password must be input").notEmpty(),
        check("repeat", "Password must be input").notEmpty(),
        check("password", "Password not enough strong").isStrongPassword({
            minLength: 4,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 0,
            minSymbols: 0,
        }),
        check("email").custom(async (emailVal) => {
            const account = await Account;

            const accountData = await account.findOne({
                where: {
                    email: emailVal,
                },
            });

            if(accountData) {
                throw new Error('Email is already used');
            }
        }),
        check("repeat").custom(async (repeatVal, {req}) => {
            if(repeatVal !== req.body.password) {
                throw new Error("Password is not match");
            }
        }),
    ]
}