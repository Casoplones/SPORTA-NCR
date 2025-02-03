const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 🔴 Obtener todos los equipos de un usuario entrenador
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'Falta el parámetro userId' });
  }

  try {
    const [teams] = await db.query('SELECT * FROM teams WHERE created_by = ?', [userId]);
    res.status(200).json(teams);
  } catch (error) {
    console.error('❌ Error al obtener equipos:', error);
    res.status(500).json({ message: 'Error al obtener equipos' });
  }
});

// 🔴 Crear un equipo con código aleatorio
router.post('/', async (req, res) => {
  const { name, league_name, created_by } = req.body;

  if (!name || !league_name || !created_by) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const teamCode = Math.floor(10000 + Math.random() * 90000);

    const [result] = await db.query(
      'INSERT INTO teams (name, league_name, code, created_by) VALUES (?, ?, ?, ?)',
      [name, league_name, teamCode, created_by]
    );

    res.status(201).json({ 
      message: '✅ Equipo creado exitosamente', 
      teamId: result.insertId,
      teamCode: teamCode 
    });

  } catch (error) {
    console.error('❌ Error al crear el equipo:', error);
    res.status(500).json({ message: 'Error al crear el equipo' });
  }
});

// 🔴 Obtener detalles de un equipo específico
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [team] = await db.query('SELECT * FROM teams WHERE id = ?', [id]);
    if (team.length === 0) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.status(200).json(team[0]);
  } catch (error) {
    console.error('❌ Error al obtener detalles del equipo:', error);
    res.status(500).json({ message: 'Error al obtener detalles del equipo' });
  }
});

// 🔴 Obtener detalles completos del equipo
router.get('/:id/details', async (req, res) => {
  const { id } = req.params;

  try {
    const [team] = await db.query('SELECT * FROM teams WHERE id = ?', [id]);
    if (team.length === 0) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    const [players] = await db.query('SELECT position, COUNT(*) as count FROM players WHERE team_id = ? GROUP BY position', [id]);
    const [staff] = await db.query('SELECT COUNT(*) as count FROM staff WHERE team_id = ?', [id]);
    const [equipment] = await db.query('SELECT firstKit, secondKit, gkFirstKit, gkSecondKit FROM equipment WHERE team_id = ?', [id]);

    res.status(200).json({
      team: team[0],
      players: players.reduce((acc, curr) => {
        acc[curr.position] = curr.count;
        return acc;
      }, {}),
      staff: staff[0]?.count || 0,
      equipment: equipment[0] || { firstKit: '', secondKit: '', gkFirstKit: '', gkSecondKit: '' }
    });

  } catch (error) {
    console.error('❌ Error al obtener los detalles del equipo:', error);
    res.status(500).json({ message: 'Error al obtener los detalles del equipo' });
  }
});

// 🔴 Actualizar los datos básicos del equipo (nombre y liga)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, league_name } = req.body;

  if (!name || !league_name) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    console.log(`🔄 Actualizando equipo con ID: ${id}`);

    const [result] = await db.query(
      'UPDATE teams SET name = ?, league_name = ? WHERE id = ?',
      [name, league_name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.status(200).json({ message: '✅ Equipo actualizado correctamente' });

  } catch (error) {
    console.error('❌ Error al actualizar el equipo:', error);
    res.status(500).json({ message: 'Error al actualizar el equipo' });
  }
});

// 🔴 Actualizar detalles del equipo (jugadores, staff, equipaciones)
router.put('/:id/update', async (req, res) => {
  const { id } = req.params;
  const { players, staff, equipment } = req.body;

  try {
    // 🔹 Actualizar cantidad de jugadores
    await db.query('DELETE FROM players WHERE team_id = ?', [id]);
    for (const position in players) {
      for (let i = 0; i < players[position]; i++) {
        await db.query('INSERT INTO players (team_id, position) VALUES (?, ?)', [id, position]);
      }
    }

    // 🔹 Actualizar cuerpo técnico
    await db.query('DELETE FROM staff WHERE team_id = ?', [id]);
    for (let i = 0; i < staff; i++) {
      await db.query('INSERT INTO staff (team_id) VALUES (?)', [id]);
    }

    // 🔹 Actualizar equipaciones
    const [existingEquipment] = await db.query('SELECT * FROM equipment WHERE team_id = ?', [id]);

    if (existingEquipment.length === 0) {
      await db.query(
        'INSERT INTO equipment (team_id, firstKit, secondKit, gkFirstKit, gkSecondKit) VALUES (?, ?, ?, ?, ?)',
        [id, equipment.firstKit, equipment.secondKit, equipment.gkFirstKit, equipment.gkSecondKit]
      );
    } else {
      await db.query(
        'UPDATE equipment SET firstKit = ?, secondKit = ?, gkFirstKit = ?, gkSecondKit = ? WHERE team_id = ?',
        [equipment.firstKit, equipment.secondKit, equipment.gkFirstKit, equipment.gkSecondKit, id]
      );
    }

    res.status(200).json({ message: '✅ Equipo actualizado correctamente' });

  } catch (error) {
    console.error('❌ Error al actualizar el equipo:', error);
    res.status(500).json({ message: 'Error al actualizar el equipo' });
  }
});

// 🔴 Eliminar un equipo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM players WHERE team_id = ?', [id]);
    await db.query('DELETE FROM staff WHERE team_id = ?', [id]);
    await db.query('DELETE FROM equipment WHERE team_id = ?', [id]);

    const [result] = await db.query('DELETE FROM teams WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '⚠️ Equipo no encontrado' });
    }

    res.status(200).json({ message: '✅ Equipo eliminado correctamente' });

  } catch (error) {
    console.error('❌ Error al eliminar el equipo:', error);
    res.status(500).json({ message: 'Error al eliminar el equipo' });
  }
});

module.exports = router;
  