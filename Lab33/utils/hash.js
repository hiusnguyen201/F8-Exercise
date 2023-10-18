const bcrypt = require("bcrypt");

module.exports = {
    make: (value) => {
        const saltRounds = 10;
        return bcrypt.hashSync(value, saltRounds);
    },

    check: (value, hash) => {
        return bcrypt.compareSync(value, hash);
    }
}