const localPassport = require("passport-local").Strategy;
const model = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = new localPassport(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await model.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      done(null, false, { message: "Email không tồn tại" });
      return;
    }

    const hash = user.password;
    bcrypt.compare(password, hash, (err, result) => {
      if (result) {
        done(null, user);
        return;
      }

      done(null, false, {
        message: "Mật khẩu không chính xác",
      });
    });
  }
);
