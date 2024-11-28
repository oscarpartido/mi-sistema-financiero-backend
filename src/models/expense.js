'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      // Define asociaciones aquí si son necesarias
    }
  }
  Expense.init({
    amount: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    paymentMethod: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};