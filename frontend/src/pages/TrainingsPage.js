import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainingCard from '../components/TrainingCard';

function TrainingsPage() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/training/1', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setTrainings(response.data))
      .catch(error => console.error('Error fetching trainings:', error));
  }, []);

  return (
    <div className="trainings-page">
      <h2>Entrenamientos</h2>
      <div className="trainings-list">
        {trainings.map(training => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  );
}

export default TrainingsPage;