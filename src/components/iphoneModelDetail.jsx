// src/components/IphoneModelDetail.jsx
import React from 'react';

const IphoneModelDetail = ({ model }) => {
  return (
    <div>
      <h1>{model}</h1>
      <p>aca tenemos que agregar los productos {model}</p>
      {/* Aquí puedes cargar y mostrar productos relacionados con el modelo */}
    </div>
  );
};

export default IphoneModelDetail;
