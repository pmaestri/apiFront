import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/imagenes',
});

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

export const updateImagen = async (productoId, archivo, nombre,token) => {
  try {
    console.log(productoId)
    const formData = new FormData();
    formData.append('archivo', archivo); // Asegúrate de que este nombre coincida con el del modelo
    formData.append('nombre', nombre); // Asegúrate de incluir este campo si es necesario

    const response = await api.put(`imagen/${productoId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    
      },
    });

    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al actualizar la imagen:', error);
    throw new Error('Error actualizando la imagen del producto: ${error.message}');
  }
};
