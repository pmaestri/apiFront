import React from 'react';
import { Link } from 'react-router-dom'; // Esto nos permite hacer links entre páginas

const ProductList = () => {
  return (
    <div>
      <h1>Categorías de Productos</h1>
      <div className="product-categories">
        <Link to="/categories/iphone">
          <button>Ver iPhone</button>
        </Link>
        <Link to="/categories/samsung">
          <button>Ver Samsung</button>
        </Link>
        <Link to="/categories/motorola">
          <button>Ver Motorola</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;

