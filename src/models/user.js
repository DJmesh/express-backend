'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    senha: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    role: { 
      type: DataTypes.ENUM('user','admin'), 
      allowNull: false, 
      defaultValue: 'user' 
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    cep: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    address: { // Logradouro
      type: DataTypes.STRING,
      allowNull: true
    },
    bairro: { // Bairro
      type: DataTypes.STRING,
      allowNull: true
    },
    localidade: { // Cidade
      type: DataTypes.STRING,
      allowNull: true
    },
    uf: { // Estado
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};
