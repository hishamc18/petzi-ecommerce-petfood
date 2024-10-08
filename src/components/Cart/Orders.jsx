import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const { orders } = useContext(ProductContext);
    const navigate = useNavigate()
    
    return (
        <div className="orders-container">
            <h2 className="orders-heading">Order History</h2>
            <button className="backButton" onClick={() => navigate("/")}><i className='bx bx-home'></i></button>
            {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                <div className={`orders-list ${orders.length > 6 ? 'scrollable' : ''}`}>
                    {orders.slice().reverse().map((order) => (
                        <div className="order-card" key={order.id}>
                            <h3 className="order-id">Order ID: #{order.id}</h3>
                            <p className="orderDate">Order Date: {order.date}</p>
                            <div className="shipping-details">
                                <h4>Shipping Details:</h4>
                                <p><strong>Full Name:</strong> {order.shippingDetails.fullName}</p>
                                <p><strong>Address:</strong> {order.shippingDetails.streetAddress}, {order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.postalCode}</p>
                                <p><strong>Phone:</strong> {order.shippingDetails.phoneNumber}</p>
                            </div>
                            <div className="ordered-items">
                                <h4>Items:</h4>
                                <div className="itemsList">
                                    <ul>
                                        {order.orderedItems.map((item) => (
                                            <li key={item.id}>
                                                <strong>{item.name}</strong> - ₹{item.price} x {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="total-amount">
                                <h4>Total Amount:</h4>
                                <p>₹{Math.floor(order.totalAmount)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;