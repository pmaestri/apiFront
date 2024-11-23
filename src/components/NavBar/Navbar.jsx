import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa'; // FaSignOutAlt para cerrar sesión
import Cart from '../Cart/Cart.jsx';
import { fetchProductosDisponiblesConDetalles } from '../../api/ProductCatalogSlice.jsx';
import { vaciarCarritoSlice } from '../../api/CartSilce.jsx';
import { useSelector, useDispatch } from 'react-redux';  // Importar useSelector para acceder al estado de Redux
import { logout } from '../../api/AuthSlice.jsx'; // Acción de logout
import { logoutUsuario } from '../../api/UserSlice';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productosSugeridos, setProductosSugeridos] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Obtener el token desde el estado de Redux
  const token = useSelector((state) => state.auth.token);  // Token desde el estado de Redux
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);  // Verifica si el token existe
  const rol = useSelector((state) => state.usuarios.rol);

  // Verificar si el usuario está logeado al montar el componente
  useEffect(() => {
    setIsLoggedIn(!!token); // Actualiza el estado según el token de Redux
  }, [token]); // Dependencia de token


  useEffect(() => {
    const fetchProductos = async () => {
      if (searchQuery.length > 1) {
        // Disparar la acción del thunk para obtener los productos
        dispatch(fetchProductosDisponiblesConDetalles())
          .unwrap()
          .then((productos) => {
            // Filtrar los productos sugeridos
            const sugeridos = productos.filter((producto) =>
              producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProductosSugeridos(sugeridos);
          })
          .catch((error) => {
            console.error('Error al obtener los productos:', error);
            setProductosSugeridos([]);
          });
      } else {
        setProductosSugeridos([]);
      }
    };

    const timeoutId = setTimeout(fetchProductos, 300);

    return () => clearTimeout(timeoutId); // Limpia el timeout al desmontar
  }, [searchQuery, location, dispatch]); // Añadido `dispatch` como dependencia

  const handleCatalogClick = () => {
    if (location.pathname === '/ProductCatalog') {
      window.location.reload();
    } else {
      navigate('/ProductCatalog');
    }
  };

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
  const handleLogout = async () => {
    if (token) {
      try {
        if(rol === 'COMPRADOR'){
          console.log("hola", rol);
          dispatch(vaciarCarritoSlice(token)); // Vaciar el carrito
          console.log('Carrito vaciado exitosamente.');
        }
      
      } catch (error) {
        console.error('Error al vaciar el carrito:', error.message);
      }
    }

    // Despachar acción de logout de Redux
    dispatch(logout());  // Limpiar el estado de Redux
    dispatch(logoutUsuario());
    
    console.log(rol);
    
    navigate('/login');  // Redirigir al login
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
          <a href="#" onClick={handleCatalogClick}>Catálogo</a>
        </div>
      </div>

      <div className="icon-container">
      {rol === 'ADMIN' && (
        <button 
          className="nav-icon-admin" 
          title="Admin"
          onClick={() => navigate('/admin-home/usuarios')}
        >
          Admin
        </button>
      )}
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
          {/* Mostrar el icono del carrito solo si el usuario no es un administrador */}
          {rol !== 'ADMIN' && (
            <FaShoppingCart className="nav-icon" onClick={toggleCart} title="Carrito" />
          )}
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