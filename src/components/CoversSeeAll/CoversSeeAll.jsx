import React, { useState } from 'react';
import './FundasVerTodo.css';

const FundasVerTodo = () => {
  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Funda Premium Transparente para iPhone",
      description: "Funda resistente con diseño transparente.",
      price: "$11.900",
      img: "https://via.placeholder.com/600x400"
    },
    {
      id: 2,
      name: "Funda Reforzada 360 grados",
      description: "Protección completa para tu teléfono.",
      price: "$12.500",
      img: "https://via.placeholder.com/600x400"
    },
    {
      id: 3,
      name: "Funda Evo Gem",
      description: "Estilo y protección en un solo lugar.",
      price: "$8.910",
      img: "https://via.placeholder.com/600x400",
      discount: "-10% OFF", // Ejemplo de descuento
      originalPrice: "$9.900" // Precio antes del descuento
    },
    {
      id: 4,
      name: "Funda TPU Transparente para Samsung",
      description: "Ligera y delgada, con gran protección.",
      price: "$11.900",
      img: "https://via.placeholder.com/600x400"
    },
    {
      id: 5,
      name: "Funda Filipinas",
      description: "Colores vibrantes para tu iPhone.",
      price: "$11.900",
      img: "https://via.placeholder.com/600x400"
    }
  ]);

  return (
    <div className="fundas-vertodo">
      <h1>Fundas</h1>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <div key={product.id} className="product-card">
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
    </div>
  );
};

export default FundasVerTodo;
