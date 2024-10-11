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

export const crearProducto = async (formData, token) => {
  try {
      const response = await api.post('', formData, {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
          }
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear el producto');
  }
};

// Función para actualizar un producto
export const actualizarProducto = async (productoId, productoData, token) => {
  try {
    const formData = new FormData();

    // Agrega solo los campos que deseas actualizar
    Object.entries(productoData).forEach(([key, value]) => {
      if (value !== '') { // Solo agrega los campos que no son vacíos
        formData.append(key, value);
      }
    });

    const response = await api.put(`/${productoId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

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
export const obtenerProductos = async (token) => {
  try {
    const response = await api.get('', {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token de autorización
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los productos: ${error.message}`);
  }
};
