'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('provinces', [
      {
        name: 'Ha Noi',
      },
      {
        name: 'Ho Chi Minh',
      },
      {
        name: "Hai Phong"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('provinces', null, {});
  }
};
