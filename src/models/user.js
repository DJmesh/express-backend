// src/models/user.js
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
  }, {
    tableName: 'users',
    timestamps: true
  });

  // Se desejar associar o usuário às ocorrências:
  User.associate = (models) => {
    User.hasMany(models.Incident, { foreignKey: 'userId', as: 'incidents' });
  };

  return User;
};
