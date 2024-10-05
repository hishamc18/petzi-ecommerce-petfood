import React, { useState, useContext, useRef, useEffect } from "react";
import "./homeStyle.css";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { TbJewishStar } from "react-icons/tb";

const Navbar = () => {
    const { setSearchTerm, products, cart, isLoggedIn, logout } = useContext(ProductContext);
    const [suggestions, setSuggestions] = useState([]); //for using the search suggestion
    const [dropdownOpen, setDropdownOpen] = useState(false); // for dropdown button in profile for logout and orders
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    //access entry to cart only when the user is loged.
    const handleCartAccess = () => {
        if (!isLoggedIn) {
            alert("Please log in to access your cart.");
        } else {
            navigate('/cart')
            setSearchTerm('')
        }
    };

    //when clicking profile, navigate to login page if user not loged else show option for logout
    const handleProfileClick = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            toggleDropdown();
        }
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
    
        if (searchValue.length > 0) {
            const filteredSuggestions = products.filter((product) =>
                product.name.toLowerCase().includes(searchValue) || 
                product.category.toLowerCase().includes(searchValue) // Search by both product name and category
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };


    //for clicking the searched product from the suggestion list
    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name.toLowerCase());
        setSuggestions([]); // used to remove suggestion list, once a product is cliciked
    };

    // for logout fn()
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // for toggle conditon to active the dropdown only when user is logined.
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false); // Close dropdown if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const refresh = () =>{
        window.location.reload()
    }

    return (
        <nav className="navbar">
            <div onClick={refresh} className="navbar-logo">
                <img src="src/assets/logo/logo1.png" alt="logo" />
            </div>
            <div className="navbar-icons">
                <div onClick={()=>{navigate('orders')}} className="navbar-iconCart orders orders1">
                <TbTruckDelivery className="orderIcon"/>
                <label>Orders</label>
                </div>
                {/* Cart icon */}
                <div className="navbar-iconCart" onClick={handleCartAccess}>
                    <div className="cartlogoname">
                        <i className="bx bx-cart"></i>
                        <label>Cart</label>
                    </div>
                    <div className="count">{cart.length > 0 && <span className="cart-badge">{cart.length}</span>}</div>
                </div>
                {/* Profile icon */}
                <div className="navbar-icon" onClick={handleProfileClick} ref={dropdownRef}>
                    <i className="bx bx-user"></i>
                    <label> {isLoggedIn ? localStorage.getItem("username") : "Login"} </label>
                    {dropdownOpen && isLoggedIn && (
                        <div className="dropdown-menu">
                            <div className="wrapDropDownIcons">
                                <button className="logout" onClick={handleLogout}>
                                    <i className="bx bx-log-out"></i>
                                    <span className="logoutText">Logout</span>
                                </button>
                                <button className="logout-button" onClick={()=>{navigate('/wishlist')}}>
                                    <TbJewishStar className="wishIcon" />
                                    <span className="wishListText">Wishlist</span>
                                </button>
                            </div>
                            <div onClick={()=>{navigate('orders')}} className="navbar-iconCart orders">
                <TbTruckDelivery className="orderIcon"/>
                <label>Orders</label>
                </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="navbar-search">
                <input type="text" placeholder="Search for products..." onChange={handleSearch}></input>
                <div className="searchIcon"><i className='bx bx-search-alt-2'></i></div>
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => (
                            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </nav>
    );
};

export default Navbar;
