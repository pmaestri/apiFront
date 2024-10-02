import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/roles',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para obtener un rol por nombre
export const obtenerRol = async (rolNombre) => {
  try {
    const response = await api.get(`/${rolNombre}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el rol: ${error.message}`);
  }
};

// Función para obtener todos los roles
export const obtenerRoles = async () => {
  try {
    const response = await api.get('/roles');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los roles: ${error.message}`);
  }
};

// Función para inicializar los roles
export const inicializarRoles = async () => {
  try {
    await api.post('/inicializar');
  } catch (error) {
    throw new Error(`Error inicializando los roles: ${error.message}`);
  }
};
