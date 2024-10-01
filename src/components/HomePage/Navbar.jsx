import React, { useState, useContext } from 'react';
import './style.css';
import { ProductContext } from '../Context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setSearchTerm, products, cart, isLoggedIn, logout } = useContext(ProductContext);
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartAccess = () => {
    if (!isLoggedIn) {
      alert("Please log in to access your cart.");
    } else {
      handleCartClick();
    }
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      toggleDropdown();
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue.length > 0) {
      const filteredSuggestions = products.filter(product => 
        product.name.toLowerCase().includes(searchValue)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name.toLowerCase());
    setSuggestions([]); // Clear suggestions once an item is clicked
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src/assets/logo/logo.png" alt="logo" />
      </div>
      <div className="navbar-icons">
        {/* Cart icon */}
        <div className="navbar-iconCart" onClick={handleCartAccess}>
          <div className="cartlogoname">
            <i className='bx bx-cart'></i>
            <label>Cart</label>
          </div>
          <div className="count">{cart.length > 0 && <span className="cart-badge">{cart.length}</span>}</div>
        </div>
        {/* Profile icon */}
        <div className="navbar-icon" onClick={handleProfileClick}>
          <i className='bx bx-user'></i>
          <label> {isLoggedIn ? localStorage.getItem('username') : "Profile"} </label>
          {dropdownOpen && isLoggedIn && (
            <div className="dropdown-menu">
              <button className="logout-button" onClick={handleLogout}>
                <i className='bx bx-log-out'></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Search for products..." 
          onChange={handleSearch}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion.id} 
                onClick={() => handleSuggestionClick(suggestion)}
              >
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