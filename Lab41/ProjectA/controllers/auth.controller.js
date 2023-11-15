const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const { v4: uuidv4 } = require("uuid");
const models = require("../models/index");

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

    if (+otp === req.session.otp) {
      const id = +req.user.id;

      const loginToken = await models.Login_Token.findOne({
        where: {
          user_id: id,
        },
      });

      if (loginToken) {
        const status = await loginToken.destroy();
        if (!status) {
          console.log("Xóa login_token lỗi!");
          return;
        }
        res.clearCookie("token");
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

  oauth: (req, res) => {
    const error = req.flash("error");
    res.render("auth/oauth", { error });
  },

  handleOauth: async (req, res) => {
    const { email, password } = req.body;
    const { callback, client_id, scopes } = req.query;
    const user = await models.User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      req.flash("error", "Vui lòng kiểm tra lại email hoặc mật khẩu");
      return res.redirect(
        `/auth/oauth?client_id=${client_id}&callback${callback}&scopes=${scopes}`
      );
    }

    if (!bcrypt.compareSync(password, user.password)) {
      req.flash("error", "Vui lòng kiểm tra lại email hoặc mật khẩu");
      return res.redirect(
        `/auth/oauth?client_id=${client_id}&callback${callback}&scopes=${scopes}`
      );
    }

    const code = uuidv4();

    const authorize = await models.Authorize.create({
      user_id: user.id,
      client_id,
      code,
    });

    if (!authorize) {
      req.flash("error", "Server Error");
      return res.redirect(
        `/auth/oauth?client_id=${client_id}&callback${callback}&scopes=${scopes}`
      );
    }

    res.redirect(`${callback}?code=${code}`);
  },

  handleCode: async (req, res) => {
    const { code } = req.body;

    if (!code) {
      return res.status(404).json({
        status: "error",
        message: "Code not found",
      });
    }

    const authorize = await models.Authorize.findOne({
      where: {
        code,
      },
    });

    if (!authorize) {
      return res.status(400).json({
        status: "error",
        message: "Bad request",
      });
    }

    const accessToken = md5(new Date().getTime() + Math.random());
    await authorize.update({
      access_token: accessToken,
    });

    res.json({
      status: "success",
      data: accessToken,
    });
  },

  handleAuthorize: async (req, res) => {
    const { access_token, client_secret } = req.body;
    if (!access_token || !client_secret) {
      return res.status(404).json({
        status: "error",
        message: "Client secret or access token not found",
      });
    }

    const app = await models.App.findOne({
      where: {
        client_secret,
      },
    });

    if (!app) {
      return res.status(400).json({
        status: "error",
        message: "Bad Request",
      });
    }

    const authorize = await models.Authorize.findOne({
      where: {
        access_token,
      },
      include: {
        model: models.User,
        require: true,
      },
    });

    if (!authorize) {
      return res.status(400).json({
        status: "error",
        message: "Bad Request",
      });
    }

    const user = await authorize.getUser();
    res.json({
      status: "success",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  },
};
