import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import Cart from '../Cart/Cart.jsx';
import { obtenerProductosDisponiblesConDetalles } from '../../api/ProductCatalogApi';  // API para obtener productos

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productosSugeridos, setProductosSugeridos] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.length > 1) {
        const productos = await obtenerProductosDisponiblesConDetalles();
        const sugeridos = productos.filter(producto => 
          producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProductosSugeridos(sugeridos);
      } else {
        setProductosSugeridos([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/ProductCatalog?search=${encodeURIComponent(searchQuery)}`);
      setProductosSugeridos([]);
    }
  };

  // Redirige al detalle del producto cuando el usuario selecciona una sugerencia
  const handleSelectProduct = (producto) => {
    // Navegamos al catálogo y pasamos el id del producto como parámetro en la URL
    navigate(`/ProductCatalog?productoId=${producto.id}`);
    setSearchQuery('');  // Limpiamos la barra de búsqueda
    setProductosSugeridos([]);  // Ocultamos las sugerencias
  };

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

        <div className="icon-container">
          <Link to="/login">
            <FaUser className="nav-icon" title="Iniciar sesión" />
          </Link>
        </div>
      </div>

      {showCart && <Cart onClose={toggleCart} />}
    </nav>
  );
};

export default Navbar;
