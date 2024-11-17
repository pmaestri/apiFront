import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx';
import { obtenerUsuarioAdmin, obtenerUsuariosVisualDtos, eliminarUsuarioAdmin, setAuthToken, obtenerRolUsuario } from '../../api/UserApi.jsx'; // Importa las funciones necesarias
import './UserAdmin.css';
import { useDispatch, useSelector } from 'react-redux';

const UserAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [usuarioId, setUsuarioId] = useState('');
  const [usuarioBuscado, setUsuarioBuscado] = useState(null);
  const [verTodosVisible, setVerTodosVisible] = useState(false);
  const [verPedidos, setVerPedidos] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [rolUsuario, setRolUsuario] = useState(null);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const navigate = useNavigate(); // Inicializar navigate
  const rol = useSelector((state)=> state.usuarios.rol);
  const token = useSelector((state)=> state.auth.token);
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      const fetchRole = async () => {
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
  }, [navigate, token]);

  // Función para obtener todos los usuarios
  const fetchUsuarios = async () => {
    try {
      const data = await obtenerUsuariosVisualDtos();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Función para buscar un usuario específico por ID
  const buscarUsuario = async () => {
    if (usuarioId.trim()) {
      try {
        const usuario = await obtenerUsuarioAdmin(usuarioId.trim());
        setUsuarioBuscado(usuario);
        setUsuarios([]); // Limpiar la lista de usuarios cuando se busca un ID específico
        setVerTodosVisible(false); // Asegurarse de que no se muestre la lista de usuarios al buscar por ID
        setError(null); // Limpiar cualquier error anterior
      } catch (err) {
        setError(`Usuario ID invalido`);
        setMensajeVisible(true); // Mostrar el mensaje de error
        setTimeout(() => {
          setError(null); // Ocultar el mensaje de error
          setMensajeVisible(false); // Ocultar el mensaje visual
        }, 3000); // 3000 ms = 3 segundos
      }
    }
  };

  // Función para eliminar un usuario
  const handleEliminarUsuario = async (usuarioId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        console.log(usuarioId);
        await eliminarUsuarioAdmin(usuarioId); // Llama a la función para eliminar el usuario
        setUsuarios(usuarios.filter(usuario => usuario.id !== usuarioId)); // Actualiza el estado para eliminar el usuario de la lista
        if (usuarioBuscado && usuarioBuscado.id === usuarioId) {
          setUsuarioBuscado(null); // Limpia la búsqueda si se elimina el usuario buscado
        }
      } catch (err) {
        setError(`Error al eliminar el usuario: ${err.message}`);
      }
    }
  };

  // Función manejadora para el botón "Ver Todos"
  const handleVerTodos = () => {
    if (verTodosVisible) {
      setUsuarios([]); // Si ya se está mostrando la lista, se oculta vaciando el estado
    } else {
      fetchUsuarios(); // Llamar a la función para obtener todos los usuarios
    }
    setVerTodosVisible(!verTodosVisible); // Alternar la visibilidad
    setUsuarioBuscado(null); // Limpiar cualquier búsqueda específica
  };

  // Función para alternar la visibilidad de los pedidos de un usuario
  const toggleVerPedidos = (usuarioId) => {
    setVerPedidos((prevState) => ({
      ...prevState,
      [usuarioId]: !prevState[usuarioId], // Cambia el estado de visibilidad de los pedidos de este usuario
    }));
  };

  if (!isAdmin) return null;

  return (
    <div className="container">
      <AdminNavbar />
      <div className="header">
        <h1 className="title">Administración de Usuarios</h1>
        {mensajeVisible && error && (
          <p className="error-message-User"> {error}</p>
        )}
      </div>
      
      <div className="search-bar-user">
        <input 
          type="text" 
          value={usuarioId} 
          onChange={(e) => setUsuarioId(e.target.value.trim())} 
          className="search-input-user" 
          placeholder="Buscar usuario por ID" 
        />
        <button onClick={buscarUsuario} className="button">Buscar Usuario</button>
        <button onClick={handleVerTodos} className="button">
          {verTodosVisible ? 'Ocultar Todos' : 'Ver Todos'}
        </button>
      </div>

      {/* Mostrar el usuario buscado si existe, de lo contrario mostrar la lista de todos */}
      {usuarioBuscado ? (
        <div className="card">
          <div className="card-title">{`${usuarioBuscado.nombre} ${usuarioBuscado.apellido}`}</div>
          <div className="card-content">
            <p>ID usuario: {usuarioBuscado.id}</p>
            <p>Nombre de Usuario: {usuarioBuscado.nombreUsuario}</p>
            <p>Email: {usuarioBuscado.mail}</p>
            <button 
              onClick={() => handleEliminarUsuario(usuarioBuscado.id)} // Añadido el botón para eliminar el usuario buscado
              className="button eliminar-button"
            >
              Eliminar Usuario
            </button>
            <h4>Pedidos:</h4>
            {usuarioBuscado.pedidos && usuarioBuscado.pedidos.length > 0 ? (
              <div>
                {usuarioBuscado.pedidos.length > 5 ? (
                  <div>
                    <p>Este usuario tiene varios pedidos.</p>
                    <button 
                      onClick={() => toggleVerPedidos(usuarioBuscado.id)} 
                      className="button pedidos-button"
                    >
                      {verPedidos[usuarioBuscado.id] ? 'Ocultar Pedidos' : 'Ver Pedidos'}
                    </button>
                    {verPedidos[usuarioBuscado.id] && (
                      <ul className="pedido-list">
                        {usuarioBuscado.pedidos.map(pedido => (
                          <li className="pedido-item" key={pedido.id}>
                            Pedido ID: {pedido.id}, Total: ${pedido.total.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <ul className="pedido-list">
                    {usuarioBuscado.pedidos.map(pedido => (
                      <li className="pedido-item" key={pedido.id}>
                        Pedido ID: {pedido.id}, Total: ${pedido.total.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <p>No hay pedidos para este usuario.</p> // Mensaje si no hay pedidos
            )}
          </div>
        </div>
      ) : (
        verTodosVisible && usuarios.length > 0 && usuarios.map((usuario, index) => (
          <div className="card" key={index}>
            <div className="card-title">{`${usuario.nombre} ${usuario.apellido}`}</div>
            <div className="card-content">
              <p>ID usuario: {usuario.id}</p>
              <p>Nombre de Usuario: {usuario.nombreUsuario}</p>
              <p>Email: {usuario.mail}</p>
              <button 
                onClick={() => {
                  console.log("ID a eliminar:", usuario); // Esto mostrará el ID en la consola
                  handleEliminarUsuario(usuario.id); // Llama a la función con el ID
                }} 
                className="button eliminar-button"
              >
                Eliminar Usuario
              </button>
              <h4>Pedidos:</h4>
              {usuario.pedidos.length > 0 ? (
                <div>
                  {usuario.pedidos.length > 5 ? (
                    <div>
                      <p>Este usuario tiene varios pedidos.</p>
                      <button 
                        onClick={() => toggleVerPedidos(usuario.id)} 
                        className="button pedidos-button"
                      >
                        {verPedidos[usuario.id] ? 'Ocultar Pedidos' : 'Ver Pedidos'}
                      </button>
                      {verPedidos[usuario.id] && (
                        <ul className="pedido-list">
                          {usuario.pedidos.map(pedido => (
                            <li className="pedido-item" key={pedido.id}>
                              Pedido ID: {pedido.id}, Total: ${pedido.total.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <ul className="pedido-list">
                      {usuario.pedidos.map(pedido => (
                        <li className="pedido-item" key={pedido.id}>
                          Pedido ID: {pedido.id}, Total: ${pedido.total.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <p>No hay pedidos para este usuario.</p>
              )}
            </div>
          </div>
        ))
      )}
      
    </div>
  );
};

export default UserAdmin;
