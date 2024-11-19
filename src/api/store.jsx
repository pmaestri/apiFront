import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthSlice'
import usuariosReducer from './UserSlice';
import categoriasReducer from './CategorySlice';
import pedidosReducer from './OrderSlice';
import productoReducer from './ProductSlice';
export const store = configureStore({
    reducer:{
        auth: authReducer,
        usuarios: usuariosReducer,
        categorias: categoriasReducer,
        pedidos: pedidosReducer,
        producto: productoReducer,
    },
});