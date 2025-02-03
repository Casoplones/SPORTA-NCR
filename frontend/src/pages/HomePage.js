import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../stylesPages/HomePage.css';
import logo from '../assets/logo-principal.png';

function HomePage() {
  return (
    <div className="home-page">
      <header>
        <img src={logo} alt="Logo Principal" className="logo" />
        <p>Acerca de Sporta</p>
        <p>Funciones</p>
        <p>Precio</p>
        <Link to="/login">
          <FaUserCircle size={30} />
        </Link>
      </header>
      <main>

      <section className='bienvenida'>
        <h1 className='h1-bienvenida'>¡Bienvenido a Sporta!</h1>
        <p className='p-bienvenida'>únete a nostros y empieza a administar tu equipo</p>
        <button className='button-bienvenida'>Comienza a administrar</button>
      </section>

      <section className='section-1'>
        <h2 className='h2-section-1'>¿Quienes somos?</h2>
        <p className='p-section-1.1'>En Sporta, nuestra pasión es el fútbol y nuestro objetivo es hacer la administración de equipos más simple, eficiente y divertida. Somos un equipo comprometido con la innovación tecnológica, que entiende las necesidades de los entrenadores, jugadores y aficionados.</p>
        <p className='p-section-1.2'>Creamos una plataforma intuitiva y completa donde los equipos pueden gestionar sus plantillas, programar partidos, llevar estadísticas, y mucho más. Creemos que el deporte es más que un juego; es una forma de conectar, aprender y crecer, tanto dentro como fuera del campo.</p>
        <p className='p-section-1.3'>En Sporta, trabajamos para que tú solo te preocupes por disfrutar del fútbol. ¡Únete a nuestra comunidad y lleva tu equipo al siguiente nivel!</p>
      </section>

      <section className='section-2'>
        
      </section>
      </main>
    </div>
  );
}

export default HomePage;