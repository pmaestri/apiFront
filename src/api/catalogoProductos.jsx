import axios from 'axios'

const api = axios.create ({ baseURL: 'http://localhost:8080/api/catalogo',
}) ;

// Función para obtener todos los catalogos
export const fetchCatalogos = async () => {
    try {
      const response = await api.get(); // Endpoint para obtener todos los catalogos
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data');
    }
};