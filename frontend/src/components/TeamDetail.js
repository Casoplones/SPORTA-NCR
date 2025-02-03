import React from 'react';

function TeamDetail({ team }) {
  return (
    <div>
      <h2>{team.name}</h2>

      <h3>Cuerpo Técnico</h3>
      <div className="staff-container">
        {[...Array(team.staff)].map((_, i) => <div key={i} className="card">Cuerpo Técnico</div>)}
      </div>

      <h3>Jugadores</h3>
      {Object.keys(team.players).map((position) => (
        <div key={position}>
          <h4>{position}</h4>
          <div className="players-container">
            {[...Array(team.players[position])].map((_, i) => <div key={i} className="card">{position}</div>)}
          </div>
        </div>
      ))}

      <h3>Equipaciones</h3>
      <img src={team.equipment.firstKit} alt="Primera equipación" />
      <img src={team.equipment.secondKit} alt="Segunda equipación" />
      <img src={team.equipment.gkFirstKit} alt="Primera equipación portero" />
      <img src={team.equipment.gkSecondKit} alt="Segunda equipación portero" />
    </div>
  );
}

export default TeamDetail;
