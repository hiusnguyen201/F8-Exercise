'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Provinces', [
      {
        name: "Hà Nội"
      },
      {
        name: "Đà Nẵng"
      },
      {
        name: "Hồ Chí Minh"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Provinces', null, {});
  }
};
