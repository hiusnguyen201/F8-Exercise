const LocalStategy = require("passport-local").Strategy;
const hash = require("../utils/hash");
const model = require("../models/index");

module.exports = new LocalStategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const user = await model.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      req.flash("oldEmail", email);
      return done(null, false, {
        message: "Vui lòng kiểm tra lại email hoặc mật khẩu của bạn",
      });
    }

    if (!hash.check(password, user.password)) {
      req.flash("oldEmail", email);
      return done(null, false, {
        message: "Vui lòng kiểm tra lại email hoặc mật khẩu của bạn",
      });
    }

    return done(null, user);
  }
);
