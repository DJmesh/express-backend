'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'locationId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'locationId', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
