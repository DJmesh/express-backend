// src/models/location.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    nome: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    cidade: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    estado: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    pais: { 
      type: DataTypes.STRING, 
      allowNull: false 
    }
  }, {
    tableName: 'locations',
    timestamps: true
  });

  // Se precisar associar a localização a outras entidades
  Location.associate = (models) => {
    Location.hasMany(models.User, { foreignKey: 'locationId', as: 'users' });
  };

  return Location;
};