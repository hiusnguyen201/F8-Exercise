const LocalStategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const model = require("../models/index");

module.exports = new LocalStategy(
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

    if (!user) return done(null, false);
    if (!bcrypt.compareSync(password, user.password)) return done(null, false);
    return done(null, user);
  }
);
