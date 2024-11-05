import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';
import { obtenerCarrito, disminuirProductoEnCarrito, eliminarProducto, agregarProducto } from '../../api/CartApi';

const Cart = ({ onClose }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalCarrito, setTotalCarrito] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [stockMessage, setStockMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoginMessage('Por favor, inicie sesión para continuar.');
                return;
            }

            try {
                const carritoData = await obtenerCarrito(token);
                setCartItems(carritoData.productos || []);
                setTotalCarrito(carritoData.total);
            } catch (error) {
                console.error(error);
                setLoginMessage("Error al cargar el carrito.");
            }
        };

        fetchCartItems();
    }, []);

    const addToCart = async (productoId, cantidad) => {
        console.log("Intentando agregar al carrito...");
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert("Por favor, inicia sesión para agregar productos al carrito.");
            return;
        }

        try {
            console.log(productoId, cantidad);
            const response = await agregarProducto(productoId, cantidad, token);
            console.log(response);

            // Mostrar mensaje de éxito temporal
            setShowSuccessMessage(true);
            console.log("Producto agregado al carrito.");
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            // Refrescar el carrito
            const carritoData = await obtenerCarrito(token);
            setCartItems(carritoData.productos || []);
            setTotalCarrito(carritoData.total);
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    const decreaseItemQuantity = async (productoId) => {
        const token = localStorage.getItem('token');
        try {
            console.log(typeof(productoId))
            const response = await disminuirProductoEnCarrito(productoId, 1, token);
            console.log(response);

            // Refrescar el carrito
            const carritoData = await obtenerCarrito(token);
            setCartItems(carritoData.productos || []);
            setTotalCarrito(carritoData.total);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Eliminar producto del carrito
    const removeItemFromCart = async (itemId) => {
        const token = localStorage.getItem('token');
        try {
            await eliminarProducto(itemId, token); // Llamar a la función para eliminar el producto
            // Después de eliminar el producto, vuelve a obtener el carrito actualizado
            const carritoData = await obtenerCarrito(token);
            setCartItems(carritoData.productos || []); // Actualiza el estado del carrito
            setTotalCarrito(carritoData.total); // Actualiza el total del carrito
        } catch (error) {
            console.error(error.message);
            setPopupMessage(`Error al eliminar el producto: ${error.message}`);
            setShowPopup(true);
        }
    };

    const handleConfirmCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoginMessage('Por favor, inicie sesión para continuar.');
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        const itemsExceedingStock = cartItems.filter(item => item.cantidad > item.stock);
        if (itemsExceedingStock.length > 0) {
            const stockMessages = itemsExceedingStock.map(item => `${item.nombreProducto}: stock disponible ${item.stock}`);
            setPopupMessage(`No se puede confirmar el pedido. Productos sin suficiente stock:\n${stockMessages.join('\n')}`);
            setShowPopup(true);
        } else {
            console.log("pedidoooooooo")
            navigate('/confirmacion-pedido');
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setStockMessage('');
    };

    return (
        <div className="cart">
            <button className="close-icon" onClick={onClose}>
                <FaTimes />
            </button>
            <h2>Carrito de Compras</h2>

            {loginMessage && <p className="login-message">{loginMessage}</p>}
            {stockMessage && <p className="stock-message">{stockMessage}</p>}

            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div className="cart-items-container">
                    {cartItems.map(item => (
                        <li key={item.id} className="cart-item">
                            {item.imagen && <img src={`data:image/jpeg;base64,${item.imagen}`} alt={item.nombreProducto} />}
                            <div>
                                <h3>{item.nombreProducto}</h3>
                                <div className="quantity-control-container">
                                    <div className="quantity-control">
                                    <button onClick={() => decreaseItemQuantity(item.productoId)}>-</button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => addToCart(item.productoId, 1)} disabled={item.cantidad >= item.stock}>+</button>
                                    </div>
                                </div>

                                <div className="price-container">
                                    <div style={{ textAlign: 'right', width: '100%' }}>
                                        {item.subtotal === item.total ? (
                                            <p style={{ fontWeight: 'bold', color: 'green', margin: 0 }}>${item.total}</p>
                                        ) : (
                                            <>
                                                <p style={{ textDecoration: 'line-through', color: 'gray', margin: 0 }}>${item.subtotal}</p>
                                                <p style={{ fontWeight: 'bold', color: 'green', margin: 0 }}>${item.total}</p>
                                            </>
                                        )}
                                    </div>
                                    <button className="remove-icon" onClick={() => removeItemFromCart(item.productoId)}>
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
            <button className="confirm-cart" onClick={handleConfirmCart} disabled={cartItems.length === 0}>
                Confirmar Carrito
            </button>

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
