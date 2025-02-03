import React from 'react';

function MatchCard({ match }) {
  return (
    <div className="match-card">
      <h3>{match.local_team} vs {match.visitor_team}</h3>
      <p>Fecha: {match.match_date}</p>
      <p>Hora: {match.match_time}</p>
    </div>
  );
}

export default MatchCard;