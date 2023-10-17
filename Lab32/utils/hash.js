const bcrypt = require("bcrypt");

module.exports = {
    make: (password) => {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);
    },

    check: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
}