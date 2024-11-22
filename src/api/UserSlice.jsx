import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
  obtenerUsuarioVisualDto,
  obtenerUsuariosVisualDtos,
  obtenerRolUsuario,
  obtenerUsuarioAdmin,
  eliminarUsuarioAdmin,
} from './UserApi'; // Ajusta la ruta a donde estén tus funciones

// Fetch un único usuario (cuando eres el mismo usuario)
export const fetchUsuario = createAsyncThunk('usuarios/fetchUsuario', async (_, thunkAPI) => {
  try {
    return await obtenerUsuario();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Fetch todos los usuarios
export const fetchUsuarios = createAsyncThunk('usuarios/fetchUsuarios', async (_, thunkAPI) => {
  try {
    return await obtenerUsuarios();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Crear un nuevo usuario
export const createUsuario = createAsyncThunk('usuarios/createUsuario', async (usuario, thunkAPI) => {
  try {
    return await crearUsuario(usuario);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Actualizar un usuario
export const updateUsuario = createAsyncThunk(
  'usuarios/updateUsuario',
  async ({ atributo, nuevoValor }, thunkAPI) => {
    try {
      return await actualizarUsuario(atributo, nuevoValor);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Eliminar un usuario
export const deleteUsuario = createAsyncThunk('usuarios/deleteUsuario', async (_, thunkAPI) => {
  try {
    await eliminarUsuario();
    return true; // Indica éxito
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Fetch rol del usuario
export const fetchRolUsuario = createAsyncThunk('usuarios/fetchRolUsuario', async (_, thunkAPI) => {
  try {
    return await obtenerRolUsuario();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Fetch un usuario por ID si eres admin
export const fetchUsuarioAdmin = createAsyncThunk(
  'usuarios/fetchUsuarioAdmin',
  async (usuarioId, thunkAPI) => {
    try {
      return await obtenerUsuarioAdmin(usuarioId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Eliminar un usuario por ID si eres admin
export const deleteUsuarioAdmin = createAsyncThunk(
  'usuarios/deleteUsuarioAdmin',
  async (usuarioId, thunkAPI) => {
    try {
      await eliminarUsuarioAdmin(usuarioId);
      return usuarioId; // Retorna el ID del usuario eliminado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch un UsuarioVisualDto por ID
export const fetchUsuarioVisualDto = createAsyncThunk('usuarios/fetchUsuarioVisualDto', async (_, thunkAPI) => {
  try {
    return await obtenerUsuarioVisualDto();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Fetch todos los UsuarioVisualDto
export const fetchUsuariosVisualDtos = createAsyncThunk('usuarios/fetchUsuariosVisualDtos', async (_, thunkAPI) => {
  try {
    return await obtenerUsuariosVisualDtos();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Slice de usuarios
const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: {
    usuario: null,
    usuarioDTO: null,
    usuarioAdminDTO: null,
    usuariosDTO: [],
    loading: false,
    error: null,
    rol: null,
  },
  reducers: {    logoutUsuario: (state) => {
    state.usuarioDTO = null; // Limpiamos el usuarioDTO cuando se hace logout
    state.rol = null;
  },},
  extraReducers: (builder) => {
    builder
      // Fetch Usuario
      .addCase(fetchUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload;
      })
      .addCase(fetchUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Usuarios
      .addCase(fetchUsuarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Crear Usuario
      .addCase(createUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioDTO = action.payload;
      })
      .addCase(createUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Actualizar Usuario
      .addCase(updateUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioDTO = action.payload;
      })
      .addCase(updateUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Eliminar Usuario
      .addCase(deleteUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUsuario.fulfilled, (state) => {
        state.loading = false;
        state.usuarioDTO = null; // Limpia los datos tras la eliminación
      })
      .addCase(deleteUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Rol Usuario
      .addCase(fetchRolUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.rol = action.payload;
      })
      .addCase(fetchRolUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Usuario Admin
      .addCase(fetchUsuarioAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarioAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioAdminDTO = action.payload;
      })
      .addCase(fetchUsuarioAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Eliminar Usuario Admin
      .addCase(deleteUsuarioAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUsuarioAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioAdminDTO = state.data.filter((usuario) => usuario.id !== action.payload);
      })
      .addCase(deleteUsuarioAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Usuario VisualDto
      .addCase(fetchUsuarioVisualDto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarioVisualDto.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioDTO = action.payload;
      })
      .addCase(fetchUsuarioVisualDto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch todos los UsuarioVisualDtos
      .addCase(fetchUsuariosVisualDtos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuariosVisualDtos.fulfilled, (state, action) => {
        state.loading = false;
        state.usuariosDTO = action.payload;
      })
      .addCase(fetchUsuariosVisualDtos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logoutUsuario } = usuariosSlice.actions;

// Exporta el reducer
export default usuariosSlice.reducer;

