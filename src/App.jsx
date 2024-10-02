// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProductList from "./components/ProductList";
// import Subcategory from './components/Subcategory';  
// import Navbar from './components/Navbar';           
// import Home from './components/Home';  
// import IphoneModels from './components/IphoneModel'; 
// import IphoneModelDetail from './components/IphoneModelDetail'; 
// import SamsungModels from './components/SamsungModel'; 
// import SamsungModelDetail from './components/SamsungModelDetail'; 
// import MotorolaModels from './components/MotorolaModel'; 
// import MotorolaModelDetail from './components/MotorolaModelDetail'; 
// import FundasVerTodo from './components/FundasVerTodo'; // Asegúrate de que esta es la ruta correcta para tu componente
// import VidriosVerTodo from './components/VidriosVerTodo'; // Nueva importación

// // NUEVO: Importar componentes de Carrito e Inicio de Sesión
// import Cart from './components/Cart'; 
// import Login from './components/LogIn'; 
// import Footer from './components/Footer'; // Importar el componente Footer
// import ProductDetail from './components/ProductDetail'; // Importar el componente de detalle del producto

// function App() {
//   return (
//     <Router>
//       <Navbar /> 
//       <Routes>
//         <Route path="/" element={<Home />} />

//         {/* Rutas para fundas */}
//         <Route path="/categories/fundas/iphone/models" element={<IphoneModels />} />
//         <Route path="/categories/fundas/iphone/models/:model" element={<IphoneModelDetail />} />

//         {/* Nueva ruta para Fundas Ver Todo */}
//         <Route path="/categories/fundas/vertodo" element={<FundasVerTodo />} /> {/* Aquí agregamos la ruta */}

//         {/* Rutas para vidrios */}
//         <Route path="/categories/vidrios/iphone/models" element={<IphoneModels />} />
//         <Route path="/categories/vidrios/iphone/models/:model" element={<IphoneModelDetail />} />

//         {/* Nueva ruta para Vidrios Ver Todo */}
//         <Route path="/categories/vidrios/vertodo" element={<VidriosVerTodo />} /> {/* Aquí agregamos la ruta */}

//         {/* Rutas para cargadores */}
//         <Route path="/categories/cargadores/iphone/models" element={<IphoneModels />} />
//         <Route path="/categories/cargadores/iphone/models/:model" element={<IphoneModelDetail />} />

//         {/* Rutas para auriculares */}
//         <Route path="/categories/auriculares/iphone/models" element={<IphoneModels />} />
//         <Route path="/categories/auriculares/iphone/models/:model" element={<IphoneModelDetail />} />

//         {/* Rutas para Samsung */}
//         <Route path="/categories/fundas/samsung/models" element={<SamsungModels />} />
//         <Route path="/categories/fundas/samsung/models/:model" element={<SamsungModelDetail />} />
        
//         <Route path="/categories/vidrios/samsung/models" element={<SamsungModels />} />
//         <Route path="/categories/vidrios/samsung/models/:model" element={<SamsungModelDetail />} />
        
//         <Route path="/categories/cargadores/samsung/models" element={<SamsungModels />} />
//         <Route path="/categories/cargadores/samsung/models/:model" element={<SamsungModelDetail />} />
        
//         <Route path="/categories/auriculares/samsung/models" element={<SamsungModels />} />
//         <Route path="/categories/auriculares/samsung/models/:model" element={<SamsungModelDetail />} />

//         {/* Rutas para Motorola */}
//         <Route path="/categories/fundas/motorola/models" element={<MotorolaModels />} />
//         <Route path="/categories/fundas/motorola/models/:model" element={<MotorolaModelDetail />} />
        
//         <Route path="/categories/vidrios/motorola/models" element={<MotorolaModels />} />
//         <Route path="/categories/vidrios/motorola/models/:model" element={<MotorolaModelDetail />} />
        
//         <Route path="/categories/cargadores/motorola/models" element={<MotorolaModels />} />
//         <Route path="/categories/cargadores/motorola/models/:model" element={<MotorolaModelDetail />} />
        
//         <Route path="/categories/auriculares/motorola/models" element={<MotorolaModels />} />
//         <Route path="/categories/auriculares/motorola/models/:model" element={<MotorolaModelDetail />} />

//         <Route path="/categories/samsung" element={<Subcategory category="Samsung" />} />
//         <Route path="/categories/motorola" element={<Subcategory category="Motorola" />} />

//         {/* Ruta para detalles de producto */}
//         <Route path="/product/:id" element={<ProductDetail />} /> {/* Agrega esta ruta */}

//         {/* Rutas para carrito e inicio de sesión */}
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/login" element={<Login />} /> 
//       </Routes>
//       <Footer /> {/* Agregar el Footer aquí para que aparezca en todas las páginas */}
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/ProductList";
import Subcategory from './components/Subcategory';  
import Navbar from './components/Navbar';           
import Home from './components/Home';  
import IphoneModels from './components/IphoneModel'; 
import IphoneModelDetail from './components/IphoneModelDetail'; 
import SamsungModels from './components/SamsungModel'; 
import SamsungModelDetail from './components/SamsungModelDetail'; 
import MotorolaModels from './components/MotorolaModel'; 
import MotorolaModelDetail from './components/MotorolaModelDetail'; 
import FundasVerTodo from './components/FundasVerTodo'; 
import VidriosVerTodo from './components/VidriosVerTodo'; 
import Cart from './components/Cart'; 
import Login from './components/LogIn'; 
import Register from './components/Register'; // Importar el componente de registro
import Footer from './components/Footer'; 
import ProductDetail from './components/ProductDetail'; 

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Rutas para fundas */}
        <Route path="/categories/fundas/iphone/models" element={<IphoneModels />} />
        <Route path="/categories/fundas/iphone/models/:model" element={<IphoneModelDetail />} />
        <Route path="/categories/fundas/vertodo" element={<FundasVerTodo />} />
        
        {/* Rutas para vidrios */}
        <Route path="/categories/vidrios/iphone/models" element={<IphoneModels />} />
        <Route path="/categories/vidrios/iphone/models/:model" element={<IphoneModelDetail />} />
        <Route path="/categories/vidrios/vertodo" element={<VidriosVerTodo />} />
        
        {/* Rutas para cargadores */}
        <Route path="/categories/cargadores/iphone/models" element={<IphoneModels />} />
        <Route path="/categories/cargadores/iphone/models/:model" element={<IphoneModelDetail />} />

        {/* Rutas para auriculares */}
        <Route path="/categories/auriculares/iphone/models" element={<IphoneModels />} />
        <Route path="/categories/auriculares/iphone/models/:model" element={<IphoneModelDetail />} />

        {/* Rutas para Samsung */}
        <Route path="/categories/fundas/samsung/models" element={<SamsungModels />} />
        <Route path="/categories/fundas/samsung/models/:model" element={<SamsungModelDetail />} />
        <Route path="/categories/vidrios/samsung/models" element={<SamsungModels />} />
        <Route path="/categories/vidrios/samsung/models/:model" element={<SamsungModelDetail />} />
        <Route path="/categories/cargadores/samsung/models" element={<SamsungModels />} />
        <Route path="/categories/cargadores/samsung/models/:model" element={<SamsungModelDetail />} />
        <Route path="/categories/auriculares/samsung/models" element={<SamsungModels />} />
        <Route path="/categories/auriculares/samsung/models/:model" element={<SamsungModelDetail />} />

        {/* Rutas para Motorola */}
        <Route path="/categories/fundas/motorola/models" element={<MotorolaModels />} />
        <Route path="/categories/fundas/motorola/models/:model" element={<MotorolaModelDetail />} />
        <Route path="/categories/vidrios/motorola/models" element={<MotorolaModels />} />
        <Route path="/categories/vidrios/motorola/models/:model" element={<MotorolaModelDetail />} />
        <Route path="/categories/cargadores/motorola/models" element={<MotorolaModels />} />
        <Route path="/categories/cargadores/motorola/models/:model" element={<MotorolaModelDetail />} />
        <Route path="/categories/auriculares/motorola/models" element={<MotorolaModels />} />
        <Route path="/categories/auriculares/motorola/models/:model" element={<MotorolaModelDetail />} />

        <Route path="/categories/samsung" element={<Subcategory category="Samsung" />} />
        <Route path="/categories/motorola" element={<Subcategory category="Motorola" />} />

        {/* Ruta para detalles de producto */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Rutas para carrito, inicio de sesión y registro */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> {/* Agregar ruta de registro aquí */}
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
