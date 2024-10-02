import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/productos',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para crear un nuevo producto
export const crearProducto = async (productoData) => {
  try {
    const response = await api.post('', productoData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creando el producto: ${error.message}`);
  }
};

// Función para actualizar un producto
export const actualizarProducto = async (productoId, productoData) => {
  try {
    const response = await api.put(`/${productoId}`, productoData);
    return response.data;
  } catch (error) {
    throw new Error(`Error actualizando el producto: ${error.message}`);
  }
};

// Función para eliminar un producto
export const eliminarProducto = async (productoId) => {
  try {
    await api.delete(`/${productoId}`);
  } catch (error) {
    throw new Error(`Error eliminando el producto: ${error.message}`);
  }
};

// Función para obtener un producto por ID
export const obtenerProducto = async (productoId) => {
  try {
    const response = await api.get(`/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el producto: ${error.message}`);
  }
};

// Función para obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los productos: ${error.message}`);
  }
};
