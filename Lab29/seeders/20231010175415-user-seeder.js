'use strict';
const bcrypt = require('bcrypt');
const salt = 10;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: "admin",
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin123", salt),
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
