import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Importar el componente Slider
import 'slick-carousel/slick/slick.css'; // Estilos de slick
import 'slick-carousel/slick/slick-theme.css'; // Estilos de slick
import imagen1 from '../assets/images/imagen1.png';
import imagen2 from '../assets/images/imagen2.png';
import imagen3 from '../assets/images/imagen3.png';

const Home = () => {
  const navigate = useNavigate();

  // Array de rutas de imágenes
  const images = [
    imagen1,
    imagen2,
    imagen3,
  ];

  // Configuraciones del carrusel
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Número de slides a mostrar
    slidesToScroll: 1, // Número de slides a desplazar
    autoplay: true, // Autoplay
    autoplaySpeed: 3000, // Velocidad del autoplay
  };

  return (
    <div className="home">
      <h1>Bienvenido a Top Cases!</h1>
      <p>Explora nuestra selección de accesorios para celulares</p>

      {/* Componente Slider con configuraciones */}
      <Slider {...settings} className="slider-container"> {/* Agregar clase para el contenedor del slider */}
        {images.map((image, index) => (
          <div key={index} className="image-container"> {/* Contenedor para la imagen */}
            <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Home;
