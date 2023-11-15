const nodemailer = require("nodemailer");
const md5 = require("md5");
const models = require("../models/index");
const { param } = require("../routes");

module.exports = {
  login: async (req, res) => {
    if (req.user) {
      res.redirect("/");
      return;
    }

    res.render("auth/login");
  },

  otp: async (req, res) => {
    const error = req.flash("error");
    if (!req.session.otp) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const num = Math.floor(900000 * Math.random()) + 100000;
      req.session.otp = num;

      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: req.user.email,
        subject: "Mã OTP để đăng nhập tài khoản",
        html: `<p>Xin chào bạn</p><p>Mã đăng nhập tài khoản của bạn là: <b>${num}</b></p><p>Có hiệu lực trong 5 phút. Không chia sẻ mã này với người khác</p>`,
      });

      setTimeout(() => {
        delete req.session.otp;
      }, 1000 * 60 * 5);
    }

    res.render("auth/otp", { user: req.user, error });
  },

  handleOtp: async (req, res) => {
    const { ...param } = req.body;
    const otp = param.otp.reduce((acc, cur) => {
      return acc + cur;
    });

    console.log(otp, "-", req.session.otp);

    if (+otp === req.session.otp) {
      const id = +req.user.id;
      const loginToken = await models.Login_Token.findByPk(id);
      if (loginToken) {
        const status = await loginToken.destroy();
        if (!status) {
          console.log("Xóa login_token lỗi!");
          return;
        }
      }

      const newToken = md5(new Date().getTime() + Math.random());
      const newLoginToken = await models.Login_Token.create({
        user_id: id,
        token: newToken,
      });

      if (!newLoginToken) {
        console.log("Tạo mới login_token lỗi!");
        return;
      }

      res.cookie("token", newLoginToken.token);

      res.redirect("/");
    } else {
      req.flash("error", "Mã otp ko hợp lệ");
      res.redirect("/auth/otp");
    }
  },
};
