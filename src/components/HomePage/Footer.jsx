import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>Petzi</h2>
                    <p>Your one-stop shop for quality pet food. We care about your pets like our own!</p>
                    <p>© 2024 Petzi. All rights reserved.</p>
                </div>
                <div className="footer-section social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;