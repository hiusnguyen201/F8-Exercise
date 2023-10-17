const LocalStategy = require('passport-local').Strategy;
const hash = require("../utils/hash");
const model = require("../models/index");
const User = model.User;

module.exports = new LocalStategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        
        if(!user) {
            req.flash("oldEmail", email);
            return done(null, false, {message: "Vui long kiem tra email hoac mat khau!"});
        }

        const res = hash.check(password, user.password);
        if(!res) {
            req.flash("oldEmail", email);
            return done(null, false, {message: "Vui long kiem tra email hoac mat khau!"});
        }
        
        return done(null, user);
    }
)