const { check } = require("express-validator");
const Account = require("../models/Account");
const md5 = require("md5");

module.exports = () => {
    return [
        check("email", "Email must be input").notEmpty(),
        check("email").custom(async (emailVal) => {
                const account = await Account;
                const accountData = await account.findOne({
                    where: {
                        email: emailVal
                    }
                });

                if (!accountData) {
                    throw new Error("Incorrect email. Try again");
                }
        }),

        check("password", "Password must be input").notEmpty(),
        check("password").custom(async (passVal, { req }) => {
            const account = await Account;
            const accountData = await account.findOne({
                where: {
                    email: req.body.email,
                    password: md5(passVal)
                }
            });

            if (!accountData) {
                throw new Error("Incorrect password. Try again");
            }
        }),
    ];
};