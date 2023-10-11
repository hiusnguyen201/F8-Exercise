const bcrypt = require('bcrypt');
const aes256 = require("aes256");
const salt = 10;
const key = 'Lab29';

module.exports = {
    hash: async (value) => {
        return await bcrypt.hash(value, salt)
    },

    encryptAES: async (value) => {
        return await aes256.encrypt(key, value.toString());
    },

    decryptAES: async (valueEncrypt) => {
        return await aes256.decrypt(key, valueEncrypt)
    },
};