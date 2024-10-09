import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';

const ProtectedAdmin = ({ children }) => {
    const { isAdmin } = useContext(AdminContext);

    if (isAdmin === null) {
        // Optional: Show a loading state until the admin status is fully loaded
        return <div>Loading...</div>;
    }

    return isAdmin ? children : <Navigate to="/login" />;
};

export default ProtectedAdmin;