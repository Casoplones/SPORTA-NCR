const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/team'); 
const matchRoutes = require('./routes/match');
const trainingRoutes = require('./routes/training');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes); 
app.use('/api/match', matchRoutes);
app.use('/api/training', trainingRoutes);

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
