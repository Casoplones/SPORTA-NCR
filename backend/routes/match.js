const express = require('express');
const db = require('../config/db');
const router = express.Router();

// 🔹 Obtener partidos de un equipo
router.get('/', async (req, res) => {
  const { teamId } = req.query;

  try {
    if (!teamId) {
      return res.status(400).json({ message: 'El ID del equipo es obligatorio' });
    }

    // Asegúrate de que 'team_id' se está usando correctamente
    const [matches] = await db.query(`
      SELECT * FROM matches 
      WHERE team_id = ? OR equipo_local = ? OR equipo_visitante = ?
    `, [teamId, teamId, teamId]);

    res.status(200).json(matches);
  } catch (error) {
    console.error('❌ Error al obtener partidos:', error);
    res.status(500).json({ message: 'Error al obtener partidos.' });
  }
});


// 🔹 Crear un partido
router.post('/', async (req, res) => {
  const { equipo_local, equipo_visitante, nombre_campo, hora_partido, dia_partido, tipo_partido, team_id, equipacion_equipo_local, equipacion_equipo_visitante } = req.body;

  // Verificar que todos los campos obligatorios estén presentes
  if (!equipo_local || !equipo_visitante || !nombre_campo || !hora_partido || !dia_partido || !tipo_partido || !team_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO matches (equipo_local, equipo_visitante, nombre_campo, hora_partido, dia_partido, tipo_partido, team_id, equipacion_equipo_local, equipacion_equipo_visitante) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [equipo_local, equipo_visitante, nombre_campo, hora_partido, dia_partido, tipo_partido, team_id, equipacion_equipo_local, equipacion_equipo_visitante]
    );

    res.status(201).json({ message: '✅ Partido creado exitosamente', matchId: result.insertId });
  } catch (error) {
    console.error('❌ Error al crear el partido:', error);
    res.status(500).json({ message: 'Error al crear el partido.' });
  }
});


// 🔹 Eliminar un partido
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM matches WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    res.status(200).json({ message: '✅ Partido eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error al eliminar el partido:', error);
    res.status(500).json({ message: 'Error al eliminar el partido.' });
  }
});


// 🔹 Editar un partido
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { equipo_local, equipo_visitante, nombre_campo, hora_partido, dia_partido, tipo_partido, equipacion_equipo_local, equipacion_equipo_visitante } = req.body;

  if (!equipo_local || !equipo_visitante || !nombre_campo || !hora_partido || !dia_partido || !tipo_partido) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await db.query(
      `UPDATE matches 
       SET equipo_local = ?, equipo_visitante = ?, nombre_campo = ?, hora_partido = ?, dia_partido = ?, tipo_partido = ?, equipacion_equipo_local = ?, equipacion_equipo_visitante = ? 
       WHERE id = ?`,
      [equipo_local, equipo_visitante, nombre_campo, hora_partido, dia_partido, tipo_partido, equipacion_equipo_local, equipacion_equipo_visitante, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    res.status(200).json({ message: '✅ Partido actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error al actualizar el partido:', error);
    res.status(500).json({ message: 'Error al actualizar el partido.' });
  }
});

module.exports = router;
