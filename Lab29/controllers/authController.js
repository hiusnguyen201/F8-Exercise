const bcrypt = require("bcrypt");
const moment = require("moment");
const aes = require("../utils/encrypt");

const model = require("../models/index");
const sendMail = require("../utils/sendEmail");

const User = model.User;
const Mail = model.Mail;
const key = "Lab29"

module.exports = {
    login: async (req, res) => {
        const msg = req.flash("msg");
        const success = req.flash("success");
        const oldEmail = req.flash("oldEmail");
        res.render("auth/login", { msg, success, oldEmail });
    },

    handleLogin: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            }
        })

        if (!user) {
            req.flash("msg", "Vui long kiem tra email cua ban");
            res.redirect("/auth/login");
            return;
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                req.session.loggedId = user.id;
                res.redirect("/");
            } else {
                req.flash("msg", "Vui long kiem tra mat khau cua ban");
                res.redirect("/auth/login");
            }
        });
    },

    handleLogout: (req, res) => {
        delete req.session.loggedId;
        res.redirect("/auth/login");
    },

    register: (req, res) => {
        const msg = req.flash("msg");
        res.render("auth/register", { msg });
    },

    handleRegister: (req, res) => {
        res.redirect("/auth/login");
    },

    index: async (req, res) => {
        if (!req.session?.loggedId) {
            res.redirect("/auth/login");
            return;
        }

        const success = req.flash("success");
        const msg = req.flash("msg");
        const listMail = await Mail.findAll({
            where: {
                sendby_id: req.session?.loggedId,
            },
        });

        const userSended = await User.findByPk(1);
        res.render("index", { success, msg, listMail, userSended, moment});
    },

    send: async (req, res) => {
        const { email, subject, content } = req.body;
        const user = await User.findByPk(req.session.loggedId);
        if (user) {
            // Create Mail
            const mail = await Mail.create({
                sendby_id: user.id,
                sendto_id: 1, // Doi sau
                subject: subject,
                content: content
            });

            // Create Info Mail
            let info = {
                name: user.name,
                sendby: user.email,
                sendto: email,
                subject: subject,
                content: content
            }

            // Send Mail
            await sendMail(info, mail.id);

            req.flash("success", "Gui message thanh cong");
        }
        else {
            req.flash("msg", "Vui long kiem tra lai thong tin");
        }
        res.redirect("/");
    },
    
    handleStatus: async (req, res) => {
        const { id } = req.params;
        if(id) {
            const mailId = await aes.decryptAES(id);
            await Mail.update({status: 1},{
                where: {
                    id: mailId,
                }
            });
        } 
        res.redirect("/");
    },

    mail: async (req, res) => {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id: req.session.loggedId,
            },
            include: {
                model: Mail,
                where: {
                    id: +id,
                }
            }
        });

        if (!user || !id) {
            res.redirect("/");
            return;
        }

        const userSendTo = await User.findByPk(user.Mails[0].sendto_id);
        res.render("mail/details", { user, userSendTo, moment });
    },
}