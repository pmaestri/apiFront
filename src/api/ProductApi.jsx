// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://192.168.100.129:8080/api/productos',
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

export const crearProducto = async (formData, token) => {
  try {
      const response = await api.post('/api/productos', formData, {
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

    const response = await api.put(`/api/productos/${productoId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (error.status == 416) {
      throw new Error(`No se puede agregar el producto al catalogo. Sin stock`);
    }
    throw new Error(`Error actualizando el producto: ${error.message}`);
  }
};


// Función para eliminar un producto
export const eliminarProducto = async (productoId, token) => {
  try {
    await api.delete(`/api/productos/${productoId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token de autorización
      },
    });
  } catch (error) {
    throw new Error(`Error eliminando el producto: ${error.message}`);
  }
};


// Función para obtener un producto por ID
export const obtenerProducto = async (productoId) => {
  try {
    const response = await api.get(`/api/productos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo el producto: ${error.message}`);
  }
};

// Función para obtener todos los productos
export const obtenerProductos = async (token) => {
  try {
    const response = await api.get('/api/productos', {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token de autorización
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo los productos: ${error.message}`);
  }

};

  // Función para agregar un producto a un catálogo
export const agregarProductoACatalogo = async (productoId) => {
  try {
    await api.post(`/api/productos/catalogo/${productoId}`);
  } catch (error) {
    throw new Error(`Error agregando producto al catálogo: ${error.message}`);
  }
};

// Función para eliminar un producto de un catálogo
export const eliminarProductoDelCatalogo = async (productoId) => {
  try {
    await api.delete(`/api/productos/catalogo/${productoId}`);
  } catch (error) {
    throw new Error(`Error eliminando producto del catálogo: ${error.message}`);
  }
};

