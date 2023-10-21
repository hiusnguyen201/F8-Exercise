const bcrypt = require("bcrypt");

module.exports = {
    make: (data) => {
        const saltRounds = 10;
        return bcrypt.hashSync(data, saltRounds);
    },
}