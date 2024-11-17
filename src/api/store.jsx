import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthSlice'
import usuariosReducer from './UserSlice';
import categoriasReducer from './CategorySlice';
export const store = configureStore({
    reducer:{
        auth: authReducer,
        usuarios: usuariosReducer,
        categorias: categoriasReducer,
    },
});