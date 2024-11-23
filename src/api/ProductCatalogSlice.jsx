// src/slices/catalogoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  obtenerCatalogo,
  obtenerProductosDisponiblesConDetalles,
  crearCatalogo,
  obtenerDetalleProducto,
  filtrarProductos,
} from './ProductCatalogApi'; // Ajusta la ruta según tu estructura de carpetas

// Thunks para cada acción
export const fetchCatalogo = createAsyncThunk('catalogo/fetchCatalogo', async () => {
  const data = await obtenerCatalogo();
  return data;
});

export const fetchProductosDisponiblesConDetalles = createAsyncThunk(
  'catalogo/fetchProductosDisponiblesConDetalles',
  async () => {
    const data = await obtenerProductosDisponiblesConDetalles();
    return data;
  }
);

export const createCatalogo = createAsyncThunk(
  'catalogo/createCatalogo',
  async (catalogo) => {
    await crearCatalogo(catalogo);
    return catalogo; // Devolvemos el catálogo creado para actualizar el estado
  }
);

export const fetchDetalleProducto = createAsyncThunk(
  'catalogo/fetchDetalleProducto',
  async (productoId) => {
    const data = await obtenerDetalleProducto(productoId);
    return data;
  }
);

export const filterProductos = createAsyncThunk(
  'catalogo/filterProductos',
  async (filtros) => {
    const data = await filtrarProductos(filtros);
    return data;
  }
);

// Slice para el estado del catálogo y productos
const catalogoSlice = createSlice({
  name: 'catalogo',
  initialState: {
    catalogo: [],
    productosDisponibles: [],
    detalleProducto: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch catálogo
      .addCase(fetchCatalogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCatalogo.fulfilled, (state, action) => {
        state.loading = false;
        state.catalogo = action.payload;
      })
      .addCase(fetchCatalogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch productos disponibles
      .addCase(fetchProductosDisponiblesConDetalles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductosDisponiblesConDetalles.fulfilled, (state, action) => {
        state.loading = false;
        state.productosDisponibles = action.payload;
      })
      .addCase(fetchProductosDisponiblesConDetalles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Crear catálogo
      .addCase(createCatalogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCatalogo.fulfilled, (state, action) => {
        state.loading = false;
        // Puedes decidir si agregar el catálogo recién creado al estado
        state.catalogo.push(action.payload);
      })
      .addCase(createCatalogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch detalle producto
      .addCase(fetchDetalleProducto.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetalleProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.detalleProducto = action.payload;
      })
      .addCase(fetchDetalleProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Filtrar productos
      .addCase(filterProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.productosDisponibles = action.payload;
      })
      .addCase(filterProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default catalogoSlice.reducer;
