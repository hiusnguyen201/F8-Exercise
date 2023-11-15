const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const model = require("../models/index");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await model.User.findOne({
      where: { email },
    });

    if (!user)
      return done(null, false, {
        message: "Vui lòng kiểm tra email hoặc mật khẩu",
      });
    if (!bcrypt.compareSync(password, user.password))
      return done(null, false, {
        message: "Vui lòng kiểm tra email hoặc mật khẩu",
      });

    done(null, user);
  }
);
