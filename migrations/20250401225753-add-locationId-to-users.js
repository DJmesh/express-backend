'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'locationId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'locations', // Tabela referenciada
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'locationId');
  }
};
