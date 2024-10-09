import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  // Cargar productos del localStorage
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCartItems.length > 0) {
      setCartItems(savedCartItems);
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
          return null;
        }
      }
      return item;
    }).filter(item => item !== null);
    setCartItems(updatedCartItems);
  };

  // Aumentar la cantidad de productos según el stock disponible
  const increaseItemQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        // Verificar si la cantidad supera el stock
        if (item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          // Mostrar mensaje de stock limitado
          setPopupMessage(`No puedes agregar más de ${item.stock} unidades de ${item.name}.`);
          setShowPopup(true);
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
  };

  return (
    <div className="cart">
      <button className="close-icon" onClick={onClose}>
        <FaTimes />
      </button>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              {item.image && <img src={item.image} alt={item.name} />}
              <div>
                <h3>{item.name}</h3>
                <div className="quantity-control">
                  <button onClick={() => decreaseItemQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseItemQuantity(item.id)}>+</button>
                </div>
                
                {/* Mostrar el precio original tachado si hay descuento */}
                {item.discount > 0 ? (
                  <>
                    <p style={{ textDecoration: 'line-through', color: 'gray' }}>
                      ${item.originalPrice} x {item.quantity}
                    </p>
                    <p style={{ fontWeight: 'bold', color: 'green' }}>
                      ${(item.price * item.quantity)}
                    </p>
                  </>
                ) : (
                  <p style={{ textAlign: 'right', width: '100%' }}>
                    ${item.price * item.quantity}
                  </p>
                )}
                
                <button onClick={() => removeItemFromCart(item.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
          <div className="cart-total">
            <h3>Total: ${totalCarrito.toFixed(2)}</h3>
          </div>
        </div>
      )}
      <button className="confirm-cart" onClick={handleConfirmCart}>Confirmar Carrito</button>

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
