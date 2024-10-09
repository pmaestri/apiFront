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

  // Función para agregar el producto al carrito
  const addToCart = (product) => {
    console.log("Producto a agregar al carrito:", {
      id: product.id,
      name: product.name,
      stock: product.stock, // Asegúrate de que aquí se muestra correctamente el stock
      quantity,
      price: finalPrice,
    });
    
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = currentCart.find(item => item.id === product.id);

    // Verificar si existe el precio con descuento y aplicarlo si es necesario
    const finalPrice = product.discount 
      ? (product.price * (1 - product.discount / 100)) // Precio con descuento
      : product.price; // Precio original si no hay descuento

    // Verificar si hay suficiente stock antes de agregar al carrito
    if (quantity > product.stock) {
      setMessage(`No hay suficiente stock disponible. Stock actual: ${product.stock}`);
      setTimeout(() => setMessage(''), 3000); // Limpiar el mensaje después de 3 segundos
    } else {
      if (productInCart) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        if (productInCart.quantity + quantity <= product.stock) {
          productInCart.quantity += quantity;
        } else {
          setMessage(`No hay suficiente stock disponible. Stock actual: ${product.stock}`);
          setTimeout(() => setMessage(''), 3000);
          return;
        }
      } else {
        // Agrega el producto al carrito con stock
        currentCart.push({ 
          id: product.id,
          name: product.name,
          price: finalPrice,
          originalPrice: product.originalPrice || product.price,
          discount: product.discount || 0,
          image: product.img,
          quantity, // Cantidad seleccionada
          stock: product.stock // **Aquí se agrega el stock correctamente**
        });
      }

      localStorage.setItem('cart', JSON.stringify(currentCart));
      alert(`Producto agregado al carrito con precio: $${finalPrice}`);
    }
  };

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
