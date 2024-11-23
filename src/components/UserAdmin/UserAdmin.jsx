import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx';
import {
  fetchUsuarioAdmin,
  fetchUsuariosVisualDtos,
  deleteUsuarioAdmin,
  fetchRolUsuario,
  cleanUsuarioAdmin,
} from '../../api/UserSlice.jsx';
import './UserAdmin.css';

const UserAdmin = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [verTodosVisible, setVerTodosVisible] = useState(false);
  const [verPedidos, setVerPedidos] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usuarios = useSelector((state) => state.usuarios.usuariosDTO || []);
  const usuarioBuscado = useSelector((state) => state.usuarios.usuarioAdminDTO);
  const rol = useSelector((state) => state.usuarios.rol);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.usuarios.error);
  const loading = useSelector((state) => state.usuarios.loading);

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
    dispatch(cleanUsuarioAdmin());
  }, [dispatch, navigate, token, rol]);

  const handleVerTodos = () => {
    if (verTodosVisible) {
      console.log('Ocultando todos los usuarios...');
      setVerTodosVisible(false);
    } else {
      console.log('Cargando todos los usuarios...');
      dispatch(cleanUsuarioAdmin());
      setUsuarioId('');
      dispatch(fetchUsuariosVisualDtos());
      setVerTodosVisible(true);
    }
  };

  const buscarUsuario = () => {
    if (usuarioId.trim()) {
      console.log(`Buscando usuario con ID: ${usuarioId}`);
      dispatch(fetchUsuarioAdmin(usuarioId.trim()));
      setVerTodosVisible(false);
    } else {
      console.warn('El campo de búsqueda está vacío.');
      
    }
  };

  const handleEliminarUsuario = (usuarioId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      console.log(`Eliminando usuario con ID: ${usuarioId}`);
      dispatch(deleteUsuarioAdmin(usuarioId));
    }
  };

  const toggleVerPedidos = (usuarioId) => {
    console.log(`Alternando visibilidad de pedidos para usuario ID: ${usuarioId}`);
    setVerPedidos((prevState) => ({
      ...prevState,
      [usuarioId]: !prevState[usuarioId],
    }));
  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className="header">
        <h1 className="title">Administración de Usuarios</h1>
        {error && <p className="error-message-User">{`Usuario Invalido`}</p>}
      </div>
  
      <div className="search-bar-user">
        <input
          type="text"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          className="search-input-user"
          placeholder="Buscar usuario por ID"
        />
        <button onClick={buscarUsuario} className="button">Buscar Usuario</button>
        <button onClick={handleVerTodos} className="button">
          {verTodosVisible ? 'Ocultar Todos' : 'Ver Todos'}
        </button>
      </div>
  
  
      {usuarioBuscado && !verTodosVisible && (
        <div className="card">
          <div className="card-title">{`${usuarioBuscado.nombre} ${usuarioBuscado.apellido}`}</div>
          <div className="card-content">
            <p>ID usuario: {usuarioBuscado.id}</p>
            <p>Nombre de Usuario: {usuarioBuscado.nombreUsuario}</p>
            <p>Email: {usuarioBuscado.mail}</p>
            <button
              onClick={() => handleEliminarUsuario(usuarioBuscado.id)}
              className="button eliminar-button"
            >
              Eliminar Usuario
            </button>
            <h4>Pedidos:</h4>
            {usuarioBuscado.pedidos && usuarioBuscado.pedidos.length > 0 ? (
              <div>
                {usuarioBuscado.pedidos.length > 5 && (
                  <button
                    onClick={() => toggleVerPedidos(usuarioBuscado.id)}
                    className="button pedidos-button"
                  >
                    {verPedidos[usuarioBuscado.id] ? 'Ocultar Pedidos' : 'Ver Pedidos'}
                  </button>
                )}
                {(usuarioBuscado.pedidos.length <= 5 || verPedidos[usuarioBuscado.id]) &&
                  usuarioBuscado.pedidos.map((pedido) => (
                    <li className= 'pedido-item' key={pedido.id}>Pedido ID: {pedido.id} Total: ${pedido.total}</li>
                  ))}
              </div>
            ) : (
              <p>No tiene pedidos.</p>
            )}
          </div>
        </div>
      )}
  
      {verTodosVisible && usuarios.length > 0 ? (
        usuarios.map((usuario) => (
          <div className="card" key={usuario.id}>
            <div className="card-title">{`${usuario.nombre} ${usuario.apellido}`}</div>
            <div className="card-content">
              <p>ID usuario: {usuario.id}</p>
              <p>Email: {usuario.mail}</p>
              <button
                onClick={() => handleEliminarUsuario(usuario.id)}
                className="button eliminar-button"
              >
                Eliminar Usuario
              </button>
              <h4>Pedidos:</h4>
              {usuario.pedidos && usuario.pedidos.length > 0 ? (
                <div>
                  {usuario.pedidos.length > 5 && (
                    <button
                      onClick={() => toggleVerPedidos(usuario.id)}
                      className="button pedidos-button"
                    >
                      {verPedidos[usuario.id] ? 'Ocultar Pedidos' : 'Ver Pedidos'}
                    </button>
                  )}
                  {(usuario.pedidos.length <= 5 || verPedidos[usuario.id]) &&
                    usuario.pedidos.map((pedido) => (
                      <li className= 'pedido-item' key={pedido.id}>Pedido ID: {pedido.id} Total: ${pedido.total}</li>
                    ))}
                </div>
              ) : (
                <p>No tiene pedidos.</p>
              )}
            </div>
          </div>
        ))
      ) : verTodosVisible ? (
        <p>No se encontraron usuarios.</p>
      ) : null}
    </div>
  );
}

export default UserAdmin;
