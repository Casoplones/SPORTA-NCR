import React from 'react';
import '../stylesComponents/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <nav className="footer-nav">
                    <a href="/about">Sobre Nosotros</a>
                    <a href="/contact">Contacto</a>
                    <a href="/privacy">Política de Privacidad</a>
                </nav>
                <p className='rights'>&copy; 2025 SPORTA-NCR. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;