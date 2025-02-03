import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TeamManagementPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '' });
  const [newStaff, setNewStaff] = useState({ name: '', role: '' });

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/team/${teamId}`);
        setTeam(response.data);
        setPlayers(response.data.players || []);
        setStaff(response.data.staff || []);
      } catch (error) {
        console.error('Error al obtener el equipo:', error);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.position) return;
    setPlayers([...players, newPlayer]);
    setNewPlayer({ name: '', position: '' });
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role) return;
    setStaff([...staff, newStaff]);
    setNewStaff({ name: '', role: '' });
  };

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/api/team/${teamId}`, {
        players,
        staff
      });
      alert('Cambios guardados exitosamente');
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Hubo un problema al guardar los cambios.');
    }
  };

  if (!team) return <p>Cargando equipo...</p>;

  return (
    <div>
      <h2>Gestión del Equipo: {team.name}</h2>

      <h3>Jugadores</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name} - {player.position}</li>
        ))}
      </ul>

      <h3>Cuerpo Técnico</h3>
      <ul>
        {staff.map((member, index) => (
          <li key={index}>{member.name} - {member.role}</li>
        ))}
      </ul>

      {showForm ? (
        <div>
          <h3>Añadir Jugador</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Posición"
            value={newPlayer.position}
            onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
          />
          <button onClick={handleAddPlayer}>Añadir Jugador</button>

          <h3>Añadir Staff</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Rol"
            value={newStaff.role}
            onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
          />
          <button onClick={handleAddStaff}>Añadir Staff</button>

          <button onClick={handleSaveChanges}>Guardar Cambios</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Administrar</button>
      )}

      <button onClick={() => navigate('/dashboard')}>Volver al Dashboard</button>
    </div>
  );
}

export default TeamManagementPage;
