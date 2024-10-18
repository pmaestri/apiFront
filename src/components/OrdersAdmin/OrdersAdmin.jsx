import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx';
import { obtenerPedido, obtenerPedidos } from '../../api/OrderApi.jsx';
import { obtenerRolUsuario, setAuthToken } from '../../api/UserApi.jsx';
import './OrdersAdmin.css';

const Orders = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [pedidoId, setPedidoId] = useState('');
  const [pedidoBuscado, setPedidoBuscado] = useState(null);
  const [verTodosVisible, setVerTodosVisible] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [rolUsuario, setRolUsuario] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setToken(token);
      const fetchRole = async () => {
        const rol = await obtenerRolUsuario();
        setRolUsuario(rol);
        if (rol !== 'ADMIN') {
          navigate('/');
        } else {
          setIsAdmin(true);
        }
      };
      fetchRole();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Función para obtener un pedido específico por ID
  const buscarPedido = async () => {
    if (pedidoId.trim()) {
      try {
        const pedido = await obtenerPedido(pedidoId.trim());
        setPedidoBuscado(pedido);
        setPedidos([]); // Limpiar la lista de pedidos cuando se busca un ID específico
        setVerTodosVisible(false); // Asegurar que no se muestre la lista al buscar por ID
        setError(null); // Limpiar cualquier error anterior
      } catch (err) {
        setError(`Pedido no encontrado.`);
        setTimeout(() => {
          setError(null); // Ocultar el mensaje de error después de 3 segundos
        }, 3000);
      }
    }
  };

  // Función para obtener todos los pedidos
  const fetchPedidos = async () => {
    try {
      const data = await obtenerPedidos();
      setPedidos(data);
    } catch (err) {
      setError(`Error al obtener los pedidos: ${err.message}`);
    }
  };

  // Función manejadora para el botón "Ver Todos"
  const handleVerTodos = () => {
    if (verTodosVisible) {
      setPedidos([]); // Ocultar la lista de pedidos si ya se están mostrando
    } else {
      fetchPedidos(); // Obtener todos los pedidos si no están visibles
    }
    setVerTodosVisible(!verTodosVisible); // Alternar la visibilidad
    setPedidoBuscado(null); // Limpiar cualquier búsqueda específica
  };
  
  if (!isAdmin) return null;

  return (
    <div className="orders-container">
      <AdminNavbar />
      <div className="orders-header">
        <h1 className="orders-title">Administración de Pedidos</h1>
        {error && <p className="error-message-Orders">{error}</p>} {/* Mensaje de error en la parte superior */}
      </div>
      
      <div className="orders-search-bar">
        <input 
          type="text" 
          value={pedidoId} 
          onChange={(e) => setPedidoId(e.target.value.trim())} 
          className="orders-search-input" 
          placeholder="Buscar pedido por ID" 
        />
        <button onClick={buscarPedido} className="orders-button">Buscar Pedido</button>
        <button onClick={handleVerTodos} className="orders-button">
          {verTodosVisible ? 'Ocultar Todos' : 'Ver Todos'}
        </button>
      </div>

      {pedidoBuscado ? (
        <div className="orders-card">
          <div className="orders-card-title">Pedido ID: {pedidoBuscado.id}</div>
          <div className="orders-card-content">
            <p>Total: ${pedidoBuscado.total?.toFixed(2) || 0}</p>
            <p>Usuario: {pedidoBuscado.nombreUsuario}</p>
            {Array.isArray(pedidoBuscado.fecha) && pedidoBuscado.fecha.length >= 3 ? (
              <p>Fecha: {new Date(
                pedidoBuscado.fecha[0], 
                pedidoBuscado.fecha[1] - 1, 
                pedidoBuscado.fecha[2] 
              ).toLocaleDateString()}</p>
            ) : (
              <p>Fecha: No especificada</p>
            )}
            <p>Método de Pago: {pedidoBuscado.metodoPagoEnum || "No especificado"}</p>
            {pedidoBuscado.detallePedidoDto && pedidoBuscado.detallePedidoDto.length > 0 ? (
              <div>
                <p style={{ marginTop: '0' }}><strong>Detalle Pedido:</strong></p>
                <ul className="detalle-pedido-list" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {pedidoBuscado.detallePedidoDto.map((detalle) => (
                    <li key={detalle.id} className="detalle-pedido-item" style={{ marginBottom: '20px' }}>
                      <div><strong>Producto:</strong> {detalle.producto.nombre}</div>
                      <div><strong>Cantidad:</strong> {detalle.cantidad}</div>
                      <div><strong>Precio Unitario:</strong> ${detalle.precio.toFixed(2)}</div>
                      <br /> {/* Forzar un salto de línea adicional */}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No hay productos en este pedido.</p>
            )}
          </div>
        </div>
      ) : (
        verTodosVisible && pedidos.length > 0 && pedidos.map((pedido, index) => (
          <div className="orders-card" key={index}>
            <div className="orders-card-title">Pedido ID: {pedido.id}</div>
            <div className="orders-card-content">
              <p>Total: ${pedido.total.toFixed(2)}</p>
              <p>nombreUsuario: {pedido.nombreUsuario}</p>
              {Array.isArray(pedido.fecha) && pedido.fecha.length >= 3 ? (
                <p>Fecha: {new Date(
                  pedido.fecha[0], 
                  pedido.fecha[1] - 1, 
                  pedido.fecha[2]
                ).toLocaleDateString()}</p>
              ) : (
                <p>Fecha: No especificada</p>
              )}
              {pedido.detallePedidoDto && pedido.detallePedidoDto.length > 0 ? (
                <div>
                  <p style={{ marginTop: '0' }}><strong>Método de Pago:</strong> {pedido.metodoPagoEnum || "No especificado"}</p>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <p style={{ marginRight: '10px', marginTop: '0' }}><strong>Detalle Pedido:</strong></p>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>

                      {pedido.detallePedidoDto.map((detalle) => (
                        <li key={detalle.id} className="detalle-pedido-item" style={{ marginBottom: '10px' }}>
                          <div><strong>Producto:</strong> {detalle.producto.nombre}</div>
                          <div><strong>Cantidad:</strong> {detalle.cantidad}</div>
                          <div><strong>Precio Unitario:</strong> ${detalle.precio.toFixed(2)}</div>

                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>No hay productos en este pedido.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
