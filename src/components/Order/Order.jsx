import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { crearPedido, setAuthToken, obtenerPedido } from '../../api/OrderApi.jsx';
import { crearDetallePedido } from '../../api/OrderDetailApi.jsx';
import './Order.css';

const Pedido = ({ token }) => {
  const [metodoPago, setMetodoPago] = useState('');
  const [cuotas, setCuotas] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalCarrito } = location.state || { cartItems: [], totalCarrito: 0 };

  // Obtener el token desde el almacenamiento local
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      console.log('Token obtenido de localStorage:', token);
    } else {
      console.error('No se encontró un token de autenticación en localStorage');
    }
  }, []);

  // Función para manejar la confirmación del pedido
  const handleConfirmarPedido = async () => {
    try {
      const nuevoPedido = await crearPedido({ metodoPago });
      console.log('Pedido creado:', nuevoPedido);

      const detalles = await Promise.all(
        cartItems.map(async (item) => {
          const detalleData = {
            productoId: item.id,
            cantidad: item.quantity,
          };

          return await crearDetallePedido(nuevoPedido.id, detalleData);
        })
      );
      console.log('Detalles de pedido creados:', detalles);

      const pedidoConfirmado = await obtenerPedido(nuevoPedido.id);
      console.log('Pedido confirmado:', pedidoConfirmado);

      navigate(`/pedido/${nuevoPedido.id}/confirmacion`);
    } catch (error) {
      console.error('Error al crear el pedido:', error.message);
    }
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
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>Cantidad: {item.quantity}</p>
                      <p>Subtotal: ${ (item.price * item.quantity).toFixed(2) }</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h3>Total: ${totalCarrito.toFixed(2)}</h3>
        </div>

        <div className="order-confirmation-container">
          <h2>Confirmar Pedido</h2>
          {metodoPago === 'EFECTIVO' || metodoPago === 'TRANSFERENCIA' ? (
            <h3>Total después de descuento: ${totalConDescuento.toFixed(2)}</h3>
          ) : null}
          <div>
            <h3>Selecciona el método de pago:</h3>
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
              <h3>Selecciona el número de cuotas:</h3>
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
        </div>
      </div>
    </div>
  );
};

export default Pedido;
