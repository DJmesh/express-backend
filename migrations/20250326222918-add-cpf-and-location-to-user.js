'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'birthdate', {
      type: Sequelize.STRING,
      allowNull: true,  // Permite valores nulos inicialmente
      unique: true
    });

    await queryInterface.addColumn('users', 'locationId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'locations', // Referência à tabela de locations
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'cpf');
    await queryInterface.removeColumn('users', 'locationId');
  }
};