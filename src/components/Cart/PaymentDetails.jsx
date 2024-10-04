import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { SiGooglepay } from "react-icons/si";
import { FaAmazonPay, FaPaypal, FaRegCreditCard } from "react-icons/fa";
import "./cartStyle.css";

const PaymentDetails = () => {
    const { cart, setCart, setOrderDetails } = useContext(ProductContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    // for passing shipping details to order summary
    const [shippingDetails, setShippingDetails] = useState({
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        phoneNumber: "",
    });

    // for submiting shipping details form
    const submiting = (e) => {
        e.preventDefault();
        openModal();
    };

    // for storing the shipping details
    const handleInputChange = (e) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const totalPrice = Array.isArray(cart) ? cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
    const securedPackagingFee = 39;
    const finalAmount = totalPrice + securedPackagingFee;

    const openModal = () => {
        setIsModalOpen(true);
        setIsLoading(false);
        setIsSuccess(false);
    };

    const handlePayment = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);

            // Passing order details to OrderSummary
            const orderDetails = {
                shippingDetails,
                orderedItems: cart,
                totalAmount: finalAmount,
            };
            setOrderDetails(orderDetails);
            setTimeout(() => {
                console.log("navigating to OrderSummary");

                setIsModalOpen(false);
                setCart([]); // Clear cart after order
                navigate("/order-summary"); // Navigate to order summary
            }, 2200);
        }, 1000);
    };

    return (
        <>
            <div className="price-details">
                <h2>Price Details</h2>
                <div className="price-item">
                    <span>Price ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
                    <span>₹{Math.floor(totalPrice)}</span>
                </div>
                <div className="price-item">
                    <span>Delivery Charges</span>
                    <h4>Free</h4>
                </div>
                <div className="price-item">
                    <span>Secured Packaging Fee</span>
                    <span>₹{securedPackagingFee}</span>
                </div>
                <hr />
                <div className="price-item total">
                    <span>Total Amount</span>
                    <span>₹{Math.floor(finalAmount)}</span>
                </div>
            </div>

            <div className="shippingDetails">
                <h2>Shipping Details</h2>
                <div className="address">
                    <form onSubmit={submiting}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={shippingDetails.fullName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="streetAddress"
                            placeholder="Street Address"
                            value={shippingDetails.streetAddress}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={shippingDetails.city}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="statePin">
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={shippingDetails.state}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Postal Code"
                                value={shippingDetails.postalCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={shippingDetails.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <button className="proceed-btn">Proceed To Payment</button>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Payment Modal"
                className="custom-modal"
                overlayClassName="custom-overlay"
            >
                {isLoading ? (
                    <div className="loading-container">
                        <FiLoader className="loading-icon" />
                        <h3 className="processingHead">Processing Payment...</h3>
                        <p className="loading-text">Please wait a moment</p>
                    </div>
                ) : isSuccess ? (
                    <div className="success-container">
                        <FaCheckCircle className="success-icon" />
                        <h3 className="processingHead">Payment Successful!</h3>
                        <p className="success-text">Total Amount Paid: ₹{Math.floor(finalAmount)}</p>
                        <p className="redirect-text">Wait for your Order Summary...</p>
                    </div>
                ) : (
                    <div className="payment-container">
                        <h2>
                            <span>Pay</span>ment Details
                        </h2>
                        <p>
                            Total Amount: <span>₹{Math.floor(finalAmount)}</span>
                        </p>
                        <h3>Select Payment Method:</h3>
                        <div className="payment-options">
                            <label>
                                <input type="radio" name="payment" value="Credit Card" /> Credit Card
                                <FaRegCreditCard className="debitcard" />
                            </label>
                            <label>
                                <input type="radio" name="payment" value="Debit Card" /> Debit Card
                                <FaRegCreditCard className="debitcard" />
                            </label>
                            <label>
                                <div className="upi">
                                    <input type="radio" name="payment" value="UPI" /> UPI
                                    <SiGooglepay className="payIcons" />
                                    <FaAmazonPay className="payIcons" />
                                    <FaPaypal className="payIcons" />
                                </div>
                            </label>
                            <label>
                                <input type="radio" name="payment" value="COD" /> Cash on Delivery
                            </label>
                        </div>
                        <button className="pay-now-btn" onClick={handlePayment}>
                            Pay Now
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default PaymentDetails;
