const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { email, password, role, team_id } = req.body;
  console.log('Datos recibidos en /register:', req.body);

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Insertar usuario
    const [result] = await db.query(
      'INSERT INTO users (email, password, role, team_id) VALUES (?, ?, ?, ?)',
      [email, password, role, team_id || null]
    );

    console.log('Usuario registrado con ID:', result.insertId);
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const user = users[0];
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
});

module.exports = router;
