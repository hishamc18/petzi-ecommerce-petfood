import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import "./homeStyle.css";

const Products = () => {
    const { addToCart, filteredProducts, isLoggedIn } = useContext(ProductContext);

    // shows alerts when clicks add to cart btn without BiLogoEdge, else add to cart Fn() with passing product
    const handleAddToCartClick = (product) => {
        if (!isLoggedIn) {
            alert("Please log in to add products to the cart.");
        } else {
            addToCart(product);
        }
    };

    return (
        <div className="products-container">
            {filteredProducts.length === 0 ? (
                <p>No products found...</p>
            ) : (
                //maping the filtered products
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
                                    {product.oldPrice && <p className="title price old-price">₹{product.oldPrice}</p>}
                                </div>
                            </div>
                            <button className="card-btn" onClick={() => handleAddToCartClick(product)}>
                                <i className="bx bx-cart"></i> Add to Cart
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
