// src/components/SamsungModels.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SamsungModels = () => {
  const models = [
    "GALAXY_S23_ULTRA",
    "GALAXY_S23_PLUS",
    "GALAXY_S23",
    "GALAXY_Z_FOLD_5",
    "GALAXY_Z_FLIP_5",
    "GALAXY_S22_ULTRA",
    "GALAXY_S22_PLUS",
    "GALAXY_S22",
    "GALAXY_A54_5G",
    "GALAXY_A34_5G",
    "GALAXY_A14_5G",
    "GALAXY_A04S"
  ];

  return (
    <div>
      <h1>Modelos de Samsung</h1>
      <ul>
        {models.map(model => (
          <li key={model}>
            <Link to={`/categories/fundas/samsung/models/${model}`}>{model}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SamsungModels;
