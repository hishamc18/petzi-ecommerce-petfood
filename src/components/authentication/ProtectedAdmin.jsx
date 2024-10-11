import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';

const ProtectedAdmin = ({ children }) => {
    const { isAdmin } = useContext(AdminContext);
    // if (isAdmin === null) {
    
    //     return <div>Loading...</div>;
    // }

    return isAdmin ? children : <Navigate to="/login" />;
};

export default ProtectedAdmin;