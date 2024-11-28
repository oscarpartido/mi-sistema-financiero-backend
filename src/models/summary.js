'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Summary extends Model {
    static associate(models) {
      // Relaciona Summary con otros modelos si es necesario
    }
  }
  Summary.init(
    {
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0, // Ajusta el valor predeterminado según sea necesario
      },
    },
    {
      sequelize,
      modelName: 'Summary',
    }
  );
  return Summary;
};