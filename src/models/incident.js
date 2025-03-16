// src/models/incident.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Incident = sequelize.define('Incident', {
    // Nome ou título da ocorrência
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Foreign key para o usuário (opcional)
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Foreign key para o local (opcional)
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
    // Caso queira adicionar um tipo, poderia incluir:
    // incidentTypeId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'incidents',
    timestamps: true
  });

  Incident.associate = (models) => {
    // Relação com User
    Incident.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    // Relação com Location
    Incident.belongsTo(models.Location, { foreignKey: 'locationId', as: 'location' });
    // Relação com IncidentImage
    Incident.hasMany(models.IncidentImage, { foreignKey: 'incidentId', as: 'images' });
    // Se houver IncidentType:
    // Incident.belongsTo(models.IncidentType, { foreignKey: 'incidentTypeId', as: 'type' });
  };

  return Incident;
};
