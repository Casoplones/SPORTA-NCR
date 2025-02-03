import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <header>
        <h1>Bienvenido a Sporta</h1>
        <Link to="/login">
          <FaUserCircle size={30} />
        </Link>
      </header>
      <main>
        <p>Sporta te ayuda a gestionar equipos, partidos y entrenamientos de forma sencilla.</p>
      </main>
    </div>
  );
}

export default HomePage;