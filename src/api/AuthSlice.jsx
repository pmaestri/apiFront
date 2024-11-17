import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUser, registerUser, registerAdmin } from './AuthApi'; // Ajusta la ruta según tu proyecto

// Thunks para manejar las operaciones asíncronas

// Autenticación de usuario
export const authenticate = createAsyncThunk('auth/authenticate', async (credentials, thunkAPI) => {
  try {
    const response = await authenticateUser(credentials);
    return response.access_token; // Accedemos al access_token desde el backend
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Registro de usuario
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await registerUser(userData);
    return response.access_token; // Accedemos al access_token
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Registro de administrador
export const registerAsAdmin = createAsyncThunk('auth/registerAsAdmin', async (adminData, thunkAPI) => {
  try {
    const response = await registerAdmin(adminData);
    return response.access_token; // Accedemos al access_token
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null, // Almacenará el token de acceso
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null; // Al hacer logout, limpiamos el token
    },
  },
  extraReducers: (builder) => {
    builder
      // Autenticación
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Almacena el token de autenticación
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Registro de usuario
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Almacena el token tras el registro
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Registro de administrador
      .addCase(registerAsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Almacena el token tras el registro de admin
      })
      .addCase(registerAsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exporta la acción de logout
export const { logout } = authSlice.actions;

// Exporta el reducer
export default authSlice.reducer;