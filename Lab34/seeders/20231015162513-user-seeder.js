"use strict";
const hash = require("../utils/hash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    const password = "123456";

    data.push({
      name: "Admin",
      email: "admin@gmail.com",
      password: hash.make(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    for (let i = 0; i < 50; i++) {
        data.push({
          name: `User ${i + 1}`,
          email: `user${i + 1}@gmail.com`,
          password: hash.make(password),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    }

    await queryInterface.bulkInsert("users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  }
}
