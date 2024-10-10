import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [stockMessage, setStockMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState(''); // Estado para el mensaje de inicio de sesión
  const navigate = useNavigate();

  // Cargar productos del localStorage
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCartItems.length > 0) {
      setCartItems(savedCartItems);
      savedCartItems.forEach(item => {
        console.log(`Item en carrito: ${item.name}, Stock: ${item.stock}`);
      });
      console.log("Elementos en el carrito:", savedCartItems);
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Reducir la cantidad del producto o eliminarlo
  const decreaseItemQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null; // Si la cantidad es 1, se eliminará
        }
      }
      return item;
    }).filter(item => item !== null);
    setCartItems(updatedCartItems);
  };

  const increaseItemQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        console.log(`Evaluando item: ${item.name}, Cantidad: ${item.quantity}, Stock: ${item.stock}`);

        // Comprobar que la cantidad no supere el stock
        if (item.quantity < item.stock) {
          console.log(`Cantidad aumentada: ${item.quantity + 1}`);
          setStockMessage(''); // Limpiar mensaje de stock insuficiente
          return { ...item, quantity: item.quantity + 1 };
        } else {
          // Mostrar mensaje si no hay suficiente stock
          const message = `No hay suficiente stock disponible para ${item.name}. Stock actual: ${item.stock}`;
          setStockMessage(message); // Actualiza el mensaje
          setShowPopup(true); // Muestra el popup
          return item; // No actualizar la cantidad
        }
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  // Eliminar producto del carrito
  const removeItemFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  // Calcular el total del carrito
  const totalCarrito = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Confirmar carrito y verificar stock
  const handleConfirmCart = () => {
    // Verificar si el usuario está logueado
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    if (!token) { // Si no hay token, mostrar mensaje y redirigir a la página de inicio de sesión
      setLoginMessage('Por favor, inicie sesión para continuar.'); // Mensaje de inicio de sesión
      setTimeout(() => {
        navigate('/login'); // Cambia la ruta según la que uses para la página de inicio de sesión
      }, 2000); // Esperar 2 segundos antes de redirigir
      return; // Salir de la función
    }

    const itemsExceedingStock = cartItems.filter(item => item.quantity > item.stock);
    if (itemsExceedingStock.length > 0) {
      const stockMessages = itemsExceedingStock.map(item => `${item.name}: stock disponible ${item.stock}`);
      setPopupMessage(`No se puede confirmar el pedido. Los siguientes productos no tienen suficiente stock:\n${stockMessages.join('\n')}`);
      setShowPopup(true);
    } else {
      navigate('/confirmacion-pedido', { state: { cartItems, totalCarrito } });
    }
  };

  // Cerrar popup de error de stock
  const closePopup = () => {
    setShowPopup(false);
    setStockMessage(''); // Limpiar el mensaje de stock al cerrar
  };

  return (
    <div className="cart">
      <button className="close-icon" onClick={onClose}>
        <FaTimes />
      </button>
      <h2>Carrito de Compras</h2>

      {/* Mensaje de inicio de sesión */}
      {loginMessage && <p className="login-message">{loginMessage}</p>}

      {/* Mensaje de stock */}
      {stockMessage && <p className="stock-message">{stockMessage}</p>}

      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              {item.image && <img src={item.image} alt={item.name} />}
              <div>
                <h3>{item.name}</h3>
                <div className="quantity-control-container">
                  <div className="quantity-control">
                    <button onClick={() => decreaseItemQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => increaseItemQuantity(item.id)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="price-container">
                  {item.discount > 0 ? (
                    <div style={{ textAlign: 'right', width: '100%' }}>
                      <p style={{ textDecoration: 'line-through', color: 'gray', margin: 0 }}>
                        ${item.originalPrice} x {item.quantity}
                      </p>
                      <p style={{ fontWeight: 'bold', color: 'green', margin: 0 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p style={{ textAlign: 'right', width: '100%', margin: 0 }}>
                      ${ (item.price * item.quantity).toFixed(2) }
                    </p>
                  )}

                  <button className="remove-icon" onClick={() => removeItemFromCart(item.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </li>
          ))}
          <div className="cart-total">
            <h3>Total: ${totalCarrito.toFixed(2)}</h3>
          </div>
        </div>
      )}
      <button 
        className="confirm-cart" 
        onClick={handleConfirmCart} 
        disabled={cartItems.length === 0} // Deshabilita el botón si el carrito está vacío
      >
        Confirmar Carrito
      </button>

      {/* Popup para errores de stock */}
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={closePopup}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
