import React, { useState, useContext } from "react";
import "./homeStyle.css";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";

const Navbar = () => {
    const { setSearchTerm, products, cart, isLoggedIn, logout } = useContext(ProductContext);
    const [suggestions, setSuggestions] = useState([]); //for using the search suggestion
    const [dropdownOpen, setDropdownOpen] = useState(false); // for dropdown button in profile for logout and orders
    const navigate = useNavigate();

    //access entry to cart only when the user is loged.
    const handleCartAccess = () => {
        if (!isLoggedIn) {
            alert("Please log in to access your cart.");
        } else {
            navigate('/cart')
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

    //stoing the searching value into searchTerm
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        if (searchValue.length > 0) {
            const filteredSuggestions = products.filter((product) => product.name.toLowerCase().includes(searchValue));
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

    return (
        <nav className="navbar">
            <div className="navbar-logo">
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
                <div className="navbar-icon" onClick={handleProfileClick}>
                    <i className="bx bx-user"></i>
                    <label> {isLoggedIn ? localStorage.getItem("username") : "Profile"} </label>
                    {dropdownOpen && isLoggedIn && (
                        <div className="dropdown-menu">
                            <button className="logout-button" onClick={handleLogout}>
                                <i className="bx bx-log-out"></i>
                            </button>
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
                <div className="searchIcon"><i class='bx bx-search-alt-2'></i></div>
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
