// producto e imagen
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProducto,
  obtenerProductos,
  agregarProductoACatalogo,
  eliminarProductoDelCatalogo,
} from './ProductApi'; // Ajusta el path según tu estructura
import { updateImagen } from './ImageApi'; // Ajusta el path según tu estructura

// Thunks para productos
export const fetchProductos = createAsyncThunk(
  'producto/fetchProductos',
  async (token, { rejectWithValue }) => {
    try {
      // setAuthToken(token);
      return await obtenerProductos(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductoById = createAsyncThunk(
  'producto/fetchProductoById',
  async (productoId, { rejectWithValue }) => {
    try {
      return await obtenerProducto(productoId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProducto = createAsyncThunk(
  'producto/createProducto',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      console.log(formData, token)
      return await crearProducto(formData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProducto = createAsyncThunk(
  'producto/updateProducto',
  async ({ productoId, productoData, token }, { rejectWithValue }) => {
    try {
      return await actualizarProducto(productoId, productoData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProducto = createAsyncThunk(
  'producto/deleteProducto',
  async ({ productoId, token }, { rejectWithValue }) => {
    try {
      await eliminarProducto(productoId, token);
      return productoId; // Retorna el ID para manejarlo en el estado
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunks para imágenes
export const updateProductoImagen = createAsyncThunk(
  'producto/updateProductoImagen',
  async ({ productoId, archivo, nombre, token }, { rejectWithValue }) => {
    try {
        console.log(productoId, archivo, nombre, token)
      return await updateImagen(productoId, archivo, nombre, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
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

// Slice
const productoSlice = createSlice({
  name: 'producto',
  initialState: {
    productos: [],
    producto: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearProductoState: (state) => {
      state.productos = [];
      state.producto = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch productos
      .addCase(fetchProductos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productos = action.payload;
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch producto by ID
      .addCase(fetchProductoById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductoById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.producto = action.payload;
      })
      .addCase(fetchProductoById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create producto
      .addCase(createProducto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProducto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productos.push(action.payload); // Agrega el nuevo producto al estado
      })
      .addCase(createProducto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update producto
      .addCase(updateProducto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProducto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productos = state.productos.map((producto) =>
          producto.id === action.payload.id ? action.payload : producto
        );
      })
      .addCase(updateProducto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete producto
      .addCase(deleteProducto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProducto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productos = state.productos.filter(
          (producto) => producto.id !== action.payload
        );
      })
      .addCase(deleteProducto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update imagen
      .addCase(updateProductoImagen.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductoImagen.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.producto && state.producto.id === action.meta.arg.productoId) {
          state.producto.imagen = action.payload; // Actualiza la imagen del producto actual
        }
      })
      .addCase(updateProductoImagen.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
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
      });
  },
});

export const { clearProductoState } = productoSlice.actions;

export default productoSlice.reducer;