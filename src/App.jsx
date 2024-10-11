import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Subcategory from './components/Subcategory';  
import Navbar from './components/NavBar/Navbar.jsx';           
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
import Register from './components/Auth/Register.jsx'; 
import Footer from './components/Footer/Footer.jsx'; 
import ProductDetail from './components/ProductDetail/ProductDetail.jsx'; 
import ProductCatalog from './components/ProductCatalog/ProductCatalog.jsx';
import Order from './components/Order/Order.jsx';
import AdminHome from './components/AdminHome/AdminHome.jsx'; // Importa tu componente AdminHome
import UserAdmin from './components/UserAdmin/UserAdmin.jsx'; // Importa el componente UserAdmin
import ProductsAdmin from './components/ProductsAdmin/ProductsAdmin.jsx'; // Importa el componente ProductsAdmin
import OrdersAdmin from './components/OrdersAdmin/OrdersAdmin.jsx'; // Importa el componente OrdersAdmin
import CategoryAdmin from './components/CategoryAdmin/CategoryAdmin.jsx';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation(); // Aquí usamos useLocation

  return (
    <>
      {/* Muestra el Navbar solo si no estás en la ruta de AdminHome o sus subcomponentes */}
      {location.pathname !== '/admin-home' && 
       !location.pathname.startsWith('/admin-home/') && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductCatalog" element={<ProductCatalog />} />
        
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
        <Route path="/register" element={<Register />} /> 
        <Route path="/confirmacion-pedido" element={<Order />} /> 

        {/* Rutas para el componente AdminHome y sus subcomponentes */}
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-home/usuarios" element={<UserAdmin />} />
        <Route path="/admin-home/ordenes" element={<OrdersAdmin />} />
        <Route path="/admin-home/productos" element={<ProductsAdmin />} />
        <Route path="/admin-home/categorias" element={<CategoryAdmin />} />
      </Routes>

      {/* Muestra el Footer solo si no estás en la ruta de AdminHome o sus subcomponentes */}
      {location.pathname !== '/admin-home' && 
       !location.pathname.startsWith('/admin-home/') && <Footer />}
    </>
  );
}

export default App;
