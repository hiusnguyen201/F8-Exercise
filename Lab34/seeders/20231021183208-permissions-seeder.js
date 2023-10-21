"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          value: "users.read",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: "users.add",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: "users.update",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: "users.delete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
