'use strict';
const md5 = require("md5");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('customers', [
      {
        name: 'admin',
        email: 'admin@gmail.com',
        password: md5('admin123'),
        status: 1,
        user_id: 2,
        createdBy: 1,
      },
      {
        name: 'nguyenvana',
        email: 'nguyenvana@gmail.com',
        password: md5('nguyenvana123'),
        status: 0,
        user_id: 1,
        createdBy: 1,
      },
      {
        name: 'tranvanb',
        email: 'tranvanb@gmail.com',
        password: md5('tranvanb123'),
        status: 0,
        user_id: 1,
        createdBy: 1,
      },
      {
        name: 'phamngoca',
        email: 'phamngoca@gmail.com',
        password: md5('phamngoca123'),
        status: 1,
        user_id: 1,
        createdBy: 1,
      },
      {
        name: 'phanthib',
        email: 'phanthib@gmail.com',
        password: md5('phanthib123'),
        status: 1,
        user_id: 2,
        createdBy: 1,
      },
      {
        name: 'nguyenngoca',
        email: 'nguyenngoca@gmail.com',
        password: md5('nguyenngoca123'),
        status: 0,
        user_id: 1,
        createdBy: 1,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('customers', null, {});
  }
};
