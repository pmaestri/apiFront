
import React from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Variedades Express</div>
      <ul className="navbar-links">
        <li><Link to="/categories/iphone">iPhone</Link></li>
        <li><Link to="/categories/samsung">Samsung</Link></li>
        <li><Link to="/categories/motorola">Motorola</Link></li>
      </ul>
      <div className="navbar-icons">
        <input type="text" placeholder="Buscar..." className="search-bar"/>
        <img src="/assets/cart-icon.png" alt="Carrito" className="cart-icon"/>
      </div>
    </nav>
  );
}

export default Navbar;

