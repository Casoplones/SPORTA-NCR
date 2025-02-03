import React from 'react';

function TeamCard({ team, onClick }) {
  return (
    <div className="team-card" onClick={() => onClick(team.id)}>
      <h3>{team.name}</h3>
      <p>Liga: {team.league_name}</p>
    </div>
  );
}

export default TeamCard;