'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar la columna salaryFinal con un valor predeterminado
    await queryInterface.addColumn('PayrollHistories', 'salaryFinal', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,  // Valor predeterminado de 0
      comment: 'Salario final calculado para el trabajador en el mes',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('PayrollHistories', 'salaryFinal');
  },
};