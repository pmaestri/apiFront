// import { useEffect, useState } from 'react';
// import {
//   obtenerPedidosUsuario,
//   crearPedido,
// } from '../api'; // Asegúrate de importar las funciones necesarias

// const PedidoList = ({ usuarioId }) => {
//   const [pedidos, setPedidos] = useState([]);
//   const [nuevoPedido, setNuevoPedido] = useState({}); // Cambia esto según la estructura de tu pedido

//   // Cargar los pedidos del usuario al montar el componente
//   useEffect(() => {
//     const loadPedidos = async () => {
//       try {
//         const data = await obtenerPedidosUsuario();
//         setPedidos(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     loadPedidos();
//   }, []);

//   // Función para manejar la creación de un nuevo pedido
//   const handleCrearPedido = async () => {
//     try {
//       const createdPedido = await crearPedido(usuarioId, nuevoPedido);
//       setPedidos([...pedidos, createdPedido]); // Añadir el nuevo pedido a la lista
//       alert('Pedido creado con éxito');
//     } catch (error) {
//       console.error(error);
//       alert('Error al crear el pedido');
//     }
//   };

//   return (
//     <div>
//       <h1>Lista de Pedidos</h1>

//       <ul>
//         {pedidos.map((pedido) => (
//           <li key={pedido.id}>
//             {/* Asegúrate de ajustar esto según los campos de tu objeto pedido */}
//             Pedido ID: {pedido.id} - Total: ${pedido.total}
//           </li>
//         ))}
//       </ul>

//       <h2>Crear Nuevo Pedido</h2>
//       {/* Formulario para crear un nuevo pedido */}
//       <input
//         type="text"
//         placeholder="Detalles del pedido"
//         value={nuevoPedido.detalles || ''}
//         onChange={(e) => setNuevoPedido({ ...nuevoPedido, detalles: e.target.value })}
//       />
//       <button onClick={handleCrearPedido}>Crear Pedido</button>
//     </div>
//   );
// };

// export default PedidoList;
