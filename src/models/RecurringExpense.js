'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RecurringExpense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Define las relaciones aquí si son necesarias
    }
  }
  RecurringExpense.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0,
        },
      },
      frequency: {
        type: DataTypes.STRING, // Mensual, semanal, etc.
        allowNull: false,
      },
      nextDate: {
        type: DataTypes.DATE, // Fecha del próximo cobro
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RecurringExpense',
    }
  );
  return RecurringExpense;
};