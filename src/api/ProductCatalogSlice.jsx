// src/slices/catalogoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  obtenerCatalogo,
  obtenerProductosDisponiblesConDetalles,
  agregarProductoACatalogo,
  eliminarProductoDelCatalogo,
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

export const addProductoACatalogo = createAsyncThunk(
  'catalogo/addProductoACatalogo',
  async (productoId) => {
    await agregarProductoACatalogo(productoId);
    return productoId; // Devolvemos el productoId agregado para actualizar el estado
  }
);

export const removeProductoDelCatalogo = createAsyncThunk(
  'catalogo/removeProductoDelCatalogo',
  async (productoId) => {
    await eliminarProductoDelCatalogo(productoId);
    return productoId; // Devolvemos el productoId eliminado para actualizar el estado
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
      // Agregar producto al catálogo
      .addCase(addProductoACatalogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductoACatalogo.fulfilled, (state, action) => {
        state.loading = false;
        // Agregar el producto al catálogo
        const productoId = action.payload;
        const producto = state.productosDisponibles.find((p) => p.id === productoId);
        if (producto) {
          state.catalogo.push(producto);
        }
      })
      .addCase(addProductoACatalogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Eliminar producto del catálogo
      .addCase(removeProductoDelCatalogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductoDelCatalogo.fulfilled, (state, action) => {
        state.loading = false;
        state.catalogo = state.catalogo.filter((p) => p.id !== action.payload);
      })
      .addCase(removeProductoDelCatalogo.rejected, (state, action) => {
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
