// categoriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { obtenerCategorias, obtenerCategoria, crearCategoria, eliminarCategoria } from './CategoryApi'; // Importar las funciones de la API

// Obtener todas las categorías
export const fetchCategorias = createAsyncThunk(
  'categorias/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const categorias = await obtenerCategorias();
      return categorias;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Obtener una categoría por su ID
export const fetchCategoria = createAsyncThunk(
  'categorias/fetchCategoria',
  async (categoriaId, { rejectWithValue }) => {
    try {
      const categoria = await obtenerCategoria(categoriaId);
      return categoria;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Crear una nueva categoría
export const addCategoria = createAsyncThunk(
  'categorias/addCategoria',
  async (categoria, { rejectWithValue }) => {
    try {
      const nuevaCategoria = await crearCategoria(categoria);
      return nuevaCategoria;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Eliminar una categoría por su ID
export const deleteCategoria = createAsyncThunk(
  'categorias/deleteCategoria',
  async (categoriaId, { rejectWithValue }) => {
    try {
      await eliminarCategoria(categoriaId);
      return categoriaId; // Retorna el ID de la categoría eliminada
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriaSlice = createSlice({
  name: 'categorias',
  initialState: {
    categorias: [],
    categoria: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener todas las categorías
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Obtener una categoría por su ID
      .addCase(fetchCategoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoria.fulfilled, (state, action) => {
        state.loading = false;
        state.categoria = action.payload;
      })
      .addCase(fetchCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Crear una nueva categoría
      .addCase(addCategoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoria.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias.push(action.payload); // Agrega la nueva categoría a la lista
      })
      .addCase(addCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Eliminar una categoría por su ID
      .addCase(deleteCategoria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = state.categorias.filter(
          (categoria) => categoria.id !== action.payload
        ); // Elimina la categoría por ID
      })
      .addCase(deleteCategoria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriaSlice.reducer;