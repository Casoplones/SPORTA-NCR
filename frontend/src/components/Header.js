import React from 'react';
import '../stylesComponents/Header.css';    
import logo from '../assets/logo-principal.png';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';


const Header = () => {
    return (
        <header className="header">
        <img src={logo} alt="Logo Principal" className="logo" />
        <p>Acerca de Sporta</p>
        <p>Funciones</p>
        <p>Precio</p>
        <Link to="/login">
          <FaUserCircle size={30} />
        </Link>
        </header>
    );
};

export default Header;