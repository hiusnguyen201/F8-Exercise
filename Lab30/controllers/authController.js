const bcrypt = require("bcrypt");
const model = require("../models/index");
const jwt = require("jsonwebtoken");

const sendMail = require("../utils/sendMail");

const User = model.User;

module.exports = {
    login: (req, res) => {
        const error = req.flash("error");
        res.render("auth/login", { error });
    },

    handleLogin: async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            }
        });

        if (user) {
            await bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    req.session.idLogged = +user.id;
                    res.redirect("/")
                    return;
                }
            });
        } else {
            req.flash("error", "Vui long kiem tra email hoac mat khau");
            res.redirect("/auth/login");
        }
        return;
    },

    handleMail: async (req, res) => {
        const { checkEmail } = req.body;

        const user = await User.findOne({
            where: {
                email: checkEmail,
            }
        });

        if(user) {
            req.session.email = user.email;
            await sendMail(user, req);
            req.flash("error", "Vui lòng vào gmail để kiểm tra thư đã gửi đến");
        } else {
            req.flash("error", "Email không tồn tại");
        }
        res.redirect("/auth/login");
    },

    restore: async (req, res) => {
        const { token } = req.params;
        const msg = req.flash("msg");
        jwt.verify(token, 'lab30', (error, decoded) => {
            if(decoded) {
                res.render("auth/restore", { msg });
            } else {
                if(token !== req.session.token) {
                    req.flash("error", "Vui lòng kiểm tra lại đường link");
                } else {
                    req.flash("error", "Link đã hết hạn! Vui lòng gửi lại email!");
                }
                res.redirect("/auth/login");
            }
        });
    },

    handleRestore: async (req, res) => {
        const { password, repeatPass } = req.body;
        const saltRounds = 10;
        if(password !== repeatPass) {
            req.flash("msg", "Mat khau khong khop! Vui long nhap lai!");
            res.redirect(`/track/${req.session.token}`);
            return;
        }

        bcrypt.hash(password, saltRounds, async (error, hash) => {
            const user = await User.findOne({
                where: {
                    email: req.session.email,
                }
            });

            const check = await user.update({
                password: hash
            });

            if(check) {
                delete req.session.email, req.session.token;
                req.flash("error", "Mật khẩu khôi phục thành công!");
            }
            res.redirect("/auth/login");
        });
        
        res.redirect("/auth/login");
    }
}   