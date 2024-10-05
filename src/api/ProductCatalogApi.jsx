import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/catalogos',
});

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
    const response = await api.get('/disponibles');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo productos disponibles: ${error.message}`);
  }
};

// Función para agregar un producto a un catálogo
export const agregarProductoACatalogo = async (productoId) => {
  try {
    await api.post(`/${productoId}`);
  } catch (error) {
    throw new Error(`Error agregando producto al catálogo: ${error.message}`);
  }
};

// Función para eliminar un producto de un catálogo
export const eliminarProductoDelCatalogo = async (productoId) => {
  try {
    await api.delete(`/${productoId}`);
  } catch (error) {
    throw new Error(`Error eliminando producto del catálogo: ${error.message}`);
  }
};

// Función para crear un catálogo
export const crearCatalogo = async (catalogo) => {
  try {
    await api.post('/', catalogo);
  } catch (error) {
    throw new Error(`Error creando el catálogo: ${error.message}`);
  }
};

// Función para obtener el detalle de un producto
export const obtenerDetalleProducto = async (productoId) => {
  try {
    const response = await api.get(`/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el detalle del producto: ${error.message}`);
  }
};

// Función para filtrar productos
export const filtrarProductos = async (filtros) => {
  try {
    const response = await api.get('/filtrar', { params: filtros });
    return response.data;
  } catch (error) {
    throw new Error(`Error filtrando productos: ${error.message}`);
  }
};
