import React, { useContext, useState } from 'react';
import { ProductContext } from '../ProductContext';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
const TotalPrice = () => {
    const { cart, setCart } = useContext(ProductContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const submiting = (e) => {
        e.preventDefault();
        openModal();
    };

    // Calculate total price
    const totalPrice = Array.isArray(cart)
        ? cart.reduce((total, item) => total + (item.price * item.quantity), 0)
        : 0;

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

            // Delay the modal close and navigation for 3 seconds after payment success
            setTimeout(() => {
                setIsModalOpen(false); // Close the modal after showing success
                setCart([]); // Clear the cart
                navigate('/'); // Navigate to home after modal close
            }, 2500); // 3-second delay
        }, 1000); // 1-second loading delay
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
                        <input type="text" placeholder="Full Name" required />
                        <input type="text" placeholder="Street Address" required />
                        <input type="text" placeholder="City" required />
                        <div className="statePin">
                            <input type="text" placeholder="State" required />
                            <input type="text" placeholder="Postal Code" required />
                        </div>
                        <input type="text" placeholder="Phone Number" required />
                        <button className="proceed-btn">
                            Proceed To Payment
                        </button>
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
                        <h2>Processing Payment...</h2>
                        <p className="loading-text">Please wait a moment</p>
                    </div>
                ) : isSuccess ? (
                    <div className="success-container">
                        <FaCheckCircle className="success-icon" />
                        <h2>Payment Successful!</h2>
                        <p className="success-text">Total Amount Paid: ₹{Math.floor(finalAmount)}</p>
                        <p className="redirect-text">Redirecting to Home Page...</p>
                    </div>
                ) : (
                    <div className="payment-container">
                        <h2>Payment Details</h2>
                        <p>Total Amount: <span>₹{Math.floor(finalAmount)}</span></p>
                        <h3>Select Payment Method:</h3>
                        <div className="payment-options">
                            <label>
                                <input type="radio" name="payment" value="Credit Card" /> Credit Card
                            </label>
                            <label>
                                <input type="radio" name="payment" value="Debit Card" /> Debit Card
                            </label>
                            <label>
                                <input type="radio" name="payment" value="UPI" /> UPI
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

export default TotalPrice;