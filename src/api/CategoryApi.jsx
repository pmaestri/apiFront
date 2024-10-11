import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/categorias',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
// Crear una nueva categoría
export const crearCategoria = async (categoria, token) => {
  try {
      const response = await api.post('', categoria, {
          headers: {
              Authorization: `Bearer ${token}`, // Enviar el token de autorización
          },
      });
      return response.data; // Retorna la categoría creada
  } catch (error) {
      throw new Error(`Error al crear la categoría: ${error.response?.data?.message || error.message}`);
  }
};

// Eliminar una categoría por su ID
export const eliminarCategoria = async (categoriaId, token) => {
  try {
      // Configuración de encabezados para incluir el token
      const config = {
          headers: {
              Authorization: `Bearer ${token}`, // Usar Bearer para el token
          },
      };
      await api.delete(`/${categoriaId}`, config); // Incluir config en la solicitud
  } catch (error) {
      throw new Error(`Error al eliminar la categoría: ${error.response?.data?.message || error.message}`);
  }
};


// Obtener una categoría por su ID
export const obtenerCategoria = async (categoriaId) => {
    try {
        const response = await axios.get(`${API_URL}/${categoriaId}`);
        return response.data; // Retorna la categoría solicitada
    } catch (error) {
        throw new Error(`Error al obtener la categoría: ${error.response?.data?.message || error.message}`);
    }
};

// Obtener todas las categorías
export const obtenerCategorias = async (token) => {
  try {
      const response = await api.get('', {
          headers: {
              Authorization: `Bearer ${token}`, // Enviar el token de autorización
          },
      });
      return response.data; // Retorna la lista de categorías
  } catch (error) {
      throw new Error(`Error al obtener las categorías: ${error.response?.data?.message || error.message}`);
  }
};
