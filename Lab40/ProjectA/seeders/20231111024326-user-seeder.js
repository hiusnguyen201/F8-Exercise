"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    data.push({
      name: `Admin`,
      email: `admin@gmail.com`,
      password: bcrypt.hashSync("123456", 10),
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    for (var i = 0; i < 50; i++) {
      data.push({
        name: `User ${i + 1}`,
        email: `user${i + 1}@gmail.com`,
        password: bcrypt.hashSync("123456", 10),
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
