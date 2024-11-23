import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  crearNuevoPedido, 
  obtenerPedidoPorId, 
  crearNuevoDetalle,  
} from '../../api/OrderSlice'; // Importa las acciones de tu slice
// import { setAuthToken } from '../../api/OrderApi';
import { fetchCarrito, vaciarCarritoSlice } from '../../api/CartSilce';
import './Order.css';

const Popup = ({ detalles, onClose }) => {
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
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token); // Asegúrate de que el token esté en el estado `user`
  const { carrito, loading, error } = useSelector((state) => state.carrito);
  useEffect(() => {
    if (token) {
      dispatch(fetchCarrito(token));
    } else {
      console.error('No se encontró un token de autenticación');
    }
  }, [dispatch, token]);

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>Error al cargar el carrito: {error}</p>;

  const handleConfirmarPedido = async () => {
    try {
      // Crear un nuevo pedido
      // setAuthToken(token);
      const pedidoData = await dispatch(
        crearNuevoPedido({ metodoPago, cuotas: metodoPago === 'CREDITO' ? cuotas : undefined })
      ).unwrap();

      console.log('Pedido creado:', pedidoData);

      // Crear detalles del pedido
      await Promise.all(
        carrito.productos.map(async (item) => {
          const detalleData = { productoId: item.productoId, cantidad: item.cantidad };
          await dispatch(crearNuevoDetalle({ pedidoId: pedidoData.id, detalleData })).unwrap();
        })
      );

      // Obtener detalles completos del pedido
      const pedidoConfirmado = await dispatch(obtenerPedidoPorId(pedidoData.id)).unwrap();
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
        dispatch(vaciarCarritoSlice(token)); // Vaciar el carrito
        console.log('Carrito vaciado exitosamente.');
      } catch (error) {
        console.error('Error al vaciar el carrito:', error.message);
      }
    }
    setShowPopup(false);
    navigate('/');
  };

  const calcularTotalConDescuento = () => {
    if (metodoPago === 'EFECTIVO' || metodoPago === 'TRANSFERENCIA') {
      return carrito.total * 0.9; // 10% de descuento
    }
    return carrito.total;
  };

  const totalConDescuento = calcularTotalConDescuento();

  return (
    <div className="pedido-container">
           <div className="pedido-content">
             <div className="cart-items-container">
               <h2>Productos en el Carrito</h2>
               {carrito.productos.length === 0 ? (
                <p>El carrito está vacío.</p>
              ) : (
                <ul className="pedido-list">
                  {carrito.productos.map((item) => (
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
              <button className="pedido-confirm-button" onClick={handleConfirmarPedido} disabled={!metodoPago || carrito.productos.length === 0}>
                Confirmar Pedido
              </button>
    
              {/* Mostrar total debajo del botón Confirmar Pedido */}
              <div className="order-total">
                {metodoPago === 'EFECTIVO' || metodoPago === 'TRANSFERENCIA' ? (
                  <>
                    <p className="original-total-price">Total: ${carrito.total.toFixed(2)}</p>
                    <p className="discounted-total-price">Total con Descuento: ${totalConDescuento.toFixed(2)}</p>
                  </>
                ) : (
                  <p className="total-price">Total: ${carrito.total.toFixed(2)}</p>
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