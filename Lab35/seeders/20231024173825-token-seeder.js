const jwt = require("jsonwebtoken");
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tokens', [{
      token: jwt.sign({data: 2}, "lab35"),
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tokens', null, {});
  }
};
