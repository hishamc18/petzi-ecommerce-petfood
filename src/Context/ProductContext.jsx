import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [wishList, setWishList] = useState([]);
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [orderSummary, setOrderSummary] = useState(null);
    const [orders, setOrders] = useState([]);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false); // For logout modal handling

    /// Runs initially when component mounts and fetch username from localStorage
    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setIsLoggedIn(true);
            setCurrentUser(username);
            fetchUser(username);
        }
    }, []);

    // Fetching user details from the DB
    const fetchUser = async (username) => {
        try {
            const response = await axios.get(`http://localhost:5001/users?username=${username}`);
            const user = response.data[0];
            setCurrentUser(user);
            setCart(user.cart || []);
            setOrders(user.orders || []);
            setWishList(user.wishlist || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Login
    const login = async (username) => {
        await fetchUser(username);
        setIsLoggedIn(true);
        localStorage.setItem("username", username);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("orderSummary");
        setIsLoggedIn(false);
        setCart([]);
        // setOrders([]);
        setCurrentUser(null);
        navigate("/");
    };

    // Logout modal
    const handleLogoutClick = () => {
        setShowConfirm(true);
    };
    const confirmLogout = () => {
        logout();
        setShowConfirm(false);
    };
    const cancelLogout = () => {
        setShowConfirm(false);
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
                filtered = products.filter(
                    (product) =>
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

    // Toast for adding item to wishlist
    const addToWishlist = async (product) => {
        const updatedWishlist = [...wishList];
        const existingItem = updatedWishlist.find((item) => item.id === product.id);
        if (!existingItem) {
            updatedWishlist.push(product);
            setWishList(updatedWishlist);
            await updateUserWishlistInDB(updatedWishlist);
        }

        if (isLoggedIn && !existingItem) {
            setToastMessage(
                <>
                    Added to your wishlist 😊 <br />
                    <span>Available under profile</span>
                </>
            );
        } else {
            setToastMessage(<>Please log in to add items to your Wishlist</>);
        }
    };

    // Close toast message after a specified time
    useEffect(() => {
        if (toastMessage) {
            setTimeout(() => {
                setToastMessage("");
            }, 2200);
        }
    }, [toastMessage]);

    // Remove items from wishlist
    const removeFromWishlist = async (productId) => {
        const updatedWishlist = wishList.filter((item) => item.id !== productId);
        setWishList(updatedWishlist);
        await updateUserWishlistInDB(updatedWishlist);
    };

    // Clear entire wishlist
    const clearWishlist = async () => {
        setWishList([]);
        await updateUserWishlistInDB([]);
    };

    // Function to update wishlist in the DB
    const updateUserWishlistInDB = async (updatedWishlist) => {
        if (currentUser) {
            try {
                await axios.patch(`http://localhost:5001/users/${currentUser.id}`, { wishlist: updatedWishlist });
            } catch (error) {
                console.error("Error updating wishlist:", error);
            }
        }
    };

    // Add items to cart
    const addToCart = async (product) => {
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate);
        deliveryDate.setDate(currentDate.getDate() + 7); // Add 7 days
        const formattedDeliveryDate = new Intl.DateTimeFormat("en-GB").format(deliveryDate); // For date format = dd-mm-yyyy
        const updatedCart = [...cart];
        const existingItem = updatedCart.find((item) => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.deliveryDate = formattedDeliveryDate; // Update the delivery date if needed
        } else {
            updatedCart.push({ ...product, quantity: 1, deliveryDate: formattedDeliveryDate }); // Add delivery date
        }

        setCart(updatedCart);
        await updateUserCartInDB(updatedCart);
    };

    // Remove item from cart
    const removeFromCart = async (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        await updateUserCartInDB(updatedCart);
    };

    // Update quantity of items in cart
    const updateQuantity = async (productId, quantity) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        setCart(updatedCart);
        await updateUserCartInDB(updatedCart);
    };

    // Function used to update cart in the DB
    const updateUserCartInDB = async (updatedCart) => {
        if (currentUser) {
            try {
                await axios.patch(`http://localhost:5001/users/${currentUser.id}`, { cart: updatedCart });
            } catch (error) {
                console.error("Error updating user cart:", error);
            }
        }
    };

    // Set order details
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const setOrderDetails = (details) => {
        const orderWithIdandDate = {
            ...details,
            id: Date.now().toString(),
            date: formattedDate,
        };
        setOrderSummary(orderWithIdandDate);
        localStorage.setItem("orderSummary", JSON.stringify(orderWithIdandDate)); // Save to localStorage
        saveOrder(orderWithIdandDate); // Passing order details into saveOrder function
        setTimeout(() => {
            clearCartAfterOrder();
        }, 3000);
    };

    // Clear cart after order completion
    const clearCartAfterOrder = async () => {
        setCart([]);
        await updateUserCartInDB([]);
    };

    //to fetch the orderSummary from localStorage
    useEffect(() => {
        const savedOrderSummary = localStorage.getItem("orderSummary");
        if (savedOrderSummary) {
            setOrderSummary(JSON.parse(savedOrderSummary));
        }
    }, []); // This effect runs only once when the component mounts

    // Save order history in DB and state for orders-history page
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

    // Fetch user orders from the database
    const fetchUserOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5001/users/${userId}`);
            setOrders(response.data.orders || []); // Update the orders state
        } catch (error) {
            console.error("Error fetching user orders:", error);
        }
    };

    // // Clear orders from the user
    // const clearOrders = async () => {
    //     if (currentUser) {
    //         try {
    //             await axios.patch(`http://localhost:5001/users/${currentUser.id}`, { orders: [] });
    //             setOrders([]); // Clear local orders state
    //         } catch (error) {
    //             console.error("Error clearing orders:", error);
    //         }
    //     }
    // };

    return (
        <ProductContext.Provider
            value={{
                currentUser,
                toastMessage,
                setToastMessage,
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
                setOrderSummary,
                setOrderDetails,
                orders,
                fetchUserOrders,
                // clearOrders,
                handleLogoutClick,
                confirmLogout,
                cancelLogout,
                showConfirm,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
