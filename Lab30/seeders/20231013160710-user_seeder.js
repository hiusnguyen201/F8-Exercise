'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: "admin",
        email: "admin@gmail.com",
        password: await bcrypt.hash("123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "admin111",
        email: "admin111@gmail.com",
        password: await bcrypt.hash("123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: "admin222",
        email: "admin222@gmail.com",
        password: await bcrypt.hash("123456", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
