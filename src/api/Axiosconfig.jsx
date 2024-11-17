import axios from 'axios';
import { store } from './store';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token; // Asegúrate de ajustar la ruta según tu estructura del estado.
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;