import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainingsSection({ user, teams, setView }) {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [formData, setFormData] = useState({
    training_date: '',
    training_time: '',
    training_place: '',
    training_type: 'físico',
    goalkeeper_training: false
  });
  const [editingTraining, setEditingTraining] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      if (!selectedTeam) return;

      setLoading(true);

      try {
        console.log(`🔄 Cargando entrenamientos para el equipo ${selectedTeam}...`);
        const response = await axios.get(`http://localhost:5000/api/training?teamId=${selectedTeam}`);
        console.log('✅ Entrenamientos obtenidos:', response.data);

        setTrainings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('❌ Error al obtener entrenamientos:', error);
        setError('Error al cargar entrenamientos.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedTeam) {
      fetchTrainings();
    }
  }, [selectedTeam]);

  // ✅ Manejador para el cambio de valores en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ✅ Enviar formulario para agregar entrenamiento
  const handleCreateTraining = async (e) => {
    e.preventDefault();

    if (!selectedTeam) {
      alert('Por favor, selecciona un equipo antes de crear un entrenamiento.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/training', {
        ...formData,
        team_id: selectedTeam
      });

      alert(response.data.message);
      setTrainings([...trainings, { id: response.data.trainingId, ...formData }]);
      setFormData({
        training_date: '',
        training_time: '',
        training_place: '',
        training_type: 'físico',
        goalkeeper_training: false
      });
    } catch (error) {
      console.error('❌ Error al crear el entrenamiento:', error);
      alert('Hubo un problema al crear el entrenamiento.');
    }
  };

  // ✅ Manejador para eliminar entrenamiento
  const handleDeleteTraining = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este entrenamiento?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/training/${id}`);
      alert('Entrenamiento eliminado exitosamente.');
      setTrainings(trainings.filter((t) => t.id !== id));
    } catch (error) {
      console.error('❌ Error al eliminar el entrenamiento:', error);
      alert('Hubo un problema al eliminar el entrenamiento.');
    }
  };

  // ✅ Manejador para abrir el formulario de edición
  const handleEditTraining = (training) => {
    setEditingTraining(training);
    setFormData({
      training_date: training.training_date,
      training_time: training.training_time,
      training_place: training.training_place,
      training_type: training.training_type,
      goalkeeper_training: training.goalkeeper_training
    });
  };

  // ✅ Enviar formulario de edición
  const handleUpdateTraining = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/training/${editingTraining.id}`, formData);
      alert(response.data.message);

      setTrainings(
        trainings.map((t) =>
          t.id === editingTraining.id ? { ...t, ...formData } : t
        )
      );
      setEditingTraining(null);
    } catch (error) {
      console.error('❌ Error al actualizar el entrenamiento:', error);
      alert('Hubo un problema al actualizar el entrenamiento.');
    }
  };

  return (
    <div>
      <h3>Entrenamientos</h3>

      <label>Selecciona un equipo:</label>
      <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
        <option value="">-- Selecciona un equipo --</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>

      {loading ? (
        <p>Cargando entrenamientos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        selectedTeam && (
          <>
            {trainings.length > 0 ? (
              trainings.map((training) => (
                <div key={training.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                  <h4>Fecha: {training.training_date}</h4>
                  <p><strong>Hora:</strong> {training.training_time}</p>
                  <p><strong>Lugar:</strong> {training.training_place}</p>
                  <p><strong>Tipo:</strong> {training.training_type}</p>
                  <p><strong>Entrenamiento para porteros:</strong> {training.goalkeeper_training ? 'Sí' : 'No'}</p>
                  <button onClick={() => handleEditTraining(training)}>✏ Editar</button>
                  <button onClick={() => handleDeleteTraining(training.id)}>🗑 Eliminar</button>
                </div>
              ))
            ) : (
              <p>No hay entrenamientos disponibles para este equipo.</p>
            )}

            <h4>Añadir Entrenamiento</h4>
            <form onSubmit={handleCreateTraining}>
              <label>Fecha:</label>
              <input type="date" name="training_date" value={formData.training_date} onChange={handleChange} required />

              <label>Hora:</label>
              <input type="time" name="training_time" value={formData.training_time} onChange={handleChange} required />

              <label>Lugar:</label>
              <input type="text" name="training_place" value={formData.training_place} onChange={handleChange} required />

              <label>Tipo:</label>
              <select name="training_type" value={formData.training_type} onChange={handleChange}>
                <option value="físico">Físico</option>
                <option value="táctico">Táctico</option>
                <option value="híbrido">Híbrido</option>
              </select>

              <label>
                <input type="checkbox" name="goalkeeper_training" checked={formData.goalkeeper_training} onChange={handleChange} />
                Entrenamiento específico para porteros
              </label>

              <button type="submit">Crear Entrenamiento</button>
            </form>
          </>
        )
      )}

      {editingTraining && (
        <div>
          <h4>Editar Entrenamiento</h4>
          <form onSubmit={handleUpdateTraining}>
            <label>Fecha:</label>
            <input type="date" name="training_date" value={formData.training_date} onChange={handleChange} required />

            <label>Hora:</label>
            <input type="time" name="training_time" value={formData.training_time} onChange={handleChange} required />

            <button type="submit">Guardar Cambios</button>
            <button onClick={() => setEditingTraining(null)}>Cancelar</button>
          </form>
        </div>
      )}

      <button onClick={() => setView('')}>Volver al menú</button>
    </div>
  );
}

export default TrainingsSection;
