const AccountValidator = require("../middlewares/accountValidator");
const { validationResult } = require('express-validator');
const Account = require("../models/Account");
const validate = require("../utils/validate");
const md5 = require('md5');
const session = require("express-session");
// const session = require('express-session');

module.exports = {
    loginIndex: (req, res) => {
        if (!req.session.isLogged) {
            const msg = req.flash("msg");
            const success = req.flash("success");
            const errors = req.flash("errors");
            res.render("accounts/login", { msg, success, errors, validate });
        } else {
            res.redirect("/");
        }
    },

    registerIndex: (req, res) => {
        if (!req.session.isLogged) {
            const msg = req.flash("msg");
            const errors = req.flash("errors");
            res.render("accounts/register", { msg, errors, validate });
        } else {
            res.redirect("/");
        }
    },

    homeIndex: (req, res) => {
        res.render("accounts/index", { session: req.session });
    },

    store: async (req, res) => {
        const errors = validationResult(req);
        // console.log(errors); 

        if (errors.isEmpty()) {
            const account = await Account;
            req.body.password = md5(req.body.password);
            account.create(req.body);
            req.flash("success", "Created new account successfully");
            res.redirect("/accounts/login");
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Please enter complete information");
            res.redirect("/accounts/register");
        }
    },

    login: async (req, res) => {
        const errors = validationResult(req);
        // console.log(errors);

        if (errors.isEmpty()) {
            const account = await Account;
            const accountData = await account.findOne({
                where: {
                    email: req.body.email,
                    password: md5(req.body.password)
                }
            })

            if (accountData) {
                accountData.update({
                    status: 1,
                })
            }

            req.session.isLogged = 1;

            res.redirect("/accounts");
        } else {
            req.flash("errors", errors.array());
            req.flash("msg", "Please check your email or password input");
            res.redirect("/accounts/login");
        }
    },

    logout: async (req, res) => {
        req.session.destroy();
        res.redirect("/accounts/login");
    }
}