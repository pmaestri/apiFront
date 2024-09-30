// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Importar estilos para el footer
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Importar ícono de WhatsApp
import { faInstagram } from '@fortawesome/free-brands-svg-icons'; // Importar ícono de Instagram

const Footer = () => {
  return (
    <footer className="footer">
      <p>¡Contáctanos!</p>
      <div className="contact-container"> {/* Contenedor para los contactos */}
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=topcasesarg@gmail.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-contact"
        >
          <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
          topcasesarg@gmail.com
        </a>
        <a 
          href="https://wa.me/5491123456789" // Cambia el número a un formato válido
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-contact"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="footer-icon" />
          +54 9 11 2345-6789 {/* Número inventado */}
        </a>
        <a 
          href="https://www.instagram.com/topcasesarg" // Enlace a Instagram
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-contact"
        >
          <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
          @topcasesarg
        </a>
      </div>
    </footer>
  );
}

export default Footer;
