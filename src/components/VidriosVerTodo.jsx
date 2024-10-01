import React, { useState } from 'react';
import './VidriosVerTodo.css';
import { FaTimes } from 'react-icons/fa';

const VidriosVerTodo = () => {
  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Vidrio para Samsung Templado",
      description: "Protección de pantalla de alta calidad para Samsung.",
      price: "$6.900",
      img: "https://via.placeholder.com/600x400"
    },
    {
      id: 2,
      name: "Protector Hidrogel para cualquier modelo",
      description: "Protector flexible para cualquier dispositivo.",
      price: "$8.900",
      img: "https://via.placeholder.com/600x400"
    },
    {
      id: 3,
      name: "Protector Hidrogel iPhone Trasero",
      description: "Protección trasera para iPhone.",
      price: "$7.000",
      discount: "-21% OFF",
      originalPrice: "$8.900",
      img: "https://via.placeholder.com/600x400"
    },
    {
      id: 4,
      name: "Protector Hidrogel Mate para cualquier modelo",
      description: "Protección mate para cualquier dispositivo.",
      price: "$9.900",
      img: "https://via.placeholder.com/600x400"
    },
    {
      id: 5,
      name: "Protector Hidrogel Antiespia",
      description: "Protección antiespía para mayor privacidad.",
      price: "$10.900",
      img: "https://via.placeholder.com/600x400"
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Establece el producto seleccionado
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null); // Cierra el detalle del producto
  };

  return (
    <div className="vidrios-vertodo">
      <h1>Vidrios Ver Todo</h1>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">
              {product.discount && <span className="product-discount">{product.discount}</span>}
              {product.price}
              {product.originalPrice && (
                <span className="original-price">{product.originalPrice}</span>
              )}
            </p>
            <button>Comprar</button>
          </div>
        ))}
      </div>

      {/* Detalle del producto seleccionado */}
      {selectedProduct && (
        <div className="product-detail-overlay">
          <div className="product-detail">
            {/* Botón para cerrar el detalle */}
            <button className="close-icon" onClick={handleCloseDetail} aria-label="Cerrar detalle"> 
              <FaTimes /> {/* Icono de cerrar */}
            </button>

            {/* Contenedor de la imagen del producto */}
            <div className="product-image-container">
              <img src={selectedProduct.img} alt={selectedProduct.name} />
            </div>
            
            {/* Información del producto */}
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p className="product-price">{selectedProduct.price}</p>

            {/* Precio original si está disponible */}
            {selectedProduct.originalPrice && (
              <p className="original-price">Precio original: {selectedProduct.originalPrice}</p>
            )}

            {/* Botón para agregar al carrito */}
            <button>Agregar al Carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VidriosVerTodo;
