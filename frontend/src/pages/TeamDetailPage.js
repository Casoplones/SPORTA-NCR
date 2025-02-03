import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TeamDetailsPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/team/${id}`)
      .then(response => setTeam(response.data))
      .catch(error => console.error('Error al obtener equipo:', error));
  }, [id]);

  if (!team) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalles del Equipo</h2>
      <p><strong>Nombre:</strong> {team.name}</p>
      <p><strong>Liga:</strong> {team.league_name}</p>
      <p><strong>Código del Equipo:</strong> {team.code}</p>
    </div>
  );
}

export default TeamDetailsPage;
