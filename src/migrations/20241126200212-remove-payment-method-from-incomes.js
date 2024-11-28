'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Elimina la columna 'paymentMethod' de la tabla 'Incomes'
    await queryInterface.removeColumn("Incomes", "paymentMethod");
  },

  async down(queryInterface, Sequelize) {
    // Agrega nuevamente la columna 'paymentMethod' si se revierte la migración
    await queryInterface.addColumn("Incomes", "paymentMethod", {
      type: Sequelize.STRING,
      allowNull: true, // Permite valores nulos si se vuelve a agregar
    });
  },
};