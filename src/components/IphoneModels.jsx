// // src/components/IphoneModels.jsx
// import React from 'react';

// const IphoneModels = () => {
//   const iphoneModels = [
//     "iPhone 15 Pro Max",
//     "iPhone 15 Pro",
//     "iPhone 15 Plus",
//     "iPhone 15",
//     "iPhone 14 Pro Max",
//     "iPhone 14 Pro",
//     "iPhone 14 Plus",
//     "iPhone 14",
//     "iPhone 13 Pro Max",
//     "iPhone 13 Pro",
//     "iPhone 13 Mini",
//     "iPhone 13"
//   ];

//   return (
//     <div>
//       <h1>Modelos de iPhone</h1>
//       <ul>
//         {iphoneModels.map((model, index) => (
//           <li key={index}>{model}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default IphoneModels;
// src/components/IphoneModels.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const IphoneModels = () => {
  const models = [
    { name: "iPhone 15 Pro Max", path: "/categories/fundas/iphone/models/15_pro_max" },
    { name: "iPhone 15 Pro", path: "/categories/fundas/iphone/models/15_pro" },
    { name: "iPhone 15 Plus", path: "/categories/fundas/iphone/models/15_plus" },
    { name: "iPhone 15", path: "/categories/fundas/iphone/models/15" },
    { name: "iPhone 14 Pro Max", path: "/categories/fundas/iphone/models/14_pro_max" },
    { name: "iPhone 14 Pro", path: "/categories/fundas/iphone/models/14_pro" },
    { name: "iPhone 14 Plus", path: "/categories/fundas/iphone/models/14_plus" },
    { name: "iPhone 14", path: "/categories/fundas/iphone/models/14" },
    { name: "iPhone 13 Pro Max", path: "/categories/fundas/iphone/models/13_pro_max" },
    { name: "iPhone 13 Pro", path: "/categories/fundas/iphone/models/13_pro" },
    { name: "iPhone 13 Mini", path: "/categories/fundas/iphone/models/13_mini" },
    { name: "iPhone 13", path: "/categories/fundas/iphone/models/13" },
  ];

  return (
    <div>
      <h1>Modelos de iPhone</h1>
      <ul>
        {models.map((model) => (
          <li key={model.name}>
            <Link to={model.path}>{model.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IphoneModels;
