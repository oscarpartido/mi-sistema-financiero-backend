'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here (si hay relaciones en el futuro)
    }
  }
  Income.init(
    {
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false, // Este campo es obligatorio
        validate: {
          isDecimal: true, // Valida que sea un número decimal
          min: 0, // Evita valores negativos
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false, // Este campo es obligatorio
        validate: {
          notEmpty: true, // Valida que no esté vacío
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false, // Este campo es obligatorio
        validate: {
          isDate: true, // Valida que sea una fecha
        },
      },
    },
    {
      sequelize,
      modelName: 'Income',
    }
  );
  return Income;
};