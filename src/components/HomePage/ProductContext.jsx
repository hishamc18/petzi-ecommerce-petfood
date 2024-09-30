// // ProductContext.js
// import React, { createContext, useState } from 'react';

// // Create ProductContext
// export const ProductContext = createContext();

// // Create a provider component
// export const ProductProvider = ({ children }) => {
//   const [category, setCategory] = useState('dog'); // Default to 'dog'

//   return (
//     <ProductContext.Provider value={{ category, setCategory }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

import React, { createContext, useState } from 'react';

// Create ProductContext
export const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [category, setCategory] = useState('dog'); // Default to 'dog'
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state

  return (
    <ProductContext.Provider value={{ category, setCategory, searchTerm, setSearchTerm }}>
      {children}
    </ProductContext.Provider>
  );
};