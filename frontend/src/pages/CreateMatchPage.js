import React from 'react';
import FormComponent from '../components/FormComponent';
import axios from 'axios';

function CreateMatchPage() {
  const matchFields = [
    { name: 'local_team', label: 'Equipo Local', required: true },
    { name: 'visitor_team', label: 'Equipo Visitante', required: true },
    { name: 'match_date', label: 'Fecha del Partido', type: 'date', required: true },
    { name: 'match_time', label: 'Hora del Partido', type: 'time', required: true },
    { name: 'match_field', label: 'Campo del Partido', required: true },
  ];

  const handleSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/match', data);
      alert('Partido creado exitosamente');
    } catch (error) {
      console.error('Error creando el partido:', error);
      alert('Hubo un problema al crear el partido');
    }
  };

  return (
    <div className="form-page">
      <h2>Crear Partido</h2>
      <FormComponent fields={matchFields} onSubmit={handleSubmit} buttonText="Crear Partido" />
    </div>
  );
}

export default CreateMatchPage;