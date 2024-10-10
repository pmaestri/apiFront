// AdminNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';
import { FaUser, FaClipboardList, FaBoxOpen } from 'react-icons/fa'; // Importa los íconos que desees

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-and-links">
        <div className="logo">
          <Link to="/">
            <img src="/src/assets/images/logo1.png" alt="Logo" />
          </Link>
        </div>
        
        <ul className="navbar-links">
          <li>
            <Link to="/admin-home/usuarios">
              <FaUser /> Usuarios
            </Link>
          </li>
          <li>
            <Link to="/admin-home/ordenes">
              <FaClipboardList /> Órdenes
            </Link>
          </li>
          <li>
            <Link to="/admin-home/productos">
              <FaBoxOpen /> Productos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
