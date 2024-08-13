const sequelize = require('../utils/connect');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Comprobante = sequelize.define('Comprobante', {
    numeroRecibo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    año: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaPago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Comprobante.associate = function(models) {
    Comprobante.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
      as: 'usuario'
    });
  };

  return Comprobante;
};