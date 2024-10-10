import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/usuarios',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para crear un nuevo usuario
export const crearUsuario = async (usuario) => {
  try {
    const response = await api.post('/', usuario);
    return response.data;
  } catch (error) {
    throw new Error(`Error creando el usuario: ${error.message}`);
  }
};

// Función para actualizar un usuario existente
export const actualizarUsuario = async (atributo, nuevoValor) => {
  try {
    const response = await api.put('/usuarioId', null, {
      params: { atributo, nuevoValor },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error actualizando el usuario: ${error.message}`);
  }
};

// Función para eliminar un usuario
export const eliminarUsuario = async () => {
  try {
    await api.delete('/usuarioId');
  } catch (error) {
    throw new Error(`Error eliminando el usuario: ${error.message}`);
  }
};

// Función para obtener un usuario por ID si sos el mismo
export const obtenerUsuario = async () => {
  try {
    const response = await api.get('/usuarioId');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el usuario: ${error.message}`);
  }
};

// Función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await api.get('/admin/todos');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los usuarios: ${error.message}`);
  }
};

// Función para obtener UsuarioVisualDto por ID
export const obtenerUsuarioVisualDto = async () => {
  try {
    const response = await api.get('/visual/usuarioId');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el UsuarioVisualDto: ${error.message}`);
  }
};

// Función para obtener todos los UsuarioVisualDto
export const obtenerUsuariosVisualDtos = async () => {
  try {
    const response = await api.get('/admin/visual');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los UsuarioVisualDto: ${error.message}`);
  }
};
// Nueva función para obtener el rol del usuario autenticado
export const obtenerRolUsuario = async () => {
  try {
    const response = await api.get('/rol');
    return response.data; // Devuelve el rol del usuario ('admin' o 'comprador')
  } catch (error) {
    throw new Error(`Error obteniendo el rol del usuario: ${error.message}`);
  }
};
// Función para obtener un usuario por ID si sos admin
export const obtenerUsuarioAdmin = async (usuarioId) => {
  try {
    console.log(usuarioId);
    const response = await api.get(`/${usuarioId}`); // Cambia esto para incluir el ID en la URL
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el usuario: ${error.message}`);
  }
};
// Función para eliminar un usuario
export const eliminarUsuarioAdmin = async (usuarioId) => { // Agregué el argumento usuarioId
  try {
    await api.delete(`/${usuarioId}`); // Uso el usuarioId en la URL
  } catch (error) {
    throw new Error(`Error eliminando el usuario: ${error.message}`);
  }
};
