import React, { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { ProductContext } from "../context/ProductContext";

const Wishlist = () => {
    const { wishList, removeFromWishlist, clearWishlist } = useContext(ProductContext);

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h2>Wishlist</h2>
                <button className="clear-btn" onClick={clearWishlist}>
                    Clear Wishlist
                </button>
            </div>
            {wishList.length === 0 ? (
                <p className="empty-wishlist">Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-items">
                    {wishList.map((item) => (
                        <div className="wishlist-card" key={item.id}>
                            <img className="wishlist-image" src={item.image} alt={item.name} />
                            <div className="wishlist-info">
                                <h3>{item.name}</h3>
                                <p className="wishlist-price">${item.price}</p>
                                <div className="cart-actions">
                                    <div onClick={()=>(removeFromWishlist(item.id))} className="del">
                                        <div>
                                            <MdDeleteForever />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
