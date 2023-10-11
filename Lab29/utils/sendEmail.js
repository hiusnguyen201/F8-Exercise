"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const aes = require('../utils/encrypt');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = async (info, mailId) => {
  const mailTemplatePath = path.dirname(__dirname) + "/views/mail/form.html";
  let mailTemplate = fs.readFileSync(mailTemplatePath).toString();
  const idEncrytp = await aes.encryptAES(mailId);
  const linkBtn = `http://localhost:3000/track/${idEncrytp}`;
  mailTemplate = mailTemplate.replaceAll("{{link}}", linkBtn);

  return await transporter.sendMail({
    from: `"${info.name}" <${info.sendby}>`,
    to: `${info.sendto}`,
    subject: info.subject,
    text: info.content,
    html: mailTemplate
  });
}