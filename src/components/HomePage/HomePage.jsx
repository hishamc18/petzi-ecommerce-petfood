// import React, { useContext, useEffect, useState } from "react";
// import "./homeStyle.css";
// import HeroSection from "./HeroSection";
// import Navbar from "./Navbar";
// import Products from "./Products";
// import Category from "./Category";
// import Caption from "./Caption";
// import Footer from "./Footer";
// import { ProductContext } from "../Context/ProductContext";

// function HomePage() {
//     const { searchTerm } = useContext(ProductContext);

//     return (
//         <div className="homePage">
//             <Navbar />
//             <Caption />

//             {searchTerm ? (
//                 <>
//                     <Category />
//                     <Products />
//                     <HeroSection />
//                 </>
//             ) : (
//                 <>
//                     <HeroSection />
//                     <Category />
//                     <Products />
//                 </>
//             )}
//             <Footer />
//         </div>
//     );
// }

// export default HomePage;




import React, { useContext, useRef } from "react";
import "./homeStyle.css";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Products from "./Products";
import Category from "./Category";
import Caption from "./Caption";
import Footer from "./Footer";
import { ProductContext } from "../Context/ProductContext";

function HomePage() {
    const { searchTerm } = useContext(ProductContext);
    const productsRef = useRef(null);

    // Scroll to the Products component
    const scrollToProducts = () => {
        if (productsRef.current) {
            productsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

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