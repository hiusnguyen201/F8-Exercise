const nodemailer = require("nodemailer");
const { MAIL_USER, MAIL_PASS } = process.env;
class SendMail {
  constructor(job) {
    this.job = job;
  }

  handle = async () => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    return await transporter.sendMail({
        from: `Lab37 <hiusnguyen201@gmail.com>`,
        to: this.job.email,
        subject: `Xin chào: ${this.job.name}`,
        html: `Chân thành cảm ơn !`
    })
  };
}

module.exports = SendMail;
