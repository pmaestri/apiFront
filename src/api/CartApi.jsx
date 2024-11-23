// import axios from 'axios';
import api from './Axiosconfig';

// const api = axios.create({
//   baseURL: 'http://192.168.100.129:8080/api/carritos',
// });

// Función para establecer el token en las cabeceras de axios
// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };
export const agregarProducto = async (productoId, cantidad, token) => {
    try {
        const response = await api.post(
            `/api/carritos/agregar?productoId=${productoId}&cantidad=${cantidad}`, // Usa params en la URL
            {}, // Deja el cuerpo vacío ya que los params están en la URL
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data; // Retorna mensaje de éxito
    } catch (error) {
        throw new Error(`Error al agregar el producto: ${error.response?.data?.message || error.message}`);
    }
};

// Eliminar producto del carrito
export const eliminarProducto = async (productoId, token) => {
  try {
      const response = await api.delete(
          `/api/carritos/eliminar?productoId=${productoId}`, // Usa params en la URL
          {
              headers: { Authorization: `Bearer ${token}` },
          }
      );
      return response.data; // Retorna mensaje de éxito
  } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.response?.data?.message || error.message}`);
  }
};

// Disminuir cantidad de un producto en el carrito
export const disminuirProductoEnCarrito = async (productoId, cantidad, token) => {
  try {
      const response = await api.put(
          `/api/carritos/disminuir?productoId=${productoId}&cantidad=${cantidad}`, // Usa params en la URL
          {}, // Deja el cuerpo vacío ya que los params están en la URL
          {
              headers: { Authorization: `Bearer ${token}` },
          }
      );
      return response.data; // Retorna mensaje de éxito
  } catch (error) {
      throw new Error(`Error al disminuir el producto: ${error.response?.data?.message || error.message}`);
  }
};

// Obtener el carrito del usuario
export const obtenerCarrito = async (token) => {
  try {
    const response = await api.get('/api/carritos/obtener', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data; // Retorna el carrito en formato DTO
  } catch (error) {
    throw new Error(`Error al obtener el carrito: ${error.response?.data?.message || error.message}`);
  }
};

// Confirmar el pedido del carrito
export const confirmarCarrito = async (metodoPago, token) => {
  try {
    const response = await api.post('/api/carritos/confirmar', {
      params: { metodoPago },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Retorna mensaje de éxito
  } catch (error) {
    throw new Error(`Error al confirmar el carrito: ${error.response?.data?.message || error.message}`);
  }
};

// Vaciar el carrito
export const vaciarCarrito = async (token) => {
  try {
    const response = await api.delete('/api/carritos/vaciar', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Retorna mensaje de éxito
  } catch (error) {
    throw new Error(`Error al vaciar el carrito: ${error.response?.data?.message || error.message}`);
  }
};
