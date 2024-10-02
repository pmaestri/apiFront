import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/imagenes',
});

// Función para establecer el token en las cabeceras de axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Función para mostrar una imagen por su ID
export const fetchImagen = async (id) => {
  try {
    const response = await api.get('', {
      params: { id },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching imagen: ${error.message}`);
  }
};

// Función para agregar una nueva imagen
export const createImagen = async (solicitud) => {
  try {
    const formData = new FormData();
    formData.append('archivo', solicitud.archivo);
    formData.append('nombre', solicitud.nombre);

    const response = await api.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creating imagen: ${error.message}`);
  }
};

// Función para eliminar una imagen
export const deleteImagen = async (imagenId) => {
  try {
    await api.delete(`/${imagenId}`);
  } catch (error) {
    throw new Error(`Error deleting imagen: ${error.message}`);
  }
};

// Función para actualizar una imagen
export const updateImagen = async (productoId, solicitud) => {
  try {
    const formData = new FormData();
    formData.append('archivo', solicitud.archivo);
    formData.append('nombre', solicitud.nombre);

    const response = await api.put(`/imagen/${productoId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating imagen: ${error.message}`);
  }
};
