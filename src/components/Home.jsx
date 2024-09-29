import React from 'react';
import './Home.css';
import {useNavigate } from 'react-router-dom';

const Home = () => { 
const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Bienvenido a Top Cases!</h1>
      <p>Explora nuestra selección de accesorios para celulares</p>

      {/* <div className="categories">
        <div className="category">
          <img 
            src="https://via.placeholder.com/300x200.png?text=iPhone" 
            alt="iPhone" 
          />
          <button onClick={()=>{navigate("/categories/iphone")}}>Ver iPhone</button>
        </div>
        <div className="category">
          <img 
            src="https://via.placeholder.com/300x200.png?text=Samsung" 
            alt="Samsung" 
          />
          <button onClick={()=>{navigate("/categories/samsung")}}>Ver Samsung</button>
        </div>
        <div className="category">
          <img 
            src="https://via.placeholder.com/300x200.png?text=Motorola" 
            alt="Motorola" 
          />
          <button onClick={()=>{navigate("/categories/motorola")}}>Ver Motorola</button>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
