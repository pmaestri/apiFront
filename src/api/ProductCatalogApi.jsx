// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://192.168.100.129:8080/api/catalogos',
// });
import api from './Axiosconfig';

// Función para obtener todos los catálogos
export const obtenerCatalogo = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el catálogo: ${error.message}`);
  }
};

// Función para obtener productos disponibles con detalles
export const obtenerProductosDisponiblesConDetalles = async () => {
  try {
    const response = await api.get('/api/catalogos/disponibles');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo productos disponibles: ${error.message}`);
  }
};

// Función para crear un catálogo
export const crearCatalogo = async (catalogo) => {
  try {
    await api.post('/api/catalogos/', catalogo);
  } catch (error) {
    throw new Error(`Error creando el catálogo: ${error.message}`);
  }
};

// Función para obtener el detalle de un producto
export const obtenerDetalleProducto = async (productoId) => {
  try {
    const response = await api.get(`/api/catalogos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el detalle del producto: ${error.message}`);
  }
};

// Función para filtrar productos
export const filtrarProductos = async (filtros) => {
  try {
    const response = await api.get('/api/catalogos/filtrar', { params: filtros });
    return response.data;
  } catch (error) {
    throw new Error(`Error filtrando productos: ${error.message}`);
  }
};
