import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  agregarProducto, 
  eliminarProducto, 
  disminuirProductoEnCarrito, 
  obtenerCarrito, 
  confirmarCarrito, 
  vaciarCarrito 
} from './CartApi';

// Thunks para manejar las acciones del carrito
export const fetchCarrito = createAsyncThunk(
  'carrito/fetchCarrito',
  async (token) => {
    const data = await obtenerCarrito(token);
    return data;
  }
);

export const agregarAlCarrito = createAsyncThunk(
  'carrito/agregarAlCarrito',
  async ({ productoId, cantidad, token }) => {
    const data = await agregarProducto(productoId, cantidad, token);
    return data;
  }
);

export const eliminarDelCarrito = createAsyncThunk(
  'carrito/eliminarDelCarrito',
  async ({ productoId, token }) => {
    const data = await eliminarProducto(productoId, token);
    return data;
  }
);

export const disminuirCantidad = createAsyncThunk(
  'carrito/disminuirCantidad',
  async ({ productoId, cantidad, token }) => {
    const data = await disminuirProductoEnCarrito(productoId, cantidad, token);
    return data;
  }
);

export const confirmarPedido = createAsyncThunk(
  'carrito/confirmarPedido',
  async ({ metodoPago, token }) => {
    const data = await confirmarCarrito(metodoPago, token);
    return data;
  }
);

export const vaciarCarritoSlice = createAsyncThunk(
  'carrito/vaciarCarrito',
  async (token) => {
    const data = await vaciarCarrito(token);
    return data;
  }
);

// Crear la slice de carrito
const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    carrito: {
      productos: [], 
      total: 0,      
      id: null,      
    },
    loading: false,
    error: null,
    successMessage: null,
  },
  
  reducers: {},
  extraReducers: (builder) => {
    // Obtener carrito
    builder.addCase(fetchCarrito.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCarrito.fulfilled, (state, action) => {
      state.loading = false;
      state.carrito = {
        productos: action.payload.productos,
        total: action.payload.total,
        id: action.payload.id,
      };
    });
    builder.addCase(fetchCarrito.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  
    // Agregar producto al carrito
    builder.addCase(agregarAlCarrito.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(agregarAlCarrito.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(agregarAlCarrito.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  
    // Eliminar producto del carrito
    builder.addCase(eliminarDelCarrito.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(eliminarDelCarrito.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(eliminarDelCarrito.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  
    // Disminuir cantidad de producto en el carrito
    builder.addCase(disminuirCantidad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(disminuirCantidad.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(disminuirCantidad.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  
    // Confirmar pedido
    builder.addCase(confirmarPedido.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(confirmarPedido.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(confirmarPedido.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  
    // Vaciar carrito
    builder.addCase(vaciarCarritoSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(vaciarCarritoSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.carrito = {
        productos: [],
        total: 0,
        id: null,
      };
      state.successMessage = action.payload.message;
    });
    builder.addCase(vaciarCarritoSlice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});  

export default carritoSlice.reducer;
