import React from 'react';

function TrainingCard({ training }) {
  return (
    <div className="training-card">
      <h3>Entrenamiento</h3>
      <p>Fecha: {training.training_date}</p>
      <p>Lugar: {training.training_place}</p>
      <p>Tipo: {training.training_type}</p>
    </div>
  );
}

export default TrainingCard;