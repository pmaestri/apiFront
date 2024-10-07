import React, { useState, useEffect } from 'react';
import './Cart.css';  
import { FaTrashAlt, FaTimes } from 'react-icons/fa'; // Íconos de FontAwesome

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  // Cargar los productos desde el localStorage solo una vez cuando el componente se monte
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCartItems.length > 0) {
      setCartItems(savedCartItems);
    }
    console.log("Carrito cargado:", savedCartItems);
  }, []); // El array vacío [] asegura que se ejecute solo una vez al montarse el componente.

  // Guardar el carrito en el localStorage cada vez que cartItems cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Siempre guardar el carrito, incluso cuando esté vacío
  }, [cartItems]);

  // Reducir la cantidad de un producto en el carrito o eliminar si es el último
  const decreaseItemQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null; // Si cantidad es 1, marcar para eliminar
        }
      }
      return item;
    }).filter(item => item !== null); // Filtrar los ítems eliminados

    setCartItems(updatedCartItems); // Actualizar el estado con el carrito actualizado
  };

  return (
    <div className="cart">
      {/* Botón para cerrar el pop-up */}
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
                <p>Precio: ${item.price}</p>
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
                {/* Botón para reducir la cantidad o eliminar el producto */}
                <button onClick={() => decreaseItemQuantity(item.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </div>
      )}
      {/* Botón para confirmar el carrito */}
      <button className="confirm-cart">Confirmar Carrito</button>
    </div>
  );
};

export default Cart;
