// import React from 'react';
// import { Link } from 'react-router-dom'; // Esto nos permite hacer links entre páginas

// const ProductList = () => {
//   return (
//     <div>
//       <h1>Categorías de Productos</h1>
//       <div className="product-categories">
//         <Link to="/categories/iphone">
//           <button>Ver iPhone</button>
//         </Link>
//         <Link to="/categories/samsung">
//           <button>Ver Samsung</button>
//         </Link>
//         <Link to="/categories/motorola">
//           <button>Ver Motorola</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import { useEffect, useState } from 'react';
import {
  fetchProductos,
  softDeleteProduct,
  filterProductsByPrice,
  addImagesToProduct, // Asegúrate de importar la función para agregar imágenes
} from '../../api/ProductCatalogApi'; // Asegúrate de importar las funciones necesarias

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Puedes ajustar los valores predeterminados
  const [imageFiles, setImageFiles] = useState({}); // Estado para almacenar archivos de imagen por producto

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductos();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  // Función para eliminar un producto
  const handleDeleteProduct = async (productId) => {
    try {
      await softDeleteProduct(productId);
      // Filtra el producto eliminado de la lista
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  // Función para filtrar productos por precio
  const handleFilterProducts = async () => {
    try {
      const filteredProducts = await filterProductsByPrice(minPrice, maxPrice);
      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cambio de archivos de imagen
  const handleImageChange = (productId, event) => {
    const files = event.target.files;
    setImageFiles((prev) => ({
      ...prev,
      [productId]: files, // Almacena los archivos de imagen para el producto específico
    }));
  };

  // Función para cargar imágenes a un producto
  const handleImageUpload = async (productId) => {
    const files = imageFiles[productId];
    if (!files || files.length === 0) return;

    try {
      await addImagesToProduct(productId, Array.from(files)); // Carga las imágenes
      alert('Imágenes añadidas con éxito');
      // Puedes actualizar el estado del producto aquí si es necesario
    } catch (error) {
      console.error(error);
      alert('Error al añadir imágenes');
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>

      {/* Filtros de precio */}
      <div>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Precio mínimo"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Precio máximo"
        />
        <button onClick={handleFilterProducts}>Filtrar</button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>

            {/* Sección para subir imágenes */}
            <div>
              <input
                type="file"
                multiple
                onChange={(e) => handleImageChange(product.id, e)}
              />
              <button onClick={() => handleImageUpload(product.id)}>Subir Imágenes</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
