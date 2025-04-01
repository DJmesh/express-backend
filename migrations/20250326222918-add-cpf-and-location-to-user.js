'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'cep', {
      type: Sequelize.STRING,
      allowNull: true // Permite valores nulos inicialmente
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'cep');
  }
};