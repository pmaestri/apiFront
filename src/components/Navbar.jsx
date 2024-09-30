import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; 

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para manejar la búsqueda

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Actualizar el estado de la búsqueda
  };

  const handleSearch = () => {
    console.log("Buscando:", searchQuery);
    // Lógica de búsqueda aquí o redireccionar a una página de resultados
  };

  return (
    <nav className="navbar">
      {/* Contenedor agrupado para el logo y las categorías */}
      <div className="logo-and-links">
        <div className="logo">
          <Link to="/">
            <img src="/src/assets/images/logo1.png" alt="Logo" />
          </Link>
        </div>

        {/* Categorías en la misma fila que el logo */}
        <ul className="navbar-links">
          <li className="dropdown">
            <Link to="#">Fundas</Link>
            <ul className="dropdown-content">
              <li><Link to="/categories/fundas/iphone/models">iPhone</Link></li>
              <li><Link to="/categories/fundas/samsung/models">Samsung</Link></li>
              <li><Link to="/categories/fundas/motorola/models">Motorola</Link></li>
              <li><Link to="/categories/fundas/generico">Genérico</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <Link to="#">Vidrios</Link>
            <ul className="dropdown-content">
              <li><Link to="/categories/vidrios/iphone/models">iPhone</Link></li>
              <li><Link to="/categories/vidrios/samsung/models">Samsung</Link></li>
              <li><Link to="/categories/vidrios/motorola/models">Motorola</Link></li>
              <li><Link to="/categories/vidrios/generico">Genérico</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <Link to="#">Cargadores</Link>
            <ul className="dropdown-content">
              <li><Link to="/categories/cargadores/iphone/models">iPhone</Link></li>
              <li><Link to="/categories/cargadores/samsung/models">Samsung</Link></li>
              <li><Link to="/categories/cargadores/motorola/models">Motorola</Link></li>
              <li><Link to="/categories/cargadores/generico">Genérico</Link></li>
            </ul>
          </li>

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
      </div>

     {/* Barra de búsqueda y nuevos iconos */}
     <div className="search-and-icons"> {/* Contenedor para barra de búsqueda e iconos */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>
            <FaSearch style={{ fontSize: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Icono de carrito */}
        <div className="icon-container"> {/*  Contenedor para icono de carrito */}
          <Link to="/cart"> {/*  Redirige a la página de carrito */}
            <FaShoppingCart className="nav-icon" title="Carrito" /> {/* Icono de carrito */}
          </Link>
        </div>

        {/* Icono de inicio de sesión */}
        <div className="icon-container"> {/*  Contenedor para icono de inicio de sesión */}
          <Link to="/login"> {/*  Redirige a la página de inicio de sesión */}
            <FaUser className="nav-icon" title="Iniciar sesión" /> {/*  Icono de inicio de sesión */}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
