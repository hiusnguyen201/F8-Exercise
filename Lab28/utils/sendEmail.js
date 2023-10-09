"use strict"
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = async (token) => {
  return await transporter.sendMail({
    from: `${process.env?.APP_NAME} <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    subject: "Xac nhan thong tin email",
    html: `<b>Ma xac nhan:</b>
    <p>${token}</p>`,
  });
}
