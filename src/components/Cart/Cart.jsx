import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCarrito,
  disminuirCantidad,
  eliminarDelCarrito,
  agregarAlCarrito,
} from '../../api/CartSilce';

const Cart = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener datos desde Redux
  const { carrito, loading, error, successMessage } = useSelector((state) => state.carrito);
  const token = useSelector((state) => state.auth.token);

  // Local state para manejar mensajes
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchCarrito(token));
    } else {
      setLoginMessage('Por favor, inicie sesión para continuar.');
    }
  }, [dispatch, token]);

  const handleAddToCart = (productoId) => {
    if (!token) {
      alert('Por favor, inicia sesión para agregar productos al carrito.');
      return;
    }
    dispatch(agregarAlCarrito({ productoId, cantidad: 1, token }))
    .then(() => {
      // Una vez que se haya agregado el producto, se ejecuta el fetchCarrito
      setTimeout(() => {
        dispatch(fetchCarrito(token));
      }, 1);    })
  };

  const handleDecreaseItemQuantity = (productoId) => {
    dispatch(disminuirCantidad({ productoId, cantidad: 1, token }))
    .then(() => {
        setTimeout(() => {
          dispatch(fetchCarrito(token));
        }, 1);    });
  };

  const handleRemoveItemFromCart = (productoId) => {
    dispatch(eliminarDelCarrito({productoId: productoId,token: token}))
    .then(() => {
        setTimeout(() => {
          dispatch(fetchCarrito(token));
        }, 1);    });;
  };

  const handleConfirmCart = () => {
    if (!token) {
      setLoginMessage('Por favor, inicie sesión para continuar.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const itemsExceedingStock = carrito.productos.filter((item) => item.cantidad > item.stock);
    if (itemsExceedingStock.length > 0) {
      const stockMessages = itemsExceedingStock.map(
        (item) => `${item.nombreProducto}: stock disponible ${item.stock}`
      );
      setPopupMessage(
        `No se puede confirmar el pedido. Productos sin suficiente stock:\n${stockMessages.join(
          '\n'
        )}`
      );
      setShowPopup(true);
    } else {
      navigate('/confirmacion-pedido');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="cart">
      <button className="close-icon" onClick={onClose}>
        <FaTimes />
      </button>
      <h2>Carrito de Compras</h2>

      {loginMessage && <p className="login-message">{loginMessage}</p>}
      {loading ? (
        <p>Cargando carrito...</p>
      ) : carrito.productos.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-items-container">
          {carrito.productos.map((item) => (
            <li key={item.productoId} className="cart-item">
              {item.imagen && (
                <img
                  src={`data:image/jpeg;base64,${item.imagen}`}
                  alt={item.nombreProducto}
                />
              )}
              <div>
                <h3>{item.nombreProducto}</h3>
                <div className="quantity-control-container">
                  <div className="quantity-control">
                    <button onClick={() => handleDecreaseItemQuantity(item.productoId)}>
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      onClick={() => handleAddToCart(item.productoId)}
                      disabled={item.cantidad >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="price-container">
                  <div style={{ textAlign: 'right', width: '100%' }}>
                    {item.subtotal === item.total ? (
                      <p style={{ fontWeight: 'bold', color: 'green', margin: 0 }}>
                        ${item.total}
                      </p>
                    ) : (
                      <>
                        <p
                          style={{
                            textDecoration: 'line-through',
                            color: 'gray',
                            margin: 0,
                          }}
                        >
                          ${item.subtotal}
                        </p>
                        <p style={{ fontWeight: 'bold', color: 'green', margin: 0 }}>
                          ${item.total}
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    className="remove-icon"
                    onClick={() => handleRemoveItemFromCart(item.productoId)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </li>
          ))}
          <div className="cart-total">
            <h3>Total: ${carrito.total.toFixed(2)}</h3>
          </div>
        </div>
      )}
      <button
        className="confirm-cart"
        onClick={handleConfirmCart}
        disabled={carrito.productos.length === 0}
      >
        Confirmar Carrito
      </button>

      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={closePopup}>Cerrar</button>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Cart;
