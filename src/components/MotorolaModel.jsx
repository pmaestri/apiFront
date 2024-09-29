// src/components/MotorolaModels.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./Model.css";

const MotorolaModels = () => {
  const models = [
    { name: "MOTOROLA EDGE 40 PRO", path: "/categories/fundas/motorola/models/edge_40_pro" },
    { name: "MOTOROLA EDGE 40", path: "/categories/fundas/motorola/models/edge_40" },
    { name: "MOTOROLA EDGE 30 ULTRA", path: "/categories/fundas/motorola/models/edge_30_ultra" },
    { name: "MOTOROLA EDGE 30 FUSION", path: "/categories/fundas/motorola/models/edge_30_fusion" },
    { name: "MOTO G73 5G", path: "/categories/fundas/motorola/models/g73_5g" },
    { name: "MOTO G53 5G", path: "/categories/fundas/motorola/models/g53_5g" },
    { name: "MOTO G23", path: "/categories/fundas/motorola/models/g23" },
    { name: "MOTO G13", path: "/categories/fundas/motorola/models/g13" },
    { name: "MOTO E22", path: "/categories/fundas/motorola/models/e22" },
    { name: "MOTO E32", path: "/categories/fundas/motorola/models/e32" },
  ];

  return (
    <div>
      <h1>Modelos de Motorola</h1>
      <ul className="model-list">
        {models.map(model => (
          <li key={model.name}>
            <Link to={model.path}>{model.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotorolaModels;
