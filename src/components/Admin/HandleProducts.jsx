import React, { useContext, useState } from "react";
import { AdminContext } from "../../Context/AdminContext";
import "./admin.css";

const HandleProducts = () => {
    const { addProduct, deleteProduct, editProduct, products } = useContext(AdminContext);
    const [productData, setProductData] = useState({
        id: "",
        name: "",
        price: "",
        oldPrice: "",
        image: "",
        category: "",
        seller: "",
    });
    const [viewMode, setViewMode] = useState("table");
    const [selectedCategory, setSelectedCategory] = useState("all"); // New state for selected category

    // Calculate product counts
    const totalProducts = products.length;
    const dogProducts = products.filter((product) => product.category === "dog").length;
    const catProducts = products.filter((product) => product.category === "cat").length;

    // Filter products by category (if any category selected)
    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddProduct = () => {
        if (productData.name && productData.price && productData.category && productData.seller) {
            const newProduct = {
                id: Date.now().toString(),
                name: productData.name,
                price: parseFloat(productData.price),
                oldPrice: parseFloat(productData.oldPrice) || null,
                image: productData.image,
                category: productData.category,
                seller: productData.seller,
            };
            addProduct(newProduct);
            resetForm();
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const handleEditProduct = (product) => {
        setProductData({
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            image: product.image,
            category: product.category,
            seller: product.seller,
        });
    };

    const handleSaveEdit = () => {
        if (productData.name && productData.price && productData.category && productData.seller) {
            editProduct(productData.id, {
                name: productData.name,
                price: parseFloat(productData.price),
                oldPrice: parseFloat(productData.oldPrice),
                image: productData.image,
                category: productData.category,
                seller: productData.seller,
            });
            resetForm();
        } else {
            alert("Please fill in all fields.");
        }
    };

    const resetForm = () => {
        setProductData({ id: "", name: "", price: "", oldPrice: "", image: "", category: "", seller: "" });
    };

    return (
        <div className="handle-products">
            <div className="wrapHandleProductHead">
                <h2>Handle Products</h2>
                <div className="product-form">
                    <h3>{productData.id ? "Edit Product" : "Add New Product"}</h3>
                    {/* Inputs for product data */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={productData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Product Price"
                        value={productData.price}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="oldPrice"
                        placeholder="Old Price"
                        value={productData.oldPrice}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={productData.image}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={productData.category}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="seller"
                        placeholder="Seller"
                        value={productData.seller}
                        onChange={handleInputChange}
                    />
                    <button onClick={productData.id ? handleSaveEdit : handleAddProduct} className="addEditbutton">
                        <span>{productData.id ? "Save Changes" : "Add Product"}</span>
                    </button>
                </div>
            </div>

            <div className="view-switch">
                <div className="wrapSelect">
                    <div>
                        <label>View Mode: </label>
                        <select onChange={(e) => setViewMode(e.target.value)} value={viewMode}>
                            <option value="table">Table</option>
                            <option value="cards">Cards</option>
                        </select>
                    </div>
                    {/* Category Select Dropdown */}
                    <div>
                        <label>Category: </label>
                        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                            <option value="all">All</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                        </select>
                    </div>
                </div>

                {/* Displaying product counts */}
                <div className="product-counts">
                    <span>Total Products: <strong>{totalProducts}</strong></span> |{" "}
                    <span>Dog Products: <strong>{dogProducts}</strong></span> |{" "}
                    <span>Cat Products: <strong>{catProducts}</strong></span>
                </div>
            </div>

            <div className="productsListing">
                <h2>Current Products</h2>
                {viewMode === "table" ? (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Old Price</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Seller</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>${product.oldPrice ? product.oldPrice.toFixed(2) : "N/A"}</td>
                                    <td><img src={product.image} alt={product.name} style={{ width: "50px" }} /></td>
                                    <td>{product.category}</td>
                                    <td>{product.seller}</td>
                                    <td>
                                        <button onClick={() => handleEditProduct(product)}>Edit</button>
                                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="product-cards">
                        {filteredProducts.map((product) => (
                            <div className="product-card" key={product.id}>
                                <img src={product.image} alt={product.name} />
                                <div className="product-details">
                                    <h3>{product.name}</h3>
                                    <p>Price: ${product.price.toFixed(2)}</p>
                                    <p>Old Price: ${product.oldPrice ? product.oldPrice.toFixed(2) : "N/A"}</p>
                                    <p>Category: {product.category}</p>
                                    <p>Seller: {product.seller}</p>
                                    <div className="product-actions">
                                        <button onClick={() => handleEditProduct(product)}>Edit</button>
                                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HandleProducts;