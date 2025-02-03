const express = require('express');
const db = require('../config/db');
const router = express.Router();

// 🔴 Crear un entrenamiento
router.post('/', async (req, res) => {
  const { training_date, training_time, training_place, training_type, goalkeeper_training, team_id } = req.body;

  console.log('📩 Datos recibidos para crear entrenamiento:', {
    training_date,
    training_time,
    training_place,
    training_type,
    goalkeeper_training,
    team_id,
  });

  try {
    if (!training_date || !training_time || !training_place || !training_type || !team_id) {
      console.log('❌ Error: Faltan campos obligatorios.');
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const [result] = await db.query(
      'INSERT INTO trainings (training_date, training_time, training_place, training_type, goalkeeper_training, team_id) VALUES (?, ?, ?, ?, ?, ?)',
      [training_date, training_time, training_place, training_type, goalkeeper_training, team_id]
    );

    console.log('✅ Entrenamiento creado exitosamente:', result);
    res.status(201).json({ message: 'Entrenamiento creado exitosamente', trainingId: result.insertId });
  } catch (error) {
    console.error('❌ Error al crear el entrenamiento:', error);
    res.status(500).json({ message: 'Error al crear el entrenamiento.' });
  }
});

// 🔴 Obtener entrenamientos por equipo
router.get('/', async (req, res) => {
  const { teamId, userId } = req.query;

  try {
    if (!teamId && !userId) {
      console.log('❌ Falta el ID del equipo o usuario.');
      return res.status(400).json({ message: 'El ID del equipo o usuario es obligatorio' });
    }

    let query, params;
    if (teamId) {
      query = 'SELECT * FROM trainings WHERE team_id = ?';
      params = [teamId];
    } else {
      query = 'SELECT t.* FROM trainings t JOIN teams tm ON t.team_id = tm.id WHERE tm.created_by = ?';
      params = [userId];
    }

    const [rows] = await db.query(query, params);
    console.log('✅ Entrenamientos obtenidos:', rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('❌ Error al obtener entrenamientos:', error);
    res.status(500).json({ message: 'Error al obtener entrenamientos.' });
  }
});

// 🔴 Eliminar un entrenamiento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM trainings WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entrenamiento no encontrado' });
    }

    res.status(200).json({ message: 'Entrenamiento eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error al eliminar el entrenamiento:', error);
    res.status(500).json({ message: 'Error al eliminar el entrenamiento.' });
  }
});

// 🔴 Editar un entrenamiento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { training_date, training_time, training_place, training_type, goalkeeper_training } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE trainings SET training_date = ?, training_time = ?, training_place = ?, training_type = ?, goalkeeper_training = ? WHERE id = ?',
      [training_date, training_time, training_place, training_type, goalkeeper_training, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entrenamiento no encontrado' });
    }

    res.status(200).json({ message: '✅ Entrenamiento actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error al actualizar el entrenamiento:', error);
    res.status(500).json({ message: 'Error al actualizar el entrenamiento.' });
  }
});

module.exports = router;
