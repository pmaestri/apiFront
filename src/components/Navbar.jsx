// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png"; 


const Navbar = () => {
  return (
    <nav className="navbar">
       <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      
      <ul className="navbar-links">
        {/* Categoría Fundas */}
        <li className="dropdown">
          <Link to="#">Fundas</Link>
          <ul className="dropdown-content">
            <li><Link to="/categories/fundas/iphone/models">iPhone</Link></li>
            <li><Link to="/categories/fundas/samsung/models">Samsung</Link></li>
            <li><Link to="/categories/fundas/motorola/models">Motorola</Link></li>
            <li><Link to="/categories/fundas/generico">Genérico</Link></li>
          </ul>
        </li>

        {/* Categoría Vidrios */}
        <li className="dropdown">
          <Link to="#">Vidrios</Link>
          <ul className="dropdown-content">
            <li><Link to="/categories/vidrios/iphone/models">iPhone</Link></li>
            <li><Link to="/categories/vidrios/samsung/models">Samsung</Link></li>
            <li><Link to="/categories/vidrios/motorola/models">Motorola</Link></li>
            <li><Link to="/categories/vidrios/generico">Genérico</Link></li>
          </ul>
        </li>

        {/* Categoría Cargadores */}
        <li className="dropdown">
          <Link to="#">Cargadores</Link>
          <ul className="dropdown-content">
            <li><Link to="/categories/cargadores/iphone/models">iPhone</Link></li>
            <li><Link to="/categories/cargadores/samsung/models">Samsung</Link></li>
            <li><Link to="/categories/cargadores/motorola/models">Motorola</Link></li>
            <li><Link to="/categories/cargadores/generico">Genérico</Link></li>
          </ul>
        </li>

        {/* Categoría Auriculares */}
        <li className="dropdown">
          <Link to="#">Auriculares</Link>
          <ul className="dropdown-content">
            <li><Link to="/categories/auriculares/iphone/models">iPhone</Link></li>
            <li><Link to="/categories/auriculares/samsung/models">Samsung</Link></li>
            <li><Link to="/categories/auriculares/motorola/models">Motorola</Link></li>
            <li><Link to="/categories/auriculares/generico">Genérico</Link></li>
          </ul>
        </li>

    
      </ul>
    </nav>
  );
};

export default Navbar;





