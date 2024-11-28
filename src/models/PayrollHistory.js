'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PayrollHistory extends Model {
    static associate(models) {
      // Define relaciones si es necesario
    }
  }

  PayrollHistory.init(
    {
      workerName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Nombre del trabajador",
      },
      month: {
        type: DataTypes.STRING, // Formato: "YYYY-MM" (2024-11, por ejemplo)
        allowNull: false,
        comment: "Mes y año de la nómina",
      },
      details: {
        type: DataTypes.TEXT, // Cambiar a JSONB si usas PostgreSQL y quieres datos estructurados
        allowNull: false,
        comment: "Detalles de las acciones de nómina (doble turno, ausencias, etc.)",
        get() {
          const rawValue = this.getDataValue('details');
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue('details', JSON.stringify(value));
        },
      },
      salaryFinal: {
        type: DataTypes.DECIMAL(10, 2), // Asegúrate de que en la base de datos tenga precisión suficiente
        allowNull: false,
        comment: "Salario final calculado para el trabajador en el mes",
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Comentarios adicionales opcionales sobre la nómina",
      },
    },
    {
      sequelize,
      modelName: 'PayrollHistory',
      tableName: 'PayrollHistories', // Nombre de la tabla en la base de datos
      timestamps: true, // createdAt y updatedAt
    }
  );

  return PayrollHistory;
};