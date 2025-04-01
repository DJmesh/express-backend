'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'cep');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'cep', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
