'use strict';

const md5 = require("md5");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Customers', [
      {
        name: "admin",
        email: 'admin@gmail.com',
        password: md5("admin123"),
        province_id: 1,
        status: 1,
      },
      {
        name: "nguyen van a",
        email: 'nguyenvana@gmail.com',
        password: md5("customer123"),
        province_id: 1,
      },
      {
        name: "nguyen van b",
        email: 'nguyenvanb@gmail.com',
        password: md5("customer123"),
        province_id: 2,
      },
      {
        name: "tran van a",
        email: 'tranvana@gmail.com',
        password: md5("customer123"),
        province_id: 3,
        status: 1,
      },
      {
        name: "tranvanb",
        email: 'tranvanb@gmail.com',
        password: md5("customer123"),
        province_id: 2,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
