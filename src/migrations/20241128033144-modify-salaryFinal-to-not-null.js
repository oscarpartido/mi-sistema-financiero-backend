'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PayrollHistories', 'salaryFinal', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false, // Ahora no permitimos valores nulos
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('PayrollHistories', 'salaryFinal', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true, // Volver a permitir valores nulos si revertimos
    });
  },
};