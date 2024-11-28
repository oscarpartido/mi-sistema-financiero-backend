'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Paso 1: Agregar la columna 'details' permitiendo valores nulos
    await queryInterface.addColumn('PayrollHistories', 'details', {
      type: Sequelize.TEXT,
      allowNull: true, // Permitir valores nulos temporalmente
    });

    // Paso 2: Actualizar los registros existentes para que tengan un valor en la columna 'details'
    await queryInterface.sequelize.query(
      'UPDATE "PayrollHistories" SET "details" = \'[]\' WHERE "details" IS NULL'
    );

    // Paso 3: Hacer la columna 'details' no nula
    await queryInterface.changeColumn('PayrollHistories', 'details', {
      type: Sequelize.TEXT,
      allowNull: false, // Hacer que 'details' no pueda ser nulo
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la columna 'details' si es necesario revertir la migración
    await queryInterface.removeColumn('PayrollHistories', 'details');
  },
};