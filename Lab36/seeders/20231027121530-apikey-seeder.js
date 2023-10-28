"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ApiKeys", [
      {
        value: "f1ab0ee2-d742-4f2e-a0e4-f7b41edda8cf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "49ec4e70-8de6-4688-97c4-d175bcd14546",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: "25289cdf-24f2-4904-8167-91d9ea17965f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ApiKeys", null, {});
  },
};
