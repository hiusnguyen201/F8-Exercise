'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Customers', 'province_id', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Customers', 'deletedAt', {
          type: Sequelize.DataTypes.DATE,
        }, { transaction: t })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Customers', 'province_id', { transaction: t }),
        queryInterface.removeColumn('Customers', 'deletedAt', { transaction: t })
      ]);
    });
  }
};
