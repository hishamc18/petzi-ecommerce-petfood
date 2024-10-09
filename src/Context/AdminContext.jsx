// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const AdminContext = createContext();

// export const AdminProvider = ({ children }) => {
//     const [isAdmin, setIsAdmin] = useState(null);
//     const [activeMenu, setActiveMenu] = useState('Dashboard');
//     const [products, setProducts] = useState([]); // State to hold products
//     const navigate = useNavigate();

//     useEffect(() => {
//         const adminSession = sessionStorage.getItem('isAdmin');
//         if (adminSession === 'true') {
//             setIsAdmin(true);
//             fetchProducts(); // Fetch products on admin login
//         } else {
//             setIsAdmin(false);
//         }
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const response = await axios.get('http://localhost:5001/products'); // Adjust URL as needed
//             console.log(response, "hello hisham");
//             setProducts(response.data);
//         } catch (error) {
//             console.error('Failed to fetch products:', error);
//         }
//     };

//     const adminLogin = () => {
//         setIsAdmin(true);
//         sessionStorage.setItem('isAdmin', 'true');
//         navigate('/admin');
//     };

//     const adminLogout = () => {
//         setIsAdmin(false);
//         sessionStorage.removeItem('isAdmin');
//         navigate('/login');
//     };

//     const handleMenuClick = (menu) => {
//         setActiveMenu(menu);
//     };

//     const addProduct = async (newProduct) => {
//         try {
//             const response = await axios.post('http://localhost:5001/products', newProduct);
//             setProducts([...products, response.data]); // Update state with the new product
//             console.log('Product added:', response.data);
//         } catch (error) {
//             console.error('Failed to add product:', error);
//         }
//     };

//     const deleteProduct = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5001/products/${id}`);
//             setProducts(products.filter(product => product.id !== id)); // Remove from state
//             console.log('Product deleted:', id);
//         } catch (error) {
//             console.error('Failed to delete product:', error);
//         }
//     };

//     const editProduct = async (id, updatedProduct) => {
//         try {
//             const response = await axios.put(`http://localhost:5001/products/${id}`, updatedProduct);
//             setProducts(products.map(product => (product.id === id ? response.data : product))); // Update product in state
//             console.log('Product updated:', response.data);
//         } catch (error) {
//             console.error('Failed to edit product:', error);
//         }
//     };

//     if (isAdmin === null) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <AdminContext.Provider value={{
//             isAdmin,
//             adminLogin,
//             adminLogout,
//             activeMenu,
//             handleMenuClick,
//             products,
//             addProduct,
//             deleteProduct,
//             editProduct,
//         }}>
//             {children}
//         </AdminContext.Provider>
//     );
// };






import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const adminSession = sessionStorage.getItem('isAdmin');
        if (adminSession === 'true') {
            setIsAdmin(true);
            fetchProducts(); // Fetch products on admin login
        } else {
            setIsAdmin(false);
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5001/products'); 
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const adminLogin = () => {
        setIsAdmin(true);
        sessionStorage.setItem('isAdmin', 'true');
        navigate('/admin');
    };

    const adminLogout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem('isAdmin');
        navigate('/login');
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const addProduct = async (newProduct) => {
        try {
            const response = await axios.post('http://localhost:5001/products', newProduct);
            setProducts([...products, response.data]); // Update state with the new product
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/products/${id}`);
            setProducts(products.filter(product => product.id !== id)); // Remove from state
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const editProduct = async (id, updatedProduct) => {
        try {
            const response = await axios.put(`http://localhost:5001/products/${id}`, updatedProduct);
            setProducts(products.map(product => (product.id === id ? response.data : product))); // Update product in state
        } catch (error) {
            console.error('Failed to edit product:', error);
        }
    };

    if (isAdmin === null) {
        return <div>Loading...</div>;
    }

    return (
        <AdminContext.Provider value={{
            isAdmin,
            adminLogin,
            adminLogout,
            activeMenu,
            handleMenuClick,
            products,
            addProduct,
            deleteProduct,
            editProduct,
        }}>
            {children}
        </AdminContext.Provider>
    );
};