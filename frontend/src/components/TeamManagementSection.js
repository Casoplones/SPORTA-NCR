import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeamManagementSection({ teamId, setSelectedTeamId }) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState({});
  const [staff, setStaff] = useState(0);
  const [equipment, setEquipment] = useState({
    firstKit: '',
    secondKit: '',
    gkFirstKit: '',
    gkSecondKit: ''
  });

  useEffect(() => {
    if (!teamId) {
      setError('Debes seleccionar un equipo antes de gestionarlo.');
      setLoading(false);
      return;
    }

    const fetchTeamData = async () => {
      try {
        console.log(`🔄 Obteniendo datos del equipo con ID: ${teamId}`);
        const response = await axios.get(`http://localhost:5000/api/team/${teamId}/details`);
        
        console.log('✅ Datos del equipo obtenidos:', response.data);

        setTeam(response.data.team || {});
        setPlayers(response.data.players || {});
        setStaff(response.data.staff || 0);
        setEquipment(response.data.equipment || {
          firstKit: '',
          secondKit: '',
          gkFirstKit: '',
          gkSecondKit: ''
        });

      } catch (error) {
        console.error('❌ Error al obtener los datos del equipo:', error);
        setError('Error al cargar los datos del equipo.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  const handleSaveConfig = async () => {
    if (!teamId) {
      alert('Error: No se ha seleccionado ningún equipo.');
      return;
    }
  
    try {
      console.log(`🔄 Guardando configuración del equipo con ID: ${teamId}...`);
      
      const response = await axios.put(`http://localhost:5000/api/team/${teamId}/update`, {
        players,
        staff,
        equipment
      });
  
      console.log('✅ Respuesta del servidor:', response.data);
      alert('✅ Datos del equipo guardados correctamente.');
  
    } catch (error) {
      console.error('❌ Error al guardar la configuración:', error);
      alert('Hubo un error al guardar los cambios.');
    }
  };
  
  

  if (loading) return <p>Cargando datos del equipo...</p>;
  if (error) return <p>{error}</p>;
  if (!team || !team.name) return <p>No se encontraron datos del equipo.</p>;

  return (
    <div>
      <h2>Gestión del Equipo: {team.name}</h2>
      <p><strong>Código del Equipo:</strong> {team.code}</p>

      <div>
        <h3>Jugadores</h3>
        {['portero', 'defensa', 'mediocentro', 'delantero'].map(pos => (
          <div key={pos}>
            <label>{pos.charAt(0).toUpperCase() + pos.slice(1)}:</label>
            <input
              type="number"
              min="0"
              value={players[pos] || 0}
              onChange={(e) => setPlayers({ ...players, [pos]: parseInt(e.target.value) || 0 })}
            />
          </div>
        ))}
      </div>

      <div>
        <h3>Cuerpo Técnico</h3>
        <input
          type="number"
          min="0"
          value={staff}
          onChange={(e) => setStaff(parseInt(e.target.value) || 0)}
        />
      </div>

      <div>
        <h3>Equipaciones</h3>
        <label>Primera Equipación:</label>
        <input type="text" value={equipment.firstKit} onChange={(e) => setEquipment({ ...equipment, firstKit: e.target.value })} />
        
        <label>Segunda Equipación:</label>
        <input type="text" value={equipment.secondKit} onChange={(e) => setEquipment({ ...equipment, secondKit: e.target.value })} />

        <label>Primera Equipación del Portero:</label>
        <input type="text" value={equipment.gkFirstKit} onChange={(e) => setEquipment({ ...equipment, gkFirstKit: e.target.value })} />

        <label>Segunda Equipación del Portero:</label>
        <input type="text" value={equipment.gkSecondKit} onChange={(e) => setEquipment({ ...equipment, gkSecondKit: e.target.value })} />
      </div>

      <button onClick={handleSaveConfig}>Guardar Cambios</button>
      <button onClick={() => setSelectedTeamId(null)}>Volver a Mis Equipos</button>
    </div>
  );
}

export default TeamManagementSection;