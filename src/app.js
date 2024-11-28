const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); // Importa los modelos

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Probar la conexión con la base de datos
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Ruta de prueba para verificar el servidor
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Ruta para registrar un nuevo ingreso
app.post('/api/incomes', async (req, res) => {
  const { amount, description, date } = req.body;

  try {
    const income = await db.Income.create({ amount, description, date });
    res.status(201).json({ message: "Ingreso registrado exitosamente", income });
  } catch (error) {
    console.error("Error al registrar ingreso:", error);
    res.status(500).json({ error: "Error al registrar ingreso" });
  }
});

// Ruta para registrar un nuevo gasto
app.post('/api/expenses', async (req, res) => {
  const { amount, description, date, paymentMethod } = req.body;

  try {
    const expense = await db.Expense.create({ amount, description, date, paymentMethod });
    res.status(201).json({ message: "Gasto registrado exitosamente", expense });
  } catch (error) {
    console.error("Error al registrar gasto:", error);
    res.status(500).json({ error: "Error al registrar gasto" });
  }
});

// Ruta para registrar acciones en la nómina
app.post('/api/payroll-history', async (req, res) => {
  const { workerName, month, details, salaryFinal } = req.body;

  try {
    // Validar que todos los campos están presentes y en el formato correcto
    if (!workerName || !month || !Array.isArray(details) || typeof salaryFinal !== 'number') {
      return res.status(400).json({ error: 'Datos incompletos o inválidos' });
    }

    // Crear el registro en la base de datos
    const record = await db.PayrollHistory.create({
      workerName,
      month,
      details: JSON.stringify(details), // Guardar los detalles como JSON
      salaryFinal,
    });

    // Enviar respuesta exitosa
    res.status(201).json({ message: 'Nómina registrada exitosamente.', record });
  } catch (error) {
    // Imprimir el error completo en la consola
    console.error('Error al registrar acción en nómina:', error.message);
    console.error('Stack trace:', error.stack);

    // Enviar mensaje de error detallado en la respuesta
    res.status(500).json({
      error: 'Error al registrar acción en la nómina.',
      message: error.message,
      stack: error.stack,
    });
  }
});

// Ruta para obtener el historial por trabajador
app.get('/api/payroll-history/:workerName', async (req, res) => {
  try {
    const { workerName } = req.params;
    const history = await db.PayrollHistory.findAll({
      where: { workerName },
      order: [['month', 'DESC']],
    });

    res.status(200).json(history);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial del trabajador.' });
  }
});

// Ruta para obtener el historial completo de nómina
app.get('/api/payroll-history', async (req, res) => {
  try {
    const history = await db.PayrollHistory.findAll({
      order: [['month', 'DESC']],
    });

    res.status(200).json(history);
  } catch (error) {
    console.error('Error al obtener historial de nómina:', error);
    res.status(500).json({ error: 'Error al obtener historial de nómina.' });
  }
});

module.exports = app;