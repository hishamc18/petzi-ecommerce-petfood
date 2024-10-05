import React, { useContext, useRef, useEffect } from "react";
import "./homeStyle.css";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Products from "./Products";
import Category from "./Category";
import Caption from "./Caption";
import Footer from "./Footer";
import { ProductContext } from "../context/ProductContext";

function HomePage() {
    const { searchTerm } = useContext(ProductContext);
    const productsRef = useRef(null);

    // Scroll to the Products component
    const scrollToProducts = () => {
        if (productsRef.current) {
            window.scrollTo({
                top: productsRef.current.offsetTop - 130,
                behavior: "smooth"
            });
        }
    };

    // Auto-scroll to top when search active
    useEffect(() => {
        if (searchTerm && productsRef.current) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [searchTerm]);

    return (
        <div className="homePage">
            <Navbar />
            <Caption />

            {searchTerm ? (
                <>
                    <Category scrollToProducts={scrollToProducts} />
                    <Products ref={productsRef} />
                    <HeroSection />
                </>
            ) : (
                <>
                    <HeroSection />
                    <Category scrollToProducts={scrollToProducts} />
                    <Products ref={productsRef} />
                </>
            )}
            <Footer />
        </div>
    );
}

export default HomePage;