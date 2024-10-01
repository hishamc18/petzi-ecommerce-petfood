import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("dog");
  const [cart, setCart] = useState([]); // Cart state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on context mount
  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsLoggedIn(!!username); // Set isLoggedIn based on username presence
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.find((item) => item.id === product.id);
      if (isProductInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  useEffect(() => {
    // Fetch all products initially
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
    // Filter products whenever category or searchTerm changes
    const filterProducts = () => {
      const filtered = products.filter(
        (product) =>
          product.category === category && product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [category, searchTerm, products]);

  // Login function
  const login = (username) => {
    localStorage.setItem('username', username);
    setIsLoggedIn(true); // Set the user as logged in
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    // setCart([]); // Clear cart on logout
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