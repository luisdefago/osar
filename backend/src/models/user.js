const sequelize = require('../utils/connect');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      documento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nombreCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaInscripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mesesDesubscripto: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      administrador: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      tableName: 'usuarios',
      timestamps: false,
    });
  
    Usuario.associate = function(models) {
      Usuario.hasMany(models.Comprobante, {
        foreignKey: 'usuarioId',
        as: 'comprobantes'
      });
    };
  
    return Usuario;
  };