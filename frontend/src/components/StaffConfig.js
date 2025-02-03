import React from 'react';

function StaffConfig({ staff, setStaff }) {
  return (
    <div>
      <h4>Cuerpo Técnico</h4>
      <label>Cantidad:</label>
      <input
        type="number"
        min="0"
        value={staff}
        onChange={(e) => setStaff(Number(e.target.value))}
      />
    </div>
  );
}

export default StaffConfig;
