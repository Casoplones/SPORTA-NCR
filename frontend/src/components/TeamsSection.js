import React, { useState } from 'react';
import axios from 'axios';
import TeamManagementSection from './TeamManagementSection';

function TeamsSection({ user, teams, fetchTeams, setView }) {
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleDeleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/team/${id}`);
      alert('✅ Equipo eliminado correctamente');
      fetchTeams(user.id);
      setSelectedTeamId(null);
    } catch (error) {
      console.error('❌ Error al eliminar el equipo:', error);
      alert('Hubo un problema al eliminar el equipo.');
    }
  };

  const handleEditTeam = async (team) => {
    const newName = prompt('Nuevo nombre del equipo:', team.name);
    const newLeague = prompt('Nueva liga del equipo:', team.league_name);
  
    if (!newName || !newLeague) {
      alert('⚠️ Todos los campos son obligatorios.');
      return;
    }
  
    try {
      console.log(`🔄 Enviando actualización para el equipo con ID: ${team.id}`);
  
      const response = await axios.put(`http://localhost:5000/api/team/${team.id}`, {
        name: newName,
        league_name: newLeague
      });
  
      console.log('✅ Respuesta del servidor:', response.data);
      alert(response.data.message);
      fetchTeams(team.created_by);
  
    } catch (error) {
      console.error('❌ Error al actualizar el equipo:', error);
      alert('Hubo un problema al actualizar el equipo.');
    }
  };

  const handleCreateTeam = async () => {
    if (!user) {
      alert('⚠️ Debes iniciar sesión para crear un equipo.');
      return;
    }

    const name = prompt('Nombre del nuevo equipo:');
    const league_name = prompt('Liga del equipo:');

    if (!name || !league_name) {
      alert('⚠️ Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/team', {
        name,
        league_name,
        created_by: user.id
      });

      alert(`✅ Equipo creado exitosamente. Código del equipo: ${response.data.teamCode}`);
      fetchTeams(user.id);
    } catch (error) {
      console.error('❌ Error al crear el equipo:', error);
      alert('Hubo un problema al crear el equipo.');
    }
  };

  return (
    <div>
      <h3>Tus Equipos</h3>

      {!selectedTeamId ? (
        <>
          {teams.length > 0 ? (
            teams.map((team) => (
              <div key={team.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <h4>{team.name}</h4>
                <p><strong>Liga:</strong> {team.league_name}</p>
                <p><strong>Código del equipo:</strong> {team.code}</p>
                <button onClick={() => setSelectedTeamId(team.id)}>Administrar</button>
                <button onClick={() => handleEditTeam(team)}>Editar</button>
                <button onClick={() => handleDeleteTeam(team.id)}>Eliminar</button>
              </div>
            ))
          ) : (
            <p>No tienes equipos creados.</p>
          )}
          <button onClick={handleCreateTeam}>Crear Equipo</button>
          <button onClick={() => setView('')}>Volver al menú</button>
        </>
      ) : (
        <TeamManagementSection teamId={selectedTeamId} setSelectedTeamId={setSelectedTeamId} />
      )}
    </div>
  );
}

export default TeamsSection;
