import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa'; // FaSignOutAlt para cerrar sesión
import Cart from '../Cart/Cart.jsx';
import { obtenerProductosDisponiblesConDetalles } from '../../api/ProductCatalogApi';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productosSugeridos, setProductosSugeridos] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si está logeado
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si el usuario está logeado al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // Volvemos a verificar cada vez que cambie la ruta

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/ProductCatalog?search=${encodeURIComponent(searchQuery)}`);
      setProductosSugeridos([]);
    }
  };

  const handleSelectProduct = (producto) => {
    navigate(`/ProductCatalog?productoId=${producto.id}`);
    setSearchQuery('');
    setProductosSugeridos([]);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    setIsLoggedIn(false);
    navigate('/login'); // Redirigir al home después de cerrar sesión
  };

  return (
    <nav className="navbar">
      <div className="logo-and-links">
        <div className="logo">
          <Link to="/">
            <img src="/src/assets/images/logo1.png" alt="Logo" />
          </Link>
        </div>

        <div className="catalogo">
          <Link to="/ProductCatalog">Catálogo</Link>
        </div>

        <ul className="navbar-links">
          <li><Link to="/ProductCatalog?categoria=1">Fundas</Link></li>
          <li><Link to="/ProductCatalog?categoria=2">Vidrios</Link></li>
          <li><Link to="/ProductCatalog?categoria=3">Cargadores</Link></li>
          <li><Link to="/ProductCatalog?categoria=4">Auriculares</Link></li>
        </ul>
      </div>

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
          {productosSugeridos.length > 0 && (
            <div className="suggestions-box">
              {productosSugeridos.map((producto) => (
                <div 
                  key={producto.id} 
                  className="suggestion-item"
                  onClick={() => handleSelectProduct(producto)}
                >
                  <img src={`data:image/jpeg;base64,${producto.imagen}`} alt={producto.nombre} />
                  <div className="suggestion-details">
                    <p>{producto.nombre}</p>
                    <p>${producto.precio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="icon-container">
          <FaShoppingCart className="nav-icon" onClick={toggleCart} title="Carrito" />
        </div>

        {isLoggedIn ? (
          <div className="icon-container" onClick={handleLogout}>
            <FaSignOutAlt className="nav-icon" title="Cerrar sesión" />
          </div>
        ) : (
          <div className="icon-container">
            <Link to="/login">
              <FaUser className="nav-icon" title="Iniciar sesión" />
            </Link>
          </div>
        )}
      </div>

      {showCart && <Cart onClose={toggleCart} />}
    </nav>
  );
};

export default Navbar;
