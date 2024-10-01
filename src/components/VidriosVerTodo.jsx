import React, { useState } from 'react';
import './VidriosVerTodo.css';
import { FaTimes, FaShoppingCart } from 'react-icons/fa'; // Importamos el icono del carrito

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
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad de productos

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Establece el producto seleccionado
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null); // Cierra el detalle del producto
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1); // Incrementa la cantidad
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Decrementa la cantidad si es mayor a 1
    }
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
          <div className="product-detail-container">
            {/* Botón para cerrar el detalle dentro del cuadro */}
            <button className="close-icon" onClick={handleCloseDetail} aria-label="Cerrar detalle">
              <FaTimes /> {/* Icono de cerrar */}
            </button>

            <div className="product-detail-content">
              {/* Contenedor de imagen y detalles lado a lado */}
              <div className="product-image">
                <img src={selectedProduct.img} alt={selectedProduct.name} />
              </div>
              <div className="product-info">
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
                <p className="product-price">{selectedProduct.price}</p>

                {/* Precio original si está disponible */}
                {selectedProduct.originalPrice && (
                  <p className="original-price">Precio original: {selectedProduct.originalPrice}</p>
                )}

                {/* Contador de cantidad */}
                <div className="quantity-selector">
                  <button onClick={decreaseQuantity}>-</button>
                  <span>{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>

                {/* Botón para agregar al carrito */}
                <button className="add-to-cart-btn">
                  <FaShoppingCart className="cart-icon" /> {/* Icono de carrito */}
                  <span>Agregar al Carrito</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VidriosVerTodo;
