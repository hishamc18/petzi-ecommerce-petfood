import React, { useContext } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import './admin.css';
import HandleProducts from './HandleProducts';
import Dashboard from './Dashboard';
import UserDetails from './UserDetails';

const AdminHome = () => {
    const { activeMenu, handleMenuClick, adminLogout } = useContext(AdminContext);

    return (
        <div className="admin-homepage">
            <nav className="adminNavbar">
                <h1>Admin Panel</h1>
                <button onClick={adminLogout}>Logout</button>  {/* Logout button */}
            </nav>

<div className="adminContainer">
                <div className="adminMenubar">
                    <ul>
                        <li 
                            className={activeMenu === 'Dashboard' ? 'active' : ''}
                            onClick={() => handleMenuClick('Dashboard')}
                        >
                            Dashboard
                        </li>
                        <li 
                            className={activeMenu === 'HandleProducts' ? 'active' : ''}
                            onClick={() => handleMenuClick('HandleProducts')}
                        >
                            Handle Products
                        </li>
                        <li 
                            className={activeMenu === 'UserDetails' ? 'active' : ''}
                            onClick={() => handleMenuClick('UserDetails')}
                        >
                            User Details
                        </li>
                    </ul>
                </div>
                <div className="adminContent">
                    {activeMenu === 'Dashboard' && <Dashboard />}
                    {activeMenu === 'HandleProducts' && <HandleProducts />}
                    {activeMenu === 'UserDetails' && <UserDetails />}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;