import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDetalleProducto } from '../../api/ProductCatalogApi'; // Asegúrate de que esta ruta sea correcta
import './ProductDetail.css';

const ProductDetail = ({ onClose }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Controlar la cantidad seleccionada por el usuario
  const [message, setMessage] = useState(''); // Mostrar mensajes como el de stock insuficiente

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDetail = await obtenerDetalleProducto(id);  // Llamada al API para obtener el producto
        if (productDetail) {
          setProduct(productDetail);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);



  // Función para aumentar la cantidad seleccionada
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      setMessage(`No puedes agregar más de ${product.stock} unidades.`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Función para disminuir la cantidad seleccionada
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-detail-overlay">
      <div className="product-detail">
        {product ? (
          <>
            <img src={product.img} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
            {product.originalPrice && (
              <p className="original-price">Precio original: ${product.originalPrice}</p>
            )}
            {product.discount && (
              <p className="discounted-price">Precio con Descuento: ${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
            )}
            <p>Stock disponible: {product.stock}</p> {/* Mostrar stock disponible */}

            {/* Controles para aumentar/disminuir cantidad */}
            <div className="quantity-selector">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>

            {/* Mensaje de error si hay stock insuficiente */}
            {message && <p className="stock-error">{message}</p>}

            {/* Botón para agregar al carrito */}
            <button onClick={() => addToCart(product)}>Agregar al Carrito</button>

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
