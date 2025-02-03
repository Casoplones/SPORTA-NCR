import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateTrainingPage() {
  const [trainingDate, setTrainingDate] = useState('');
  const [trainingTime, setTrainingTime] = useState('');
  const [trainingPlace, setTrainingPlace] = useState('');
  const [trainingType, setTrainingType] = useState('');
  const [goalkeeperTraining, setGoalkeeperTraining] = useState(false);
  const [teamId, setTeamId] = useState('');

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Obtener equipos del usuario (entrenador) desde el backend
    const fetchTeams = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.role !== 'entrenador') {
        alert('No tienes permisos para crear entrenamientos.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/team?userId=${user.id}`);
        setTeams(response.data);
        if (response.data.length > 0) {
          setTeamId(response.data[0].id); // Selecciona el primer equipo por defecto
        }
      } catch (error) {
        console.error('Error al obtener equipos:', error);
        alert('Hubo un problema al cargar los equipos.');
      }
    };

    fetchTeams();
  }, []);

  const handleCreateTraining = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/training', {
        training_date: trainingDate,
        training_time: trainingTime,
        training_place: trainingPlace,
        training_type: trainingType,
        goalkeeper_training: goalkeeperTraining,
        team_id: teamId,
      });

      alert('Entrenamiento creado exitosamente');
      window.location.href = '/dashboard'; // Redirige al dashboard
    } catch (error) {
      console.error('Error al crear el entrenamiento:', error);
      alert('Hubo un problema al crear el entrenamiento.');
    }
  };

  return (
    <div className="create-training-page">
      <h2>Crear Entrenamiento</h2>
      <form onSubmit={handleCreateTraining}>
        <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
          <option value="">Selecciona un equipo</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          placeholder="Fecha del Entrenamiento"
          value={trainingDate}
          onChange={(e) => setTrainingDate(e.target.value)}
        />
        <input
          type="time"
          placeholder="Hora del Entrenamiento"
          value={trainingTime}
          onChange={(e) => setTrainingTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lugar del Entrenamiento"
          value={trainingPlace}
          onChange={(e) => setTrainingPlace(e.target.value)}
        />
        <select value={trainingType} onChange={(e) => setTrainingType(e.target.value)}>
          <option value="">Selecciona el tipo de entrenamiento</option>
          <option value="fisico">Físico</option>
          <option value="tactico">Táctico</option>
          <option value="hibrido">Híbrido</option>
        </select>
        <label>
          Entrenamiento para porteros
          <input
            type="checkbox"
            checked={goalkeeperTraining}
            onChange={(e) => setGoalkeeperTraining(e.target.checked)}
          />
        </label>
        <button type="submit">Crear Entrenamiento</button>
      </form>
    </div>
  );
}

export default CreateTrainingPage;
