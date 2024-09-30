import React from 'react';
import './style.css';
import { ProductContext } from './ProductContext';
import { useContext } from 'react';

const Navbar = ({ username }) => {
  const { setSearchTerm } = useContext(ProductContext);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src/assets/logo.png" alt="logo" />
      </div>
      <div className="navbar-icons">
        <div className="navbar-icon">
          <i className='bx bx-cart'></i>
          <label>Cart</label>
        </div>
        <div className="navbar-icon">
          <i className='bx bx-user'></i>
          <label>{username ? username : "Profile"}</label>
        </div>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search for products..." onChange={handleSearch}/>
      </div>
    </nav>
  );
};

export default Navbar;