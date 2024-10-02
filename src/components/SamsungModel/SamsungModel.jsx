// src/components/SamsungModels.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./Model.css";

const SamsungModels = () => {
  const models = [
    { name: "GALAXY S23 ULTRA", path: "/categories/fundas/samsung/models/galaxy_s23_ultra" },
    { name: "GALAXY S23 PLUS", path: "/categories/fundas/samsung/models/galaxy_s23_plus" },
    { name: "GALAXY S23", path: "/categories/fundas/samsung/models/galaxy_s23" },
    { name: "GALAXY Z FOLD 5", path: "/categories/fundas/samsung/models/galaxy_z_fold_5" },
    { name: "GALAXY Z FLIP 5", path: "/categories/fundas/samsung/models/galaxy_z_flip_5" },
    { name: "GALAXY S22 ULTRA", path: "/categories/fundas/samsung/models/galaxy_s22_ultra" },
    { name: "GALAXY S22 PLUS", path: "/categories/fundas/samsung/models/galaxy_s22_plus" },
    { name: "GALAXY S22", path: "/categories/fundas/samsung/models/galaxy_s22" },
    { name: "GALAXY A54 5G", path: "/categories/fundas/samsung/models/galaxy_a54_5g" },
    { name: "GALAXY A34 5G", path: "/categories/fundas/samsung/models/galaxy_a34_5g" },
    { name: "GALAXY A14 5G", path: "/categories/fundas/samsung/models/galaxy_a14_5g" },
    { name: "GALAXY A04S", path: "/categories/fundas/samsung/models/galaxy_a04s" },
  ];



  return (
    <div>
      <h1>Modelos de Samsung</h1>
      <ul className="model-list">
      {models.map((model) => (
        <li key={model.name}>
          <Link to={model.path}>{model.name}</Link>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default SamsungModels;


