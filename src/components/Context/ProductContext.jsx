import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("dog");
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [orderSummary, setOrderSummary] = useState(null);
    const [orders, setOrders] = useState([]);

    //fetching username from localstorage.
    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setIsLoggedIn(true);
            fetchUser(username);
        }
    }, []);

    //fetching userdetails with username.
    const fetchUser = async (username) => {
        try {
            const response = await axios.get(`http://localhost:5001/users?username=${username}`);
            const user = response.data[0];
            setCurrentUser(user);
            setCart(user.cart || []);
            setOrders(user.orders || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const login = async (username) => {
        const response = await axios.get(`http://localhost:5001/users?username=${username}`);
        if (response.data.length > 0) {
            const user = response.data[0];
            setIsLoggedIn(true);
            setCurrentUser(user);
            setCart(user.cart || []);
            setOrders(user.orders || []);
            localStorage.setItem("username", username);
        } else {
            console.log("User not found");
        }
    };

    const logout = () => {
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setCart([]);
        setOrders([]);
        setCurrentUser(null);
    };

    // fetvhing user details
    useEffect(() => {
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

    //filtering products based on category and search words
    useEffect(() => {
        const filterProducts = () => {
            const filtered = products.filter(
                (product) => product.category === category && product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        };
        filterProducts();
    }, [category, searchTerm, products]);

    // adding items to the cart
    const addToCart = async (product) => {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }
        setCart(updatedCart);
        await updateUserCartInDB(updatedCart);
    };

    //deleting item from cart
    const removeFromCart = async (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        await updateUserCartInDB(updatedCart);
    };

    //updating qty
    const updateQuantity = async (productId, quantity) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        setCart(updatedCart);
        await updateUserCartInDB(updatedCart);
    };

    //updating cart in db (main fn() for patching db)
    const updateUserCartInDB = async (updatedCart) => {
        if (currentUser) {
            try {
                await axios.patch(`http://localhost:5001/users/${currentUser.id}`, { cart: updatedCart });
            } catch (error) {
                console.error("Error updating user cart:", error);
            }
        }
    };

    const setOrderDetails = (details) => {
        const orderWithId = {
            ...details,
            id: Date.now().toString(), // orderId creation
        };
        setOrderSummary(orderWithId);
        saveOrder(orderWithId);

        setTimeout(() => {
            clearCartAfterOrder(); // calling fn() for clearing cart after ordering
        }, 3000);
    };

    // Fn() for clearing the cart after order
    const clearCartAfterOrder = async () => {
        setCart([]); // Clear the cart in the state
        await updateUserCartInDB([]); // Clear the cart in the database
    };

    const saveOrder = async (order) => {
        if (currentUser) {
            try {
                // fetching the data of user to add the order into db
                const userResponse = await axios.get(`http://localhost:5001/users/${currentUser.id}`);
                const currentOrders = userResponse.data.orders || [];

                // Old orders + new order
                const updatedOrders = [...currentOrders, order];

                // Updating order to the db
                await axios.patch(`http://localhost:5001/users/${currentUser.id}`, { orders: updatedOrders });
                setOrders(updatedOrders);
            } catch (error) {
                console.error("Error saving order:", error);
            }
        }
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
                orderSummary,
                setOrderDetails,
                orders,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
