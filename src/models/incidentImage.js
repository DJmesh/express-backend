// src/models/incidentImage.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const IncidentImage = sequelize.define('IncidentImage', {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    incidentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'incident_images',
    timestamps: true
  });

  IncidentImage.associate = (models) => {
    // Cada imagem pertence a uma ocorrência
    IncidentImage.belongsTo(models.Incident, { foreignKey: 'incidentId', as: 'incident' });
  };

  return IncidentImage;
};
