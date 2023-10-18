const md5 = require("md5");

module.exports = {
    shorten: (url) => {
        const urlEcrypt = md5(url);
        return urlEcrypt.slice(0, 5);
    } 
}