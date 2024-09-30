
// Category.jsx
import React, { useContext } from "react";
import { ProductContext } from "./ProductContext";
import "./style.css"; // Add any necessary styles

const Category = () => {
    const { setCategory } = useContext(ProductContext);

    return (
        <div className="category-container">
            <h2>Select Category</h2>
            <div className="category-buttons">
                <div className="pet">
                    <button
                        onClick={() => {
                            setCategory("dog");
                            console.log("Selected category: dog");
                        }}
                        className="category-btn"
                    >
                        <img src="src/assets/dog.png" alt="Dog" />
                    </button>
                    <label>Dog</label>
                    </div>
                    <div className="pet">
                    <button
                        onClick={() => {
                            setCategory("cat");
                            console.log("Selected category: cat");
                        }}
                        className="category-btn"
                    >
                        <img src="src/assets/Cat.png" alt="Cat" />
                    </button>
                    <label>Cat</label>
                </div>
                </div>
        </div>
    );
};

export default Category;
