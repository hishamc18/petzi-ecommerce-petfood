import React, { useContext, forwardRef } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import "./homeStyle.css";

const Products = forwardRef((_, ref) => {
    const { addToCart, filteredProducts, isLoggedIn, addToWishlist, setToastMessage} = useContext(ProductContext);

    const handleAddToCartClick = (product) => {
        if (!isLoggedIn) {
            setToastMessage("Please log in to add items to your cart")
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
                                        <MdOutlineFavoriteBorder className="wishIcon" />
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