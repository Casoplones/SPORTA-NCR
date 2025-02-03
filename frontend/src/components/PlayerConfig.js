import React from 'react';

function PlayerConfig({ players, setPlayers }) {
  const positions = ['Portero', 'Defensa', 'Mediocentro', 'Delantero'];

  const handleChange = (position, value) => {
    setPlayers({ ...players, [position]: Number(value) });
  };

  return (
    <div>
      <h4>Configuración de Jugadores</h4>
      {positions.map((position) => (
        <div key={position}>
          <label>{position}:</label>
          <input
            type="number"
            min="0"
            value={players[position] || 0}
            onChange={(e) => handleChange(position, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default PlayerConfig;
