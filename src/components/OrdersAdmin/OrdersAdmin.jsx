import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
// import { setAuthToken } from '../../api/OrderApi.jsx';
import { obtenerPedidoPorId, obtenerTodosLosPedidos, cleanPedido } from '../../api/OrderSlice.jsx'; // Importar las acciones de la slice
import { fetchRolUsuario } from '../../api/UserSlice.jsx';
import './OrdersAdmin.css';

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pedidoId, setPedidoId] = useState('');
  const [setPedidoBuscado] = useState(null);
  const pedidoBuscado = useSelector((state) => state.pedidos.pedido);
  const [verTodosVisible, setVerTodosVisible] = useState(false);
  const [errorP, setErrorP] = useState(null);

  // Obtenemos el estado de Redux
  const token = useSelector((state)=> state.auth.token);
  const { rol, loading, error: errorUsuario } = useSelector((state) => state.usuarios);
  const { pedidos, loading: loadingPedidos, error: errorPedidos } = useSelector((state) => state.pedidos);
  // setAuthToken(token);

  useEffect(() => {
    if (token) {
      dispatch(fetchRolUsuario());
      if (rol && rol !== 'ADMIN') {
        console.warn('Usuario no autorizado, redirigiendo...');
        navigate('/');
      }
    } else {
      console.warn('Token no encontrado, redirigiendo al login...');
      navigate('/login');
    }
    dispatch(cleanPedido());
  }, [rol, navigate, dispatch]);
  

  
// Función para obtener un pedido específico por ID
const buscarPedido = async () => {
  if (pedidoId.trim()) {
    try {
      // Esperamos la respuesta del dispatch, que es una promesa
      const resultado = await dispatch(obtenerPedidoPorId(pedidoId)); 
      console.log(resultado.payload);

      // Verificamos si el resultado es válido
      if (!resultado.error) {
        // Si existe el pedido, ocultamos la lista de todos los pedidos
        
        setVerTodosVisible(false);
      } else {
        // Si no hay resultado, mostramos un mensaje de error
        setErrorP('Error al buscar el pedido.');
        setTimeout(() => {
          setErrorP(null); // Ocultar el mensaje de error después de 3 segundos
        }, 3000);
      }
    } catch (err) {
      // Si ocurre un error al hacer el dispatch, lo capturamos aquí
      console.error('Error en la búsqueda del pedido:', err);
      setErrorP('Error al buscar el pedido.');
      setTimeout(() => {
        setErrorP(null); // Ocultar el mensaje de error después de 3 segundos
      }, 3000);
    }
  }
};



  // Función manejadora para el botón "Ver Todos"
  const handleVerTodos = () => {
    if (verTodosVisible) {
      console.log('Ocultando todos los pedidos...');
      setVerTodosVisible(false);
    } else {
      console.log('Cargando todos los pedidos...');
      dispatch(cleanPedido());
      setPedidoId('');
      dispatch(obtenerTodosLosPedidos());
      setVerTodosVisible(true);
    }
  };


  return (
    <div className="orders-container">
      <AdminNavbar />
      <div className="orders-header">
        <h1 className="orders-title">Administración de Pedidos</h1>
        {errorP&& <p className="error-message-Orders">{errorP}</p>}
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
                      <br />
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
              <p>Total: ${pedido.total}</p>
              <p>Usuario: {pedido.nombreUsuario}</p>
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
