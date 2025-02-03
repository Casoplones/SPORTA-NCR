import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from '../components/MatchCard';

function MatchesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/match/1', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => setMatches(response.data))
      .catch(error => console.error('Error fetching matches:', error));
  }, []);

  return (
    <div className="matches-page">
      <h2>Partidos</h2>
      <div className="matches-list">
        {matches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

export default MatchesPage;