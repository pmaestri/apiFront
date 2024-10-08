import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/pedidos',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const crearPedido = async (pedido) => {
  try {
    console.log('Creating order with payload:', pedido); // Log the payload
    const response = await api.post('/crear', pedido); // Cambiar la URL para omitir el usuarioId
    console.log('Order created successfully:', response.data); // Log success
    return response.data;
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message); // Log error details
    throw new Error(`Error creando el pedido: ${error.message}`);
  }
};


// Función para obtener un pedido por su ID
export const obtenerPedido = async (pedidoId) => {
  try {
    const response = await api.get(`/${pedidoId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el pedido: ${error.message}`);
  }
};

// Función para obtener los pedidos de un usuario
export const obtenerPedidosUsuario = async () => {
  try {
    const response = await api.get('/usuarioId');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los pedidos del usuario: ${error.message}`);
  }
};

// Función para obtener los pedidos de un usuario (ADMIN)
export const obtenerPedidosUsuarioAdmin = async (usuarioId) => {
  try {
    const response = await api.get(`/admin/${usuarioId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los pedidos del usuario (ADMIN): ${error.message}`);
  }
};

// Función para obtener todos los pedidos
export const obtenerPedidos = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los pedidos: ${error.message}`);
  }
};
