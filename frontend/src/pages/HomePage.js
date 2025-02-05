import React from 'react';
import { FaUsers } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidTrafficCone } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import Header from '../components/Header';
import '../stylesPages/HomePage.css';
import Footer from '../components/Footer';
import peskitos from  '../assets/peskitos.png';
import accuñados from  '../assets/accuñados.png';
import cantera from '../assets/cantera.png';
import consuegra from '../assets/consuegra.png';
import ff from '../assets/ff.png';
import pacificopanzon from '../assets/pacificopanzon.png';
import gigantes from '../assets/gigantes.png';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <main>

      <section className='bienvenida'>
        <h1 className='h1-bienvenida'>¡Bienvenido a Sporta!</h1>
        <p className='p-bienvenida'>Únete a nostros y empieza a administar tu equipo</p>
        <button className='button-bienvenida'>Comienza a administrar</button>
      </section>

      <section className='section-1'>
        <h2 className='h2-section-1'>¿Quienes somos?</h2>
        <p className='p-section-1.1'>En Sporta, nuestra pasión es el fútbol y nuestro objetivo es hacer la administración de equipos más simple, eficiente y divertida. Somos un equipo comprometido con la innovación tecnológica, que entiende las necesidades de los entrenadores, jugadores y aficionados.</p>
        <p className='p-section-1.2'>Creamos una plataforma intuitiva y completa donde los equipos pueden gestionar sus plantillas, programar partidos, llevar estadísticas, y mucho más. Creemos que el deporte es más que un juego; es una forma de conectar, aprender y crecer, tanto dentro como fuera del campo.</p>
        <p className='p-section-1.3'>En Sporta, trabajamos para que tú solo te preocupes por disfrutar del fútbol. ¡Únete a nuestra comunidad y lleva tu equipo al siguiente nivel!</p>
      </section>

      <section className='section-2'>
        <h2>¿Qué ofrecemos?</h2>
        <div class="container">
            <div class="service">
            <FaUsers className='icon'/>
            <h3>Jugadores y cuerpo técnico</h3>
                <p>Gestiona tu equipo fácilmente: añade, edita o elimina jugadores, organiza partidos con detalles clave y planifica entrenamientos. ¡Enfócate en el juego!</p>
            </div>
            <div class="service">
            <FaLocationDot className='icon'/>
            <h3>Partidos oficiales y amistosos</h3>
                <p>Organiza tus partidos fácilmente: define fecha, hora, lugar, rival y equipación. Asegura que todos estén listos para dar lo mejor en el campo.</p>
            </div>
            <div class="service">
            <BiSolidTrafficCone className='icon'/>
            <h3>Sesiones de entrenamiento</h3>
                <p>Planifica tus entrenamientos fácilmente: establece la hora y define las actividades para mantener a tu equipo en forma y preparado.</p>
            </div>
            <div class="service">
            <MdContactSupport  className='icon'/>
            <h3>Atención 24/7</h3>
                <p>En Sporta ofrecemos atención al cliente los 365 días del año con expertos tanto en perfil tecnológico como en perfil futbolístico.</p>
            </div>
        </div>
      </section>
      <section className='section-3'> 
        <h2>SPORTA X CLUB</h2>
        <div className='carrousel'>
          <div className='wrap'>
          <img src={peskitos} alt="Peskitos" className="img-peskitos" />
          <img src={cantera} alt="Cantera" className="img-cantera" />
          <img src={accuñados} alt="AC Cuñados" className="img-ac-cuñados" />
          <img src={consuegra} alt="Consuegra" className="img-consuegra" />
          <img src={pacificopanzon} alt="Pacifico Panzon" className="img-pacifico-panzon" />
          <img src={ff} alt="FF" className="img-ff" />
          <img src={gigantes} alt="Gigantes" className="img-gigantes" />
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;