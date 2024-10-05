import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [wishList, setWishList] = useState([])
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [orderSummary, setOrderSummary] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setIsLoggedIn(true);
            fetchUser(username);
        }
    }, []);

    const fetchUser = async (username) => {
        try {
            const response = await axios.get(`http://localhost:5001/users?username=${username}`);
            const user = response.data[0];
            setCurrentUser(user);
            setCart(user.cart || []);
            setOrders(user.orders || []);
            setWishList(user.wishlist || [])
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const login = async (username) => {
        await fetchUser(username);
        setIsLoggedIn(true);
        localStorage.setItem("username", username);
    };

    const logout = () => {
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setCart([]);
        setOrders([]);
        setCurrentUser(null);
    };

    // Fetch products
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

    // Filter products based on category or search term
    useEffect(() => {
        const filterProducts = () => {
            let filtered = products;

            // If search term exists, prioritize search over category filter
            if (searchTerm) {
                filtered = products.filter((product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (category) {
                // Only filter by category if no search term is provided
                filtered = products.filter((product) => product.category === category);
            }

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [category, searchTerm, products]);






    // Wishlist logic
    const addToWishlist = async (product) => {
        const updatedWishlist = [...wishList];
        const existingItem = updatedWishlist.find((item) => item.id === product.id);

        if (!existingItem) {
            updatedWishlist.push(product); // Add product to wishlist if not already present
            setWishList(updatedWishlist);
            await updateUserWishlistInDB(updatedWishlist);
        }
    };

    const removeFromWishlist = async (productId) => {
        const updatedWishlist = wishList.filter((item) => item.id !== productId);
        setWishList(updatedWishlist);
        await updateUserWishlistInDB(updatedWishlist);
    };

    const clearWishlist = async () => {
        setWishList([]);
        await updateUserWishlistInDB([]);
    };

    const updateUserWishlistInDB = async (updatedWishlist) => {
        if (currentUser) {
            try {
                await axios.patch(`http://localhost:5001/users/${currentUser.id}`, { wishlist: updatedWishlist });
            } catch (error) {
                console.error("Error updating wishlist:", error);
            }
        }
    };







    // Add item to the cart
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

    const removeFromCart = async (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        await updateUserCartInDB(updatedCart);
    };

    const updateQuantity = async (productId, quantity) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        setCart(updatedCart);
        await updateUserCartInDB(updatedCart);
    };

    const updateUserCartInDB = async (updatedCart) => {
        if (currentUser) {
            try {
                await axios.patch(`http://localhost:5001/users/${currentUser.id}`, { cart: updatedCart });
            } catch (error) {
                console.error("Error updating user cart:", error);
            }
        }
    };



    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const setOrderDetails = (details) => {
        const orderWithId = {
            ...details,
            id: Date.now().toString(), 
            date: formattedDate,
        };
        setOrderSummary(orderWithId);
        saveOrder(orderWithId);
        setTimeout(() => {
            clearCartAfterOrder();
        }, 3000);
    };

    const clearCartAfterOrder = async () => {
        setCart([]);
        await updateUserCartInDB([]);
    };

    const saveOrder = async (order) => {
        if (currentUser) {
            try {
                const userResponse = await axios.get(`http://localhost:5001/users/${currentUser.id}`);
                const currentOrders = userResponse.data.orders || [];
                const updatedOrders = [...currentOrders, order];
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
                wishList,
                addToWishlist,
                removeFromWishlist,
                clearWishlist,
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