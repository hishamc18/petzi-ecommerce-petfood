import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';
import axios from 'axios';
import './style.css'

const Products = () => {
  const { category, searchTerm } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the selected category
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/products');
        const filteredProducts = response.data.filter(product => 
          product.category === category && 
          product.name.toLowerCase().includes(searchTerm) // Filter based on search term
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, [category, searchTerm]); // Re-run effect when category or searchTerm changes

  return (
    <div className="products-container">
      {products.length === 0 ? (
        <p>No products found...</p>
      ) : (
        products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;