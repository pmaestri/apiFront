// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx'; // Asegúrate de que la ruta sea la correcta
// import { obtenerCategorias, eliminarCategoria, crearCategoria } from '../../api/CategoryApi'; // Ajusta la ruta según tu estructura
// import { FaTrashAlt } from 'react-icons/fa'; // Importar el ícono de tacho de basura
// import './CategoryAdmin.css'; // Asegúrate de que el archivo CSS esté en la ruta correcta
// import { useSelector } from 'react-redux';

// const CategoryAdmin = () => {
//     const [categories, setCategories] = useState([]); // Inicializar como array vacío
//     const [error, setError] = useState(null);
//     const [categoryName, setCategoryName] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showCategories, setShowCategories] = useState(false); // Estado para manejar la visibilidad
//     const [isAdmin, setIsAdmin] = useState(false);
//     const navigate = useNavigate();
    
//     // Obtener el token de localStorage
//     const token = useSelector((state)=> state.auth.token);
//     const rol = useSelector((state)=> state.usuarios.rol);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (token) {
//                 try {
//                     // Obtener el rol del usuario

//                     // Verificar el rol y navegar si no es ADMIN
//                     if (rol !== 'ADMIN') {
//                         navigate('/'); // Redirigir si no es ADMIN
//                     } else {
//                         setIsAdmin(true); // Si es ADMIN, establecer el estado
//                     }

//                     // Obtener las categorías desde la API
//                     const response = await obtenerCategorias(token);
//                     setCategories(response); // Asignar las categorías obtenidas
//                 } catch (err) {
//                     setError('Error al obtener datos'); // Manejo de errores genérico
//                 }
//             } else {
//                 navigate('/login'); // Navegar a login si no hay token
//             }
//         };

//         fetchData(); // Llamar a la función para obtener los datos
//     }, [token, navigate, rol]); // Dependencias del useEffect

// // Manejar la creación de una nueva categoría
// const handleCreateCategory = async (event) => {
//     event.preventDefault(); 

//     if (!categoryName.trim()) { // Validación manual
//         setErrorMessage("Por favor ingrese una categoría");
//         return;
//     }

//     const newCategory = {
//         nombre: categoryName,
//     };

//     try {
//         const createdCategory = await crearCategoria(newCategory, token); // Crear la categoría con el token
//         setSuccessMessage(`Categoría creada: ${createdCategory.nombre}`);
//         setCategoryName(''); // Limpiar el campo de entrada
//         setErrorMessage(''); // Limpiar mensajes de error
//         // Re-fetch categories to update the list
//         const response = await obtenerCategorias(token);
//         setCategories(response);
//     } catch (error) {
//         setErrorMessage(`Error: ${error.message}`);
//         setSuccessMessage(''); // Limpiar mensajes de éxito anteriores
//     }
// };


//     // Manejar la eliminación de una categoría
//     const handleDeleteCategory = async (categoriaId) => {
//         if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
//             try {
//                 await eliminarCategoria(categoriaId, token); // Llama a la función de eliminación
//                 setCategories(categories.filter(category => category.id !== categoriaId)); // Actualizar la lista de categorías
//                 setSuccessMessage('Categoría eliminada con éxito.');
//             } catch (error) {
//                 setErrorMessage(`Error: ${error.message}`);
//             }
//         }
//     };

//     // Alternar la visibilidad de las categorías
//     const toggleCategories = () => {
//         setShowCategories(!showCategories);
//     };

//     // Efecto para ocultar mensajes después de 3 segundos
//     useEffect(() => {
//         if (errorMessage || successMessage) {
//             const timer = setTimeout(() => {
//                 setErrorMessage('');
//                 setSuccessMessage('');
//             }, 3000); // 3 segundos

//             return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
//         }
//     }, [errorMessage, successMessage]);

//     if (!isAdmin) return null;
//     return (
//         <div className="category-admin">
//             <AdminNavbar /> 
//             <div className="form-container"> 
//                 <h2 className="title">Administrar Categorías</h2> 
                
//                 {/* Formulario para crear una nueva categoría */}
//                 <form onSubmit={handleCreateCategory} className="category-form">
//                 <div className="form-group">
//                     <label htmlFor="categoryName" className="form-label">Nombre Categoría:</label>
//                     <input
//                         type="text"
//                         id="categoryName"
//                         value={categoryName}
//                         onChange={(e) => setCategoryName(e.target.value)}
//                         className="form-input"
//                         placeholder="Ingrese categoría a crear..." // Agregar placeholder aquí
//                     />
//                 </div>
//                 <button type="submit" className="submit-button-create">Crear Categoría</button>
//                 </form>
//                 {errorMessage && <p className="error-message-category">{errorMessage}</p>}
//                 {successMessage && <p className="success-message-category">{successMessage}</p>}

                
//                 {/* Botón para mostrar/ocultar categorías */}
//                 <button onClick={toggleCategories} className="submit-button-category">
//                     {showCategories ? 'Ocultar Categorías' : 'Mostrar todas las Categorías'}
//                 </button>

//                 {showCategories && (
//                     <div className="categories-container">
//                         <h3>Categorías existentes:</h3>
//                         {error ? (
//                             <p>{error}</p>
//                         ) : (
//                             <ul className="categories-list">
//                                 {Array.isArray(categories) && categories.length > 0 ? (
//                                     categories.map((category) => (
//                                         <li key={category.id} className="category-item">
//                                             <strong>ID:</strong> {category.id} , <strong>Nombre:</strong> {category.nombre}
//                                             <button 
//                                                 onClick={() => handleDeleteCategory(category.id)} 
//                                                 className="delete-button" 
//                                                 title="Eliminar categoría"
//                                             >
//                                                 <FaTrashAlt /> {/* Tacho de basura */}
//                                             </button>
//                                         </li>
//                                     ))
//                                 ) : (
//                                     <p>No hay categorías disponibles.</p>
//                                 )}
//                             </ul>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CategoryAdmin;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar.jsx';
import { FaTrashAlt } from 'react-icons/fa'; 
import './CategoryAdmin.css'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategorias, deleteCategoria, addCategoria } from '../../api/CategorySlice.jsx'; // Importar los actions de la slice
//import { setAuthToken } from '../../api/CategoryApi.jsx';

const CategoryAdmin = () => {
    const [categoryName, setCategoryName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showCategories, setShowCategories] = useState(false); 
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    
    // Obtener datos del estado global (Redux)
    const token = useSelector((state) => state.auth.token);
    const rol = useSelector((state) => state.usuarios.rol);
    const categories = useSelector((state) => state.categorias.categorias); // Categorías del estado global
    const loading = useSelector((state) => state.categorias.loading);
    const error = useSelector((state) => state.categorias.error);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            console.log(token);
            console.log(rol);
           

            if (token) {
                // Verificar el rol y navegar si no es ADMIN
                if (rol !== 'ADMIN') {
                    navigate('/'); 
                } else {
                    setIsAdmin(true); 
                    dispatch(fetchCategorias(token)); // Llamamos a la acción para obtener las categorías
                    //setAuthToken(token);
                }
            } else {
                navigate('/login');
            }
        };

        fetchData();
    }, [token, navigate, rol, dispatch]);

    const handleCreateCategory = async (event) => {

        event.preventDefault(); 

        if (!categoryName.trim()) {
            setErrorMessage("Por favor ingrese una categoría");
            return;
        }

        const newCategory = {
            nombre: categoryName,
        };

        try {
            console.log(token);
            console.log(rol);
            await dispatch(addCategoria(newCategory)); // Llamamos a la acción para crear la categoría
            setSuccessMessage(`Categoría creada: ${categoryName}`);
            setCategoryName(''); 
            setErrorMessage(''); 
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
            setSuccessMessage(''); 
        }
    };

    const handleDeleteCategory = (categoriaId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            try {
                dispatch(deleteCategoria(categoriaId)); // Llamamos a la acción para eliminar la categoría
                setSuccessMessage('Categoría eliminada con éxito.');
            } catch (error) {
                setErrorMessage(`Error: ${error.message}`);
            }
        }
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    useEffect(() => {
        if (errorMessage || successMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
                setSuccessMessage('');
            }, 3000); 

            return () => clearTimeout(timer); 
        }
    }, [errorMessage, successMessage]);

    if (!isAdmin) return null;

    return (
        <div className="category-admin">
            <AdminNavbar /> 
            <div className="form-container"> 
                <h2 className="title">Administrar Categorías</h2> 
                
                <form onSubmit={handleCreateCategory} className="category-form">
                    <div className="form-group">
                        <label htmlFor="categoryName" className="form-label">Nombre Categoría:</label>
                        <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="form-input"
                            placeholder="Ingrese categoría a crear..."
                        />
                    </div>
                    <button type="submit" className="submit-button-create">Crear Categoría</button>
                </form>
                {errorMessage && <p className="error-message-category">{errorMessage}</p>}
                {successMessage && <p className="success-message-category">{successMessage}</p>}

                <button onClick={toggleCategories} className="submit-button-category">
                    {showCategories ? 'Ocultar Categorías' : 'Mostrar todas las Categorías'}
                </button>

                {showCategories && (
                    <div className="categories-container">
                        <h3>Categorías existentes:</h3>
                        {loading ? (
                            <p>Cargando...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <ul className="categories-list">
                                {Array.isArray(categories) && categories.length > 0 ? (
                                    categories.map((category) => (
                                        <li key={category.id} className="category-item">
                                            <strong>ID:</strong> {category.id} , <strong>Nombre:</strong> {category.nombre}
                                            <button 
                                                onClick={() => handleDeleteCategory(category.id)} 
                                                className="delete-button" 
                                                title="Eliminar categoría"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p>No hay categorías disponibles.</p>
                                )}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryAdmin;
