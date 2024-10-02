
import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import "./style.css";

const Products = () => {
  const { addToCart, filteredProducts, isLoggedIn } = useContext(ProductContext);

  // Wrap addToCart with a login check
  const handleAddToCartClick = (product) => {
    if (!isLoggedIn) {
      alert("Please log in to add products to the cart.");
    } else {
      addToCart(product); // Call the original addToCart function if the user is logged in
    }
  };

  return (
    <div className="products-container">
      {filteredProducts.length === 0 ? (
        <p>No products found...</p>
      ) : (
        filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <div className="wrapper">
              <div className="card-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="content">
                <p className="title">{product.name}</p>
                <div className="prices">
                  <p className="title price">₹{product.price}</p>
                  {product.oldPrice && (
                    <p className="title price old-price">₹{product.oldPrice}</p>
                  )}
                </div>
              </div>
              <button
                className="card-btn"
                onClick={() => handleAddToCartClick(product)}
              >
                <i class='bx bx-cart'></i> Add to Cart 
              </button>
            </div>
            <p className="tag">-50%</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;