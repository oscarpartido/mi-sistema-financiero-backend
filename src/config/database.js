require('dotenv').config(); // Carga las variables del archivo .env

module.exports = {
  development: {
    username: process.env.DB_USER,      // Usuario de tu base de datos
    password: process.env.DB_PASSWORD, // Contraseña de tu base de datos
    database: process.env.DB_NAME,     // Nombre de tu base de datos
    host: process.env.DB_HOST || '127.0.0.1', // Dirección del servidor de base de datos
    dialect: 'postgres',               // Dialecto (en este caso PostgreSQL)
    logging: false,                    // Desactiva el log de las consultas SQL
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};