import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/auth',
});

// Función para registrar un admin
export const registrarAdmin = async (request) => {
  try {
    const response = await api.post('/register/admin', request);
    return response.data;
  } catch (error) {
    throw new Error(`Error registrando el admin: ${error.message}`);
  }
};

// Función para registrar un usuario
export const registrarUsuario = async (request) => {
  try {
    const response = await api.post('/register/usuario', request);
    return response.data;
  } catch (error) {
    throw new Error(`Error registrando el usuario: ${error.message}`);
  }
};

// Función para autenticar un usuario
export const autenticarUsuario = async (request) => {
  try {
    const response = await api.post('/authenticate', request);
    return response.data;
  } catch (error) {
    throw new Error(`Error autenticando el usuario: ${error.message}`);
  }
};
