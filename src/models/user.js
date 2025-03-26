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
    locationId: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'locations', // Nome da tabela de localizações
        key: 'id'
      }
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  // Se desejar associar o usuário às ocorrências:
  User.associate = (models) => {
    User.hasMany(models.Incident, { foreignKey: 'userId', as: 'incidents' });
    User.belongsTo(models.Location, { foreignKey: 'locationId', as: 'location' });
  };

  return User;
};