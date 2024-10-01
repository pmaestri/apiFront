import React, { useState } from 'react';
import './VidriosVerTodo.css';

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

  return (
    <div className="vidrios-vertodo">
      <h1>Vidrios Ver Todo</h1>
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

export default VidriosVerTodo;
