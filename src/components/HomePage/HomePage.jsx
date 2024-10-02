// HomePage.jsx
import React, { useEffect, useState } from 'react';
import './style.css';
import HeroSection from './HeroSection';
import Navbar from './Navbar';
import Products from './Products';
import Category from './Category';
import Caption from './Caption';

function HomePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve username from localStorage when the component mounts
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="homePage">
      <Navbar username={username} />
      <Caption />
      <HeroSection />
      <Category />
      <Products />
    </div>
  );
}

export default HomePage;