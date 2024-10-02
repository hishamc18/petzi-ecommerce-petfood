import React, { useEffect, useState } from "react";
import "./homeStyle.css";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Products from "./Products";
import Category from "./Category";
import Caption from "./Caption";
import Footer from "./Footer";

function HomePage() {
    const [username, setUsername] = useState("");

    //fetch the username  from the local storage for displaying the name in user section
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="homePage">
            <Navbar username={username} />
            <Caption />
            <HeroSection />
            <Category />
            <Products />
            <Footer />
        </div>
    );
}

export default HomePage;
