import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList.jsx";
import Subcategory from './components/Subcategory';  
import Navbar from './components/Navbar/Navbar.jsx';           
import Home from './components/Home/Home.jsx';  
import IphoneModels from './components/IphoneModel/IphoneModel.jsx'; 
import IphoneModelDetail from './components/IphoneModelDetail/IphoneModelDetail.jsx'; 
import SamsungModels from './components/SamsungModel/SamsungModel.jsx'; 
import SamsungModelDetail from './components/SamsungModelDetail/SamsungModelDetail.jsx'; 
import MotorolaModels from './components/MotorolaModel/MotorolaModel.jsx'; 
import MotorolaModelDetail from './components/MotorolaModelDetail/MotorolaModelDetail.jsx'; 
import FundasVerTodo from './components/CoversSeeAll/CoversSeeAll.jsx'; 
import VidriosVerTodo from './components/GlassesSeeAll/GlassesSeeAll.jsx'; 
import Cart from './components/Cart/Cart.jsx'; 
import Login from './components/Auth/LogIn2.jsx'; 
import Register from './components/Auth/Register.jsx'; // Importar el componente de registro
import Footer from './components/Footer/Footer.jsx'; 
import ProductDetail from './components/ProductDetail/ProductDetail.jsx'; 

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
