import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/ProductList";
import Subcategory from './components/Subcategory';  
import Navbar from './components/Navbar';           
import Home from './components/Home';  // Importa el componente Home

function App() {
  return (
    <Router>
      <Navbar /> {/* Si tienes un menú de navegación */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Cambia esto para que muestre Home */}
        <Route path="/categories/iphone" element={<Subcategory category="iPhone" />} />
        <Route path="/categories/samsung" element={<Subcategory category="Samsung" />} />
        <Route path="/categories/motorola" element={<Subcategory category="Motorola" />} />
      </Routes>
    </Router>
  );
}

export default App;

