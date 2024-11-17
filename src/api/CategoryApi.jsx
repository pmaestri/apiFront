import api from './AxiosConfig'; // Importamos la configuración del interceptor

// Crear una nueva categoría
export const crearCategoria = async (categoria) => {
  try {
      const response = await api.post('/api/categorias', categoria);
      return response.data; // Retorna la categoría creada
  } catch (error) {
      throw new Error(`Error al crear la categoría: ${error.response?.data?.message || error.message}`);
  }
};

// Eliminar una categoría por su ID
export const eliminarCategoria = async (categoriaId) => {
  try {
      await api.delete(`/api/categorias/${categoriaId}`); // No es necesario enviar el token explícitamente
  } catch (error) {
      throw new Error(`Error al eliminar la categoría: ${error.response?.data?.message || error.message}`);
  }
};

// Obtener una categoría por su ID
export const obtenerCategoria = async (categoriaId) => {
    try {
        const response = await api.get(`/api/categorias/${categoriaId}`);
        return response.data; // Retorna la categoría solicitada
    } catch (error) {
        throw new Error(`Error al obtener la categoría: ${error.response?.data?.message || error.message}`);
    }
};

// Obtener todas las categorías
export const obtenerCategorias = async () => {
  try {
      const response = await api.get('/api/categorias');
      return response.data; // Retorna la lista de categorías
  } catch (error) {
      throw new Error(`Error al obtener las categorías: ${error.response?.data?.message || error.message}`);
  }
};