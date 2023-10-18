'use strict';
const hash = require("../utils/hash");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: "User 1",
        email: "user1@gmail.com",
        password: hash.make("123456"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "User 2",
        email: "user2@gmail.com",
        password: hash.make("123456"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "User 3",
        email: "user3@gmail.com",
        password: hash.make("123456"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
