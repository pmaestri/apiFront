import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoPedido, obtenerPedidoPorId, crearNuevoDetalle, obtenerDetallePorId } from '../../api/OrderSlice.jsx';
import { obtenerCarrito, vaciarCarrito } from '../../api/CartApi.jsx';
import './Order.css';

const Popup = ({ onClose }) => {
  const detalles = useSelector((state)=> state.pedidos.detalle);
  console.log(detalles);
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="title-highlight">Pedido Confirmado</h2>
        <p>El pedido se ha efectuado exitosamente! Muchas gracias por confiar en nosotros.</p>
        <h3>Detalles del Pedido:</h3>
        <ul>
          {detalles && detalles.detallePedidoDto.length > 0 ? (
            detalles.detallePedidoDto.map(detalle => (
              <li key={detalle.id}>
                <p>Producto: {detalle.producto.nombre}</p>
                <p>Cantidad: {detalle.cantidad}</p>
                <p>Precio Unitario: ${detalle.producto.precioUnitario.toFixed(2)}</p>
                <p>Subtotal: ${(detalle.precio).toFixed(2)}</p>
              </li>
            ))
          ) : (
            <li>No hay detalles del pedido disponibles.</li>
          )}
        </ul>
        <p>Método de Pago: {detalles ? detalles.metodoPagoEnum : 'N/A'}</p>
        <p className="total-highlight">Total: ${detalles ? detalles.total.toFixed(2) : 'N/A'}</p>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

const Pedido = () => {
  const [metodoPago, setMetodoPago] = useState('');
  const [cuotas, setCuotas] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [pedidoDetalles, setPedidoDetalles] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Estado para el carrito
  const [totalCarrito, setTotalCarrito] = useState(0); // Estado para el total del carrito
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Obtener el token desde el almacenamiento local
  useEffect(() => {
    if (token) {
      console.log('Token obtenido de localStorage:', token);
      const fetchCart = async () => {
        try {
          const carritoData = await obtenerCarrito(token);
          setCartItems(carritoData.productos); // Asegúrate de que esta propiedad sea correcta
          setTotalCarrito(carritoData.total); // Asegúrate de que esta propiedad sea correcta
        } catch (error) {
          console.error('Error al obtener el carrito:', error.message);
        }
      };
      fetchCart();
    } else {
      console.error('No se encontró un token de autenticación en localStorage');
    }
  }, [token]);

  // Función para manejar la confirmación del pedido
  const handleConfirmarPedido = async () => {
    try {
      // Crear un nuevo pedido con Redux
      const response = await dispatch(crearNuevoPedido({ metodoPago, cuotas: metodoPago === 'CREDITO' ? cuotas : undefined }));
      console.log('Pedido creado:', response);
      
      // Obtener carrito actualizado
      const carritoData = await obtenerCarrito(token);

      // Crear detalles de pedido para cada producto en el carrito
      const detalles = await Promise.all(
        cartItems.map(async (producto) => {
          const detalleData = {
            productoId: producto.productoId,
            cantidad: producto.cantidad,
          };
          // Aquí se pueden agregar funciones adicionales como setAuthToken, pero no es necesario si ya estás usando Redux
          return await dispatch(crearNuevoDetalle({ pedidoId: carritoData.id, detalleData }));
        })
      );
      console.log('Detalles de pedido creados:', detalles);

      // Obtener el pedido por ID para mostrar la confirmación
      const pedidoConfirmado = await dispatch(obtenerPedidoPorId(carritoData.id));
      console.log('Pedido confirmado:', pedidoConfirmado);

      setPedidoDetalles(pedidoConfirmado);
      setShowPopup(true);
    } catch (error) {
      console.error('Error al crear el pedido:', error.message);
    }
  };

  const handleClosePopup = async () => {
    if (token) {
      try {
        await vaciarCarrito(token); // Vaciar el carrito
        console.log('Carrito vaciado exitosamente.');
      } catch (error) {
        console.error('Error al vaciar el carrito:', error.message);
      }
    }
    setShowPopup(false); // Ocultar el popup
    navigate('/'); // Redirigir al home
  };

  // Calcular el total con descuento
  const calcularTotalConDescuento = () => {
    if (metodoPago === 'EFECTIVO' || metodoPago === 'TRANSFERENCIA') {
      return totalCarrito * 0.9; // 10% de descuento
    }
    return totalCarrito;
  };

  const totalConDescuento = calcularTotalConDescuento();

  return (
    <div className="pedido-container">
      <div className="pedido-content">
        <div className="cart-items-container">
          <h2>Productos en el Carrito</h2>
          {cartItems.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ul className="pedido-list">
              {cartItems.map((item) => (
                <li className="pedido-list-item" key={item.id}>
                  <div className="cart-product">
                    <img src={`data:image/jpeg;base64,${item.imagen}`} alt={item.nombreProducto} />
                    <div className="cart-product-details">
                      <h3>{item.nombreProducto}</h3>
                      {item.discount > 0 ? (
                        <>
                          <p className="original-price">
                            <span style={{ textDecoration: 'line-through' }}>Precio: ${item.subtotal}</span>
                          </p>
                        </>
                      ) : (
                        <p className="product-price-order">Precio: ${item.subtotal.toFixed(2)}</p>
                      )}
                      <p>Cantidad: {item.cantidad}</p>
                      <p><strong>Subtotal:</strong> ${item.total}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="order-confirmation-container">
          <h2>Confirmar Pedido</h2>
          <div>
            <h4>Selecciona el método de pago:</h4>
            <select className="pedido-select" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
              <option value="">Seleccionar...</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="CREDITO">Crédito</option>
              <option value="DEBITO">Débito</option>
            </select>
          </div>
          {metodoPago === 'CREDITO' && (
            <div>
              <h3 className="select-cuotas-header">Selecciona el número de cuotas:</h3>
              <select className="pedido-select" value={cuotas} onChange={(e) => setCuotas(e.target.value)}>
                <option value={1}>1 cuota</option>
                <option value={3}>3 cuotas</option>
                <option value={6}>6 cuotas</option>
              </select>
            </div>
          )}
          <button className="pedido-confirm-button" onClick={handleConfirmarPedido} disabled={!metodoPago || cartItems.length === 0}>
            Confirmar Pedido
          </button>

          <div className="order-total">
            {metodoPago === 'EFECTIVO' || metodoPago === 'TRANSFERENCIA' ? (
              <>
                <p className="original-total-price">Total: ${totalCarrito.toFixed(2)}</p>
                <p className="discounted-total-price">Total con Descuento: ${totalConDescuento.toFixed(2)}</p>
              </>
            ) : (
              <p className="total-price">Total: ${totalCarrito.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mostrar el pop-up si está activo */}
      {showPopup && (
        <Popup 
          detalles={pedidoDetalles} 
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Pedido;