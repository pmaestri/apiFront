import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Cart.css';  
import { FaTrashAlt, FaTimes } from 'react-icons/fa'; // Íconos de FontAwesome
import { crearPedido } from '../../api/OrderApi.jsx';

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  // Cargar los productos desde el localStorage solo una vez cuando el componente se monte
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCartItems.length > 0) {
      setCartItems(savedCartItems);
    }
  }, []);

  // Guardar el carrito en el localStorage cada vez que cartItems cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Reducir la cantidad de un producto en el carrito o eliminar si es el último
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

  // Calcular el total del carrito
  const totalCarrito = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Manejar la confirmación del carrito
  const handleConfirmCart = () => {
  // Redirigir a la vista de confirmación y pasar el carrito
  navigate('/confirmacion-pedido', { state: { cartItems, totalCarrito } });
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
                <p>Cantidad:</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    setCartItems(cartItems.map(cartItem =>
                      cartItem.id === item.id
                        ? { ...cartItem, quantity: Math.max(1, newQuantity) }
                        : cartItem
                    ));
                  }}
                  min="1"
                />
                <button onClick={() => decreaseItemQuantity(item.id)}>
                  <FaTrashAlt />
                </button>
                <p style={{ textAlign: 'right', width: '100%' }}> ${item.price * item.quantity}</p>
              </div>
            </li>
          ))}
          <div className="cart-total">
            <h3>Total: ${totalCarrito.toFixed(2)}</h3>
          </div>
        </div>
      )}
      <button className="confirm-cart" onClick={handleConfirmCart}>Confirmar Carrito</button>
    </div>
  );
};

export default Cart;
