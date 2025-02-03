import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamCard from '../components/TeamCard';

function TeamsPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/team', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setTeams(response.data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const handleTeamClick = (id) => {
    console.log('Equipo seleccionado:', id);
  };

  return (
    <div className="teams-page">
      <h2>Tus Equipos</h2>
      <div className="teams-list">
        {teams.map(team => (
          <TeamCard key={team.id} team={team} onClick={handleTeamClick} />
        ))}
      </div>
    </div>
  );
}

export default TeamsPage;