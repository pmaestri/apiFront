// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://192.168.100.129:8080/api/detalles',
// });
import api from './Axiosconfig';

// Función para establecer el token en las cabeceras de axios
// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };

// Función para obtener un detalle de pedido por su ID
export const obtenerDetallePedido = async (detalleId) => {
  try {
    const response = await api.get(`/api/detalles/${detalleId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener detalle de pedido: ${error.message}`);
  }
};

// Función para crear un nuevo detalle de pedido con un ID de pedido
export const crearDetallePedido = async (pedidoId, detalleData) => {
  try {
    const response = await api.post(`/api/detalles/${pedidoId}`, detalleData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al crear detalle de pedido: ${error.message}`);
  }
};
