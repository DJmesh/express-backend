// src/models/location.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true
    }
  }, {
    tableName: 'locations',
    timestamps: true
  });

  Location.associate = (models) => {
    // Um local pode ter várias ocorrências
    Location.hasMany(models.Incident, { foreignKey: 'locationId', as: 'incidents' });
  };

  return Location;
};
