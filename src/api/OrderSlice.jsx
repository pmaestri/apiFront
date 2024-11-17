import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { obtenerPedido, obtenerPedidosUsuario, obtenerPedidosUsuarioAdmin, obtenerPedidos, crearPedido } from './OrderApi';
import { obtenerDetallePedido, crearDetallePedido } from './OrderDetailApi';

// Acciones asincrónicas para los pedidos
export const obtenerPedidoPorId = createAsyncThunk(
  'pedidos/obtenerPedido',
  async (pedidoId, { rejectWithValue }) => {
    try {
      const data = await obtenerPedido(pedidoId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerPedidosDelUsuario = createAsyncThunk(
  'pedidos/obtenerPedidosUsuario',
  async (_, { rejectWithValue }) => {
    try {
      const data = await obtenerPedidosUsuario();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerPedidosDelAdmin = createAsyncThunk(
  'pedidos/obtenerPedidosUsuarioAdmin',
  async (usuarioId, { rejectWithValue }) => {
    try {
      const data = await obtenerPedidosUsuarioAdmin(usuarioId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerTodosLosPedidos = createAsyncThunk(
  'pedidos/obtenerPedidos',
  async (_, { rejectWithValue }) => {
    try {
      const data = await obtenerPedidos();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const crearNuevoPedido = createAsyncThunk(
  'pedidos/crearPedido',
  async (pedido, { rejectWithValue }) => {
    try {
      const data = await crearPedido(pedido);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acciones asincrónicas para los detalles de los pedidos
export const obtenerDetallePorId = createAsyncThunk(
  'detalles/obtenerDetalle',
  async (detalleId, { rejectWithValue }) => {
    try {
      const data = await obtenerDetallePedido(detalleId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const crearNuevoDetalle = createAsyncThunk(
  'detalles/crearDetalle',
  async ({ pedidoId, detalleData }, { rejectWithValue }) => {
    try {
      const data = await crearDetallePedido(pedidoId, detalleData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice principal para pedidos y detalles
const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState: {
    pedidos: [],
    pedido: null,
    detalles: [],
    detalle: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Manejo de pedidos
    builder
      .addCase(crearNuevoPedido.pending, (state) => {
        state.loading = true;
      })
      .addCase(crearNuevoPedido.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidos.push(action.payload); // Añadir el nuevo pedido a la lista
        state.error = null;
      })
      .addCase(crearNuevoPedido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Establecer el error en caso de fallo
      });

    builder
      .addCase(obtenerPedidoPorId.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerPedidoPorId.fulfilled, (state, action) => {
        state.loading = false;
        state.pedido = action.payload;
        state.error = null;
      })
      .addCase(obtenerPedidoPorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(obtenerPedidosDelUsuario.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerPedidosDelUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidos = action.payload;
        state.error = null;
      })
      .addCase(obtenerPedidosDelUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(obtenerPedidosDelAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerPedidosDelAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidos = action.payload;
        state.error = null;
      })
      .addCase(obtenerPedidosDelAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(obtenerTodosLosPedidos.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerTodosLosPedidos.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidos = action.payload;
        state.error = null;
      })
      .addCase(obtenerTodosLosPedidos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Manejo de detalles de pedidos
    builder
      .addCase(crearNuevoDetalle.pending, (state) => {
        state.loading = true;
      })
      .addCase(crearNuevoDetalle.fulfilled, (state, action) => {
        state.loading = false;
        state.detalles.push(action.payload); // Añadir el nuevo detalle de pedido
        state.error = null;
      })
      .addCase(crearNuevoDetalle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(obtenerDetallePorId.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerDetallePorId.fulfilled, (state, action) => {
        state.loading = false;
        state.detalle = action.payload;
        state.error = null;
      })
      .addCase(obtenerDetallePorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pedidosSlice.reducer;