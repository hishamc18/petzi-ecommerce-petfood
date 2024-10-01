import React, { useContext } from "react";
import { ProductContext } from "../ProductContext";
import TotalPrice from "./TotalPrice";
import { MdDeleteForever } from "react-icons/md";
import "./style.css";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(ProductContext);

    return (
        <div className="cart-price">
            <h1>Your Cart</h1>
            <div className="cart-container">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cart.map((product) => (
                                <div className="cart-item" key={product.id}>
                                    <img src={product.image} alt={product.name} />
                                    <div className="cart-details">
                                        <h4>{product.name}</h4>
                                        <h5>Seller: {product.seller}</h5>
                                        <p>
                                            <span className="original-price">₹{product.oldPrice}</span>
                                            <span className="discounted-price"> ₹{product.price}</span>
                                        </p>
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>
                                                -
                                            </button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-actions">
                                            <div onClick={() => removeFromCart(product.id)} class="del">
                                                <div>
                                                    <MdDeleteForever />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="delivery-info">
                                        <p>
                                            Delivery by {product.deliveryDate} | <span>Free</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="price-details">
                            <TotalPrice /> {/* Render the TotalPrice component */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
