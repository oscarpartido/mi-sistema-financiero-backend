'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar la columna `month` con un valor predeterminado
    await queryInterface.addColumn('PayrollHistories', 'month', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '2024-11', // Cambia esto a un valor adecuado según tus datos existentes
    });

    // Opcional: Eliminar el valor predeterminado después de actualizar los registros existentes
    await queryInterface.changeColumn('PayrollHistories', 'month', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    // Eliminar la columna `month` si es necesario revertir la migración
    await queryInterface.removeColumn('PayrollHistories', 'month');
  },
};