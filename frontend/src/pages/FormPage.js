import React from 'react';
import FormComponent from '../components/FormComponent';
import axios from 'axios';

function FormPage() {
  const teamFields = [
    { name: 'name', label: 'Nombre del Equipo' },
    { name: 'league_name', label: 'Nombre de la Liga' },
    { name: 'code', label: 'Código del Equipo', type: 'number' },
  ];

  const handleSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/team', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Equipo creado exitosamente');
    } catch (error) {
      console.error('Error creando el equipo:', error);
      alert('Hubo un problema al crear el equipo');
    }
  };

  return (
    <div className="form-page">
      <h2>Crear Equipo</h2>
      <FormComponent fields={teamFields} onSubmit={handleSubmit} buttonText="Crear Equipo" />
    </div>
  );
}

export default FormPage;