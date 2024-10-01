import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ onClose }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = [
      { id: 1, name: "Vidrio para Samsung Templado", description: "Protección de pantalla de alta calidad para Samsung.", price: "$6.900", img: "https://via.placeholder.com/600x400" },
      { id: 2, name: "Protector Hidrogel para cualquier modelo", description: "Protector flexible para cualquier dispositivo.", price: "$8.900", img: "https://via.placeholder.com/600x400" },
      { id: 3, name: "Protector Hidrogel iPhone Trasero", description: "Protección trasera para iPhone.", price: "$7.000", discount: "-21% OFF", originalPrice: "$8.900", img: "https://via.placeholder.com/600x400" },
      { id: 4, name: "Protector Hidrogel Mate para cualquier modelo", description: "Protección mate para cualquier dispositivo.", price: "$9.900", img: "https://via.placeholder.com/600x400" },
      { id: 5, name: "Protector Hidrogel Antiespia", description: "Protección antiespía para mayor privacidad.", price: "$10.900", img: "https://via.placeholder.com/600x400" }
    ];

    const selectedProduct = products.find((prod) => prod.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  return (
    <div className="product-detail-overlay">
      <div className="product-detail">
        {product ? (
          <>
            <img src={product.img} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>
            {product.originalPrice && (
              <p className="original-price">Precio original: {product.originalPrice}</p>
            )}
            <button onClick={onClose}>Cerrar</button>
          </>
        ) : (
          <p>Producto no encontrado</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;