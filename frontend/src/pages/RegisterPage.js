import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jugador'); // Valor predeterminado
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password, role });
      alert('Registro exitoso, ahora puedes iniciar sesión');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Hubo un problema al registrar al usuario');
    }
  };

  return (
    <div className="register-page">
      <h2>Regístrate</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="jugador">Jugador</option>
          <option value="entrenador">Entrenador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterPage;
