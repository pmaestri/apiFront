// src/components/MotorolaModels.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MotorolaModels = () => {
  const models = [
    "MOTOROLA_EDGE_40_PRO",
    "MOTOROLA_EDGE_40",
    "MOTOROLA_EDGE_30_ULTRA",
    "MOTOROLA_EDGE_30_FUSION",
    "MOTO_G73_5G",
    "MOTO_G53_5G",
    "MOTO_G23",
    "MOTO_G13",
    "MOTO_E22",
    "MOTO_E32"
  ];

  return (
    <div>
      <h1>Modelos de Motorola</h1>
      <ul>
        {models.map(model => (
          <li key={model}>
            <Link to={`/categories/fundas/motorola/models/${model}`}>{model}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotorolaModels;
