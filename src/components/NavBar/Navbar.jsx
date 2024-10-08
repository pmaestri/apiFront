import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBook } from 'react-icons/fa';
import Cart from '../Cart/Cart.jsx';  // Importamos el componente del carrito

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false); // Estado para mostrar/ocultar carrito

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Buscando:", searchQuery);
  };

  const token = localStorage.getItem('token');

  const handleCatalogClick = () => {
    if (location.pathname === '/ProductCatalog') {
      window.location.reload();  // Recarga la página si ya estás en ProductCatalog
    }
  };

  // Función para mostrar/ocultar carrito
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <nav className="navbar">
      <div className="logo-and-links">
        <div className="logo">
          <Link to="/">
            <img src="/src/assets/images/logo1.png" alt="Logo" />
          </Link>
        </div>

        {/* Ícono de catálogo */}
        <div className="catalogo">
          <Link to="/ProductCatalog" onClick={handleCatalogClick}>Catálogo</Link>
        </div>

        <ul className="navbar-links">
          {/* Fundas */}
          <li className="dropdown">
            <Link to="#">Fundas</Link>
            <ul className="dropdown-content">
              <li className="sub-dropdown">
                <Link to="#">iPhone</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    <li><Link to="/categories/fundas/iphone/models/15_pro_max">iPhone 15 Pro Max</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/15_pro">iPhone 15 Pro</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/15_plus">iPhone 15 Plus</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/15">iPhone 15</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/14_pro_max">iPhone 14 Pro Max</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/14_pro">iPhone 14 Pro</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/14_plus">iPhone 14 Plus</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/14">iPhone 14</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/13_pro_max">iPhone 13 Pro Max</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/13_pro">iPhone 13 Pro</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/13_mini">iPhone 13 Mini</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/13">iPhone 13</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/se_3">iPhone SE (3ª generación)</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/12_pro_max">iPhone 12 Pro Max</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/12_pro">iPhone 12 Pro</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/12">iPhone 12</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/11">iPhone 11</Link></li>
                  </div>
                </ul>
              </li>
              <li className="sub-dropdown">
                <Link to="#">Samsung</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    <li><Link to="/categories/fundas/samsung/models/galaxy_s23_ultra">Galaxy S23 Ultra</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_s23_plus">Galaxy S23 Plus</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_s23">Galaxy S23</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_z_fold_5">Galaxy Z Fold 5</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_z_flip_5">Galaxy Z Flip 5</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_s22_ultra">Galaxy S22 Ultra</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_s22_plus">Galaxy S22 Plus</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_s22">Galaxy S22</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_a54_5g">Galaxy A54 5G</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_a34_5g">Galaxy A34 5G</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_a14_5g">Galaxy A14 5G</Link></li>
                    <li><Link to="/categories/fundas/samsung/models/galaxy_a04s">Galaxy A04S</Link></li>
                  </div>
                </ul>
              </li>
              <li className="sub-dropdown">
                <Link to="#">Motorola</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    <li><Link to="/categories/fundas/motorola/models/edge_40_pro">Motorola Edge 40 Pro</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/edge_40">Motorola Edge 40</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/edge_30_ultra">Motorola Edge 30 Ultra</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/edge_30_fusion">Motorola Edge 30 Fusion</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/g73_5g">Moto G73 5G</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/g53_5g">Moto G53 5G</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/g23">Moto G23</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/g13">Moto G13</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/e22">Moto E22</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/e32">Moto E32</Link></li>
                  </div>
                </ul>
              </li>
              <li><Link to="/categories/fundas/vertodo">Ver Todo</Link></li>
            </ul>
          </li>

          {/* Vidrios */}
          <li className="dropdown">
            <Link to="#">Vidrios</Link>
            <ul className="dropdown-content">
              <li className="sub-dropdown">
                <Link to="#">iPhone</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    <li><Link to="/categories/fundas/iphone/models/15_pro_max">iPhone 15 Pro Max</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/15_pro">iPhone 15 Pro</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/15_plus">iPhone 15 Plus</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/15">iPhone 15</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/14_pro_max">iPhone 14 Pro Max</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/14_pro">iPhone 14 Pro</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/14_plus">iPhone 14 Plus</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/14">iPhone 14</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/13_pro_max">iPhone 13 Pro Max</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/13_pro">iPhone 13 Pro</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/13_mini">iPhone 13 Mini</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/13">iPhone 13</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/se_3">iPhone SE (3ª generación)</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/12_pro_max">iPhone 12 Pro Max</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/12_pro">iPhone 12 Pro</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/12">iPhone 12</Link></li>
                    <li><Link to="/categories/fundas/iphone/models/11">iPhone 11</Link></li>
                  </div>
                </ul>
              </li>
              <li className="sub-dropdown">
                <Link to="#">Samsung</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_s23_ultra">Galaxy S23 Ultra</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_s23_plus">Galaxy S23 Plus</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_s23">Galaxy S23</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_z_fold_5">Galaxy Z Fold 5</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_z_flip_5">Galaxy Z Flip 5</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_s22_ultra">Galaxy S22 Ultra</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_s22_plus">Galaxy S22 Plus</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_s22">Galaxy S22</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_a54_5g">Galaxy A54 5G</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_a34_5g">Galaxy A34 5G</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_a14_5g">Galaxy A14 5G</Link></li>
                    <li><Link to="/categories/vidrios/samsung/models/galaxy_a04s">Galaxy A04S</Link></li>
                  </div>
                </ul>
              </li>
              <li className="sub-dropdown">
                <Link to="#">Motorola</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    <li><Link to="/categories/fundas/motorola/models/edge_40_pro">Motorola Edge 40 Pro</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/edge_40">Motorola Edge 40</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/edge_30_ultra">Motorola Edge 30 Ultra</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/edge_30_fusion">Motorola Edge 30 Fusion</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/g73_5g">Moto G73 5G</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/g53_5g">Moto G53 5G</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/g23">Moto G23</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/g13">Moto G13</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/e22">Moto E22</Link></li>
                    <li><Link to="/categories/fundas/motorola/models/e32">Moto E32</Link></li>
                  </div>
                </ul>
              </li>
              <li><Link to="/categories/vidrios/vertodo">Ver Todo</Link></li>
            </ul>
          </li>

          {/* Cargadores */}
          <li className="dropdown">
            <Link to="#">Cargadores</Link>
            <ul className="dropdown-content">
              <li className="sub-dropdown">
                <Link to="#">iPhone</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    {/* Agrega aquí las opciones de iPhone para cargadores */}
                  </div>
                </ul>
              </li>
              <li className="sub-dropdown">
                <Link to="#">Samsung</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    {/* Agrega aquí las opciones de Samsung para cargadores */}
                  </div>
                </ul>
              </li>
              <li className="sub-dropdown">
                <Link to="#">Motorola</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    {/* Agrega aquí las opciones de Motorola para cargadores */}
                  </div>
                </ul>
              </li>
              <li><Link to="/categories/cargadores/vertodo">Ver Todo</Link></li>
            </ul>
          </li>

          {/* Auriculares */}
          <li className="dropdown">
            <Link to="#">Auriculares</Link>
            <ul className="dropdown-content">
              <li className="sub-dropdown">
                <Link to="#">iPhone</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    {/* Agrega aquí las opciones de iPhone para auriculares */}
                  </div>
                </ul>
              </li>
              <li className="sub-dropdown">
                <Link to="#">Samsung</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    {/* Agrega aquí las opciones de Samsung para auriculares */}
                  </div>
                </ul>
              </li>
              <li className="sub-dropdown">
                <Link to="#">Motorola</Link>
                <ul className="sub-dropdown-content">
                  <div className="multi-column-menu">
                    {/* Agrega aquí las opciones de Motorola para auriculares */}
                  </div>
                </ul>
              </li>
              <li><Link to="/categories/auriculares/vertodo">Ver Todo</Link></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Barra de búsqueda y nuevos iconos */}
      <div className="search-and-icons">
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
 <div className="icon-container">
          <FaShoppingCart className="nav-icon" onClick={toggleCart} title="Carrito" />
        </div>

        {/* Icono de inicio de sesión */}
        <div className="icon-container">
          <Link to="/login">
            <FaUser className="nav-icon" title="Iniciar sesión" />
          </Link>
        </div>
      </div>

      {/* Renderizar el carrito si showCart es verdadero */}
      {showCart && <Cart onClose={toggleCart} />}  {/* Aquí pasamos la función toggleCart como onClose */}
    </nav>
  );
};

export default Navbar;
