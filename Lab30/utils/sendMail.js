"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = async (receiver, req) => {
    const mailFormPath = path.dirname(__dirname) + "/views/mail/formMail.html";
    let mailForm = fs.readFileSync(mailFormPath).toString();
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 15),
      data: 'restore',
    }, 'lab30');

    req.session.token = token;

    const link = `http://localhost:3000/track/${token}`;
    mailForm = mailForm.replaceAll("{{name}}", receiver.name).replaceAll("{{link}}", link);

    return await transporter.sendMail({
        from: `"Lab30" <${process.env.MAIL_FROM}>`,
        to: `${process.env.MAIL_TO}`,
        subject: "Xác nhận khôi phục mật khẩu",
        text: "",
        html: mailForm,
    })
}
