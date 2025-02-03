import React from 'react';

function EquipmentConfig({ equipment, setEquipment }) {
  const handleFileChange = (key, file) => {
    setEquipment({ ...equipment, [key]: file });
  };

  return (
    <div>
      <h4>Equipaciones</h4>
      <label>Primera Equipación:</label>
      <input type="file" onChange={(e) => handleFileChange('firstKit', e.target.files[0])} />

      <label>Segunda Equipación:</label>
      <input type="file" onChange={(e) => handleFileChange('secondKit', e.target.files[0])} />

      <label>Primera Equipación Portero:</label>
      <input type="file" onChange={(e) => handleFileChange('gkFirstKit', e.target.files[0])} />

      <label>Segunda Equipación Portero:</label>
      <input type="file" onChange={(e) => handleFileChange('gkSecondKit', e.target.files[0])} />
    </div>
  );
}

export default EquipmentConfig;
