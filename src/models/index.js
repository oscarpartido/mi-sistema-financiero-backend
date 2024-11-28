'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/database.js'); // Asegúrate de que este archivo existe y es correcto
const db = {};

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: false,
  }
);

// Leer todos los archivos en el directorio de modelos y cargar los modelos
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && // Ignorar archivos ocultos
      file !== basename && // Ignorar este archivo (index.js)
      file.slice(-3) === '.js' // Solo incluir archivos .js
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Asociar modelos si tienen relaciones definidas
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exportar la instancia de Sequelize y los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log(Object.keys(db));

module.exports = db;