import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/detalles',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para obtener un detalle de pedido por su ID
export const fetchDetallePedido = async (detalleId) => {
  try {
    const response = await api.get(`/${detalleId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching detalle pedido: ${error.message}`);
  }
};

// Función para crear un nuevo detalle de pedido
export const createDetallePedido = async (pedidoId, detalleData) => {
  try {
    const response = await api.post(`/${pedidoId}`, detalleData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating detalle pedido: ${error.message}`);
  }
};
