import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]); //products
    const [filteredProducts, setFilteredProducts] = useState([]); //maping giltered products
    const [searchTerm, setSearchTerm] = useState(""); //used for searching
    const [category, setCategory] = useState("dog"); //category from cat and dog products
    const [cart, setCart] = useState([]); //for cart use
    const [isLoggedIn, setIsLoggedIn] = useState(false); //used for cheking the login status

    // Check login status on context mount
    useEffect(() => {
        const username = localStorage.getItem("username");
        setIsLoggedIn(!!username); // Set isLoggedIn based on username presence
    }, []);

    // Login fn()
    const login = (username) => {
        localStorage.setItem("username", username);
        setIsLoggedIn(true);
    };

    // Logout fn()
    const logout = () => {
        localStorage.removeItem("username");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        // Fetching all products initially
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5001/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        // Filtering products when clicking the cat/dog btn
        const filterProducts = () => {
            const filtered = products.filter(
                (product) => product.category === category && product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        };
        filterProducts();
    }, [category, searchTerm, products]);

    // Adding products to cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const isProductInCart = prevCart.find((item) => item.id === product.id);
            if (isProductInCart) {
                return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Removing product from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // Updating product quantity (- or +)
    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
        );
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                filteredProducts,
                searchTerm,
                setSearchTerm,
                category,
                setCategory,
                cart,
                setCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                isLoggedIn,
                login,
                logout,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
