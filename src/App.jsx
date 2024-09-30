import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/ProductList";
import Subcategory from './components/Subcategory';  
import Navbar from './components/Navbar';           
import Home from './components/Home';  
import IphoneModels from './components/IphoneModel'; 
import IphoneModelDetail from './components/IphoneModelDetail'; // Detalles de iPhone
import SamsungModels from './components/SamsungModel'; // Componente para los modelos de Samsung
import SamsungModelDetail from './components/SamsungModelDetail'; // Detalles de Samsung
import MotorolaModels from './components/MotorolaModel'; // Componente para los modelos de Motorola
import MotorolaModelDetail from './components/MotorolaModelDetail'; // Detalles de Motorola

// NUEVO: Importar componentes de Carrito e Inicio de Sesión
import Cart from './components/Cart'; // Página del carrito
import Login from './components/LogIn'; // Página de inicio de sesión

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rutas para fundas */}
        <Route path="/categories/fundas/iphone/models" element={<IphoneModels />} />
        <Route path="/categories/fundas/iphone/models/:model" element={<IphoneModelDetail />} />

        {/* Rutas para vidrios */}
        <Route path="/categories/vidrios/iphone/models" element={<IphoneModels />} />
        <Route path="/categories/vidrios/iphone/models/:model" element={<IphoneModelDetail />} />

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

        {/* NUEVO: Rutas para carrito e inicio de sesión */}
        <Route path="/cart" element={<Cart />} /> {/* Ruta para la página del carrito */}
        <Route path="/login" element={<Login />} /> {/* Ruta para la página de inicio de sesión */}
        
      </Routes>
    </Router>
  );
}

export default App;
