// import axios from 'axios';
import api from './Axiosconfig';

// const api = axios.create({
//   baseURL: 'http://192.168.100.129:8080/api/v1/auth',
// });

// Función para registrar un admin
export const registerAdmin = async (request) => {
  try {
    const response = await api.post('/api/v1/auth/register/admin', request);
    return response.data;
  } catch (error) {
    throw new Error(`Error registrando el admin: ${error.message}`);
  }
};

// Función para registrar un usuario
export const registerUser = async (request) => {
  try {
    const response = await api.post('/api/v1/auth/register/usuario', request);
    return response.data;
  } catch (error) {
    throw new Error(`Error registrando el usuario: ${error.message}`);
  }
};

// Función para autenticar un usuario
export const authenticateUser = async (request) => {
  try {
    const response = await api.post('/api/v1/auth/authenticate', request);
    return response.data;
  } catch (error) {
    throw new Error(`Error autenticando el usuario: ${error.message}`);
  }
};
