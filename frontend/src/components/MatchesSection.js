import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MatchesSection({ user, teams, setView }) {
  // Estado para listar partidos
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Estado para el formulario de creación (incluye nuevos campos)
  const [formData, setFormData] = useState({
    match_date: '',
    match_time: '',
    match_place: '',
    opponent: '',
    match_type: 'amistoso',
    localUniform: '',    // Color de equipación local
    localShield: '',     // URL del escudo del equipo local
    visitorUniform: '',  // Color de equipación visitante
    visitorShield: ''    // URL del escudo del equipo visitante
  });

  // Estado para editar partidos
  const [editingMatch, setEditingMatch] = useState(null);
  const [editFormData, setEditFormData] = useState({
    equipo_local: '',
    equipo_visitante: '',
    nombre_campo: '',
    hora_partido: '',
    dia_partido: '',
    tipo_partido: 'amistoso',
    equipacion_equipo_local: '',
    equipacion_equipo_visitante: '',
    escudo_equipo_local: '',
    escudo_equipo_visitante: ''
  });

  // Obtener partidos cuando se selecciona un equipo
  useEffect(() => {
    const fetchMatches = async () => {
      if (!selectedTeam) return;
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/match?teamId=${selectedTeam}`);
        setMatches(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('❌ Error al obtener partidos:', error);
        setError('Error al cargar partidos.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedTeam) {
      fetchMatches();
    }
  }, [selectedTeam]);

  // Manejar cambios en el formulario de creación
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Crear un partido nuevo (incluye nuevos campos)
  const handleCreateMatch = async (e) => {
    e.preventDefault();
    if (!selectedTeam) {
      alert('Por favor, selecciona un equipo antes de crear un partido.');
      return;
    }

    // Se obtiene el nombre del equipo local a partir del arreglo "teams"
    const team = teams.find(t => String(t.id) === selectedTeam);
    const equipo_local = team ? team.name : '';

    const payload = {
      equipo_local,                               // Nombre del equipo local (del usuario)
      equipo_visitante: formData.opponent,        // Equipo rival
      nombre_campo: formData.match_place,         // Lugar del partido
      hora_partido: formData.match_time,          // Hora
      dia_partido: formData.match_date,           // Fecha
      tipo_partido: formData.match_type,          // Tipo: 'amistoso', 'liga' o 'copa'
      team_id: selectedTeam,
      // Campos para el color de equipación
      equipacion_equipo_local: formData.localUniform,
      equipacion_equipo_visitante: formData.visitorUniform,
      // Nuevos campos para el escudo (URL)
      escudo_equipo_local: formData.localShield,
      escudo_equipo_visitante: formData.visitorShield
    };

    try {
      const response = await axios.post('http://localhost:5000/api/match', payload);
      alert(response.data.message);
      setMatches([...matches, { id: response.data.matchId, ...payload }]);
      setShowForm(false);
      // Reiniciamos el formulario
      setFormData({
        match_date: '',
        match_time: '',
        match_place: '',
        opponent: '',
        match_type: 'amistoso',
        localUniform: '',
        localShield: '',
        visitorUniform: '',
        visitorShield: ''
      });
    } catch (error) {
      console.error('❌ Error al crear el partido:', error);
      alert('Hubo un problema al crear el partido.');
    }
  };

  // Función para iniciar la edición de un partido
  const handleEditClick = (match) => {
    setEditingMatch(match);
    setEditFormData({
      equipo_local: match.equipo_local,
      equipo_visitante: match.equipo_visitante,
      nombre_campo: match.nombre_campo,
      hora_partido: match.hora_partido,
      dia_partido: match.dia_partido,
      tipo_partido: match.tipo_partido,
      equipacion_equipo_local: match.equipacion_equipo_local || '',
      equipacion_equipo_visitante: match.equipacion_equipo_visitante || '',
      escudo_equipo_local: match.escudo_equipo_local || '',
      escudo_equipo_visitante: match.escudo_equipo_visitante || ''
    });
  };

  // Manejar cambios en el formulario de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Enviar la edición del partido
  const handleEditSubmit = async (e, matchId) => {
    e.preventDefault();
    try {
      const payload = { ...editFormData };
      await axios.put(`http://localhost:5000/api/match/${matchId}`, payload);
      alert('Partido actualizado exitosamente');
      setMatches(matches.map(match => match.id === matchId ? { ...match, ...payload } : match));
      setEditingMatch(null);
    } catch (error) {
      console.error('❌ Error al actualizar el partido:', error);
      alert('Hubo un problema al actualizar el partido.');
    }
  };

  return (
    <div>
      <h3>Partidos</h3>
      <label>Selecciona un equipo:</label>
      <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
        <option value="">-- Selecciona un equipo --</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>

      {loading ? (
        <p>Cargando partidos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        selectedTeam && (
          <>
            {matches.length > 0 ? (
              matches.map(match => (
                <div key={match.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                  {editingMatch && editingMatch.id === match.id ? (
                    <form onSubmit={(e) => handleEditSubmit(e, match.id)}>
                      <div>
                        <label>Equipo Local:</label>
                        <input
                          type="text"
                          name="equipo_local"
                          value={editFormData.equipo_local}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Equipo Visitante:</label>
                        <input
                          type="text"
                          name="equipo_visitante"
                          value={editFormData.equipo_visitante}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Nombre del campo:</label>
                        <input
                          type="text"
                          name="nombre_campo"
                          value={editFormData.nombre_campo}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Hora del partido:</label>
                        <input
                          type="time"
                          name="hora_partido"
                          value={editFormData.hora_partido}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Fecha del partido:</label>
                        <input
                          type="date"
                          name="dia_partido"
                          value={editFormData.dia_partido}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Tipo de partido:</label>
                        <select
                          name="tipo_partido"
                          value={editFormData.tipo_partido}
                          onChange={handleEditChange}
                        >
                          <option value="amistoso">Amistoso</option>
                          <option value="liga">Liga</option>
                          <option value="copa">Copa</option>
                        </select>
                      </div>
                      <div>
                        <label>Color de Equipación Local:</label>
                        <input
                          type="text"
                          name="equipacion_equipo_local"
                          value={editFormData.equipacion_equipo_local}
                          onChange={handleEditChange}
                          placeholder="Color de equipación local"
                        />
                      </div>
                      <div>
                        <label>Escudo Local (URL):</label>
                        <input
                          type="text"
                          name="escudo_equipo_local"
                          value={editFormData.escudo_equipo_local}
                          onChange={handleEditChange}
                          placeholder="URL del escudo local"
                        />
                      </div>
                      <div>
                        <label>Color de Equipación Visitante:</label>
                        <input
                          type="text"
                          name="equipacion_equipo_visitante"
                          value={editFormData.equipacion_equipo_visitante}
                          onChange={handleEditChange}
                          placeholder="Color de equipación visitante"
                        />
                      </div>
                      <div>
                        <label>Escudo Visitante (URL):</label>
                        <input
                          type="text"
                          name="escudo_equipo_visitante"
                          value={editFormData.escudo_equipo_visitante}
                          onChange={handleEditChange}
                          placeholder="URL del escudo visitante"
                        />
                      </div>
                      <button type="submit">Guardar cambios</button>
                      <button type="button" onClick={() => setEditingMatch(null)}>
                        Cancelar
                      </button>
                    </form>
                  ) : (
                    <>
                      <h4>Fecha: {match.dia_partido}</h4>
                      <p><strong>Hora:</strong> {match.hora_partido}</p>
                      <p><strong>Lugar:</strong> {match.nombre_campo}</p>
                      <p><strong>Equipo Local:</strong> {match.equipo_local}</p>
                      <p><strong>Rival:</strong> {match.equipo_visitante}</p>
                      <p><strong>Tipo:</strong> {match.tipo_partido}</p>
                      <p><strong>Color Equipación Local:</strong> {match.equipacion_equipo_local}</p>
                      <p>
                        <strong>Escudo Local:</strong> {match.escudo_equipo_local && (
                          <img src={match.escudo_equipo_local} alt="Escudo Local" style={{ width: '50px' }} />
                        )}
                      </p>
                      <p><strong>Color Equipación Visitante:</strong> {match.equipacion_equipo_visitante}</p>
                      <p>
                        <strong>Escudo Visitante:</strong> {match.escudo_equipo_visitante && (
                          <img src={match.escudo_equipo_visitante} alt="Escudo Visitante" style={{ width: '50px' }} />
                        )}
                      </p>
                      <button onClick={() => handleEditClick(match)}>Editar</button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No hay partidos disponibles para este equipo.</p>
            )}

            {/* Formulario para crear un nuevo partido */}
            <button onClick={() => setShowForm(true)}>➕ Añadir Partido</button>
            {showForm && (
              <form onSubmit={handleCreateMatch}>
                <div>
                  <label>Fecha del partido:</label>
                  <input type="date" name="match_date" value={formData.match_date} onChange={handleChange} required />
                </div>
                <div>
                  <label>Hora del partido:</label>
                  <input type="time" name="match_time" value={formData.match_time} onChange={handleChange} required />
                </div>
                <div>
                  <label>Lugar del partido:</label>
                  <input
                    type="text"
                    name="match_place"
                    placeholder="Nombre del campo"
                    value={formData.match_place}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Rival:</label>
                  <input
                    type="text"
                    name="opponent"
                    placeholder="Equipo rival"
                    value={formData.opponent}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Tipo de partido:</label>
                  <select name="match_type" value={formData.match_type} onChange={handleChange}>
                    <option value="amistoso">Amistoso</option>
                    <option value="liga">Liga</option>
                    <option value="copa">Copa</option>
                  </select>
                </div>
                <div>
                  <label>Color de Equipación Local:</label>
                  <input
                    type="text"
                    name="localUniform"
                    placeholder="Color de equipación local"
                    value={formData.localUniform}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Escudo Local (URL):</label>
                  <input
                    type="text"
                    name="localShield"
                    placeholder="URL del escudo local"
                    value={formData.localShield}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Color de Equipación Visitante:</label>
                  <input
                    type="text"
                    name="visitorUniform"
                    placeholder="Color de equipación visitante"
                    value={formData.visitorUniform}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Escudo Visitante (URL):</label>
                  <input
                    type="text"
                    name="visitorShield"
                    placeholder="URL del escudo visitante"
                    value={formData.visitorShield}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Crear Partido</button>
              </form>
            )}
          </>
        )
      )}
      <button onClick={() => setView('')}>Volver al menú</button>
    </div>
  );
}

export default MatchesSection;
