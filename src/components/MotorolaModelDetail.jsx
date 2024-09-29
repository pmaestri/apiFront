// src/components/MotorolaModelDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const MotorolaModelDetail = () => {
  const { model } = useParams();

  return (
    <div>
      <h1>Detalles de {model}</h1>
      {/* Aquí puedes agregar más información sobre el modelo */}
      <p>completar con fotos del back{model}.</p>
    </div>
  );
};

export default MotorolaModelDetail;
