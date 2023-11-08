const bcrypt = require("bcrypt");
var LocalStrategy = require('passport-local').Strategy;
const model = require("../models/index");

module.exports = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        const user = await model.User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) { return done(null, false, { message: 'Incorrect email or password' }) }

        if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'Incorrect email or password' }) }

        return done(null, user.id);
    }
);