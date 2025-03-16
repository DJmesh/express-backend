'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);

    // Insere um superusuário
    await queryInterface.bulkInsert('users', [{
      nome: 'Super Admin',
      email: 'admin@blackbox.com',
      senha: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove o superusuário
    await queryInterface.bulkDelete('users', { email: 'admin@blackbox.com' }, {});
  }
};
