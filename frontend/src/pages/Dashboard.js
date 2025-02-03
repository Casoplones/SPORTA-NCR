import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeamsSection from '../components/TeamsSection';
import TrainingsSection from '../components/TrainingsSection';
import MatchesSection from '../components/MatchesSection';
import TeamManagementSection from '../components/TeamManagementSection';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('');
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
      fetchTeams(storedUser.id);
    }
  }, [navigate]);

  const fetchTeams = async (userId) => {
    try {
      console.log(`Obteniendo equipos del usuario con ID: ${userId}`);
      const response = await axios.get(`http://localhost:5000/api/team?userId=${userId}`);
      console.log('Equipos obtenidos:', response.data);

      setTeams(response.data);
      if (response.data.length === 0) {
        setError('No tienes equipos creados.');
      } else {
        setError(null);
      }
    } catch (error) {
      console.error('Error al cargar equipos:', error);
      setError('Error al cargar los equipos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="loading">Redirigiendo al inicio de sesión...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Bienvenido, {user.email}</h2>

      {view === '' && (
        <div className="menu">
          <button onClick={() => setView('teams')}>Equipos</button>
          <button onClick={() => setView('trainings')}>Entrenamientos</button>
          <button onClick={() => setView('matches')}>Partidos</button>
          {teams.length > 0 && (
            <button onClick={() => {
              if (selectedTeamId) {
                setView('team-management');
              } else {
                alert('Selecciona un equipo antes de gestionar.');
              }
            }}>
              Gestión del Equipo
            </button>
          )}
        </div>
      )}

      {loading && <p>Cargando equipos...</p>}
      {error && <p>{error}</p>}

      {view === 'teams' && (
        <TeamsSection
          user={user}
          teams={teams}
          fetchTeams={fetchTeams}
          setView={setView}
          setSelectedTeamId={setSelectedTeamId}  // Enviamos la función para seleccionar equipo
        />
      )}

      {view === 'trainings' && <TrainingsSection user={user} teams={teams} setView={setView} />}
      {view === 'matches' && <MatchesSection user={user} teams={teams} setView={setView} />}

      {view === 'team-management' && selectedTeamId ? (
        <TeamManagementSection
          user={user}
          teamId={selectedTeamId} // Ahora se pasa el ID correcto
          fetchTeams={fetchTeams}
          setView={setView}
        />
      ) : (
        view === 'team-management' && <p>Debes seleccionar un equipo antes de gestionarlo.</p>
      )}
    </div>
  );
}

export default Dashboard;
