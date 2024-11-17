import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthSlice'
import usuariosReducer from './UserSlice';
export const store = configureStore({
    reducer:{
        auth: authReducer,
        usuarios: usuariosReducer,
    },
});