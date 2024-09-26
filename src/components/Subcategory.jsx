import React from 'react';
import { Link } from 'react-router-dom';

const subCategoriesData = {
  iPhone:[ {
    name: "iPhone 13",
    link: "/product/iphone-13" 
    }],
  Samsung: [],
  Motorola: []
};

const Subcategory = ({ category }) => {
  const subCategories = subCategoriesData[category]; 
  return (
    <div>
      <h2>Subcategorías para {category}</h2>
      <ul>
        {subCategories.map((subcategory, index) => (
          <li key={index}><Link to={subcategory.link}>{subcategory.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default Subcategory;
