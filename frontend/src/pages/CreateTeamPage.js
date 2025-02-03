import React, { useState } from 'react';
import axios from 'axios';

function CreateTeamPage({ userId }) {
  const [name, setName] = useState('');
  const [leagueName, setLeagueName] = useState('');

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/team', {
        name,
        league_name: leagueName,
        created_by: userId,
      });

      alert(`Equipo creado exitosamente. Código del equipo: ${response.data.teamCode}`);
      setName('');
      setLeagueName('');
    } catch (error) {
      console.error('Error al crear el equipo:', error);
      alert('Hubo un problema al crear el equipo.');
    }
  };

  return (
    <div className="form-page">
      <h2>Crear Equipo</h2>
      <form onSubmit={handleCreateTeam}>
        <input
          type="text"
          placeholder="Nombre del equipo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre de la liga"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          required
        />
        <button type="submit">Crear Equipo</button>
      </form>
    </div>
  );
}

export default CreateTeamPage;
