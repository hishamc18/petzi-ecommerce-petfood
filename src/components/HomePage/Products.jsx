import React, { useContext, forwardRef } from "react";
import { ProductContext } from "../context/ProductContext";
import { TbJewishStar } from "react-icons/tb";
import "./homeStyle.css";

const Products = forwardRef((_, ref) => {
    const { addToCart, filteredProducts, isLoggedIn, addToWishlist } = useContext(ProductContext);

    const handleAddToCartClick = (product) => {
        if (!isLoggedIn) {
            alert("Please log in to add products to the cart.");
        } else {
            addToCart(product);
        }
    };

    return (
        <div className="products-container" ref={ref}>
            {filteredProducts.length === 0 ? (
                <p className="productError">No products found...😞</p>
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
                                    {product.oldPrice && <p className="title price old-price">₹{product.oldPrice}</p>}
                                </div>
                            </div>
                            <div className="wrapCardButtons">
                                <button className="card-btn" onClick={() => handleAddToCartClick(product)}>
                                    <i className="bx bx-cart"></i> Add to Cart
                                </button>
                                <button className="card-btn2" onClick={() => addToWishlist(product)}>
                                        <TbJewishStar className="wishIcon" />
                                    </button>
                            </div>
                        </div>
                        <p className="tag">-50%</p>
                    </div>
                ))
            )}
        </div>
    );
});

export default Products;