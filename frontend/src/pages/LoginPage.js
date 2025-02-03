import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirigir automáticamente al Dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Credenciales inválidas. Verifica tu correo y contraseña.');
    }
  };

  return (
    <div className="login-page">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      
      {/* Enlace al registro */}
      <p>
        ¿No tienes cuenta?{' '}
        <a href="/register" style={{ color: 'blue', cursor: 'pointer' }}>
          Regístrate
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
