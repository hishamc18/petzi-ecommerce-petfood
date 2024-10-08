import React, { useState } from 'react';
// Import the components for each menu option
import Dashboard from './Dashboard'; // Example dashboard component
import HandleProducts from './HandleProducts'; // Example handle products component
import UserDetails from './UserDetails'; // Example user details component

const AdminHomePage = () => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    // Function to render the selected menu component
    const renderContent = () => {
        switch (activeMenu) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Handle Products':
                return <HandleProducts />;
            case 'User Details':
                return <UserDetails />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="admin-homepage">
            <nav className="navbar">
                <h1>Admin Panel</h1>
            </nav>
            <div className="container">
                <div className="menubar">
                    <ul>
                        <li onClick={() => handleMenuClick('Dashboard')}>
                            Dashboard
                        </li>
                        <li onClick={() => handleMenuClick('Handle Products')}>
                            Handle Products
                        </li>
                        <li onClick={() => handleMenuClick('User Details')}>
                            User Details
                        </li>
                    </ul>
                </div>
                <div className="content">
                    {renderContent()} {/* Render the component for the active menu */}
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;