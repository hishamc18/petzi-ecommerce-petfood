import React, { useContext } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import UserDetailsModal from './UserDetailsModal'


const UserDetails = () => {
    const {
        users,
        selectedUser,
        handleUserClick,
        closeModal,
        isModalOpen,
        blockUser
    } = useContext(AdminContext);

    // Helper function to calculate total spent by a user
    const calculateTotalSpent = (orders) => {
        return orders.reduce((total, order) => total + order.totalAmount, 0);
    };



    return (
        <div className="admin-user-details">
            <h2>Manage Users</h2>
            <div className="admin-user-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.slice(0, 5).map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleUserClick(user)}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedUser && (
                <UserDetailsModal onClose={closeModal}>
                    <div className="admin-modal-content">
                        <div className="userDetailsInModal">
                          <div className='userDetailsData'>
                            <p><strong>Name:</strong> {selectedUser.username}</p>
                            <p><strong>ID:</strong> {selectedUser.id}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                          </div>
                          <div className='adminBlockBtnDiv'><button onClick={() => blockUser(selectedUser.id)}>
  {selectedUser.isBlocked ? 'Unblock' : 'Block'}
</button></div>
                        </div>

                        <div className="wrapTablesInUserDetails">
                          <div>
                            <h4>Cart Details</h4>
                            <table className="admin-cart-details">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.cart.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{item.price.toFixed()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                          </div>
                          <div>
                            <h4>Order Details</h4>
                            <table className="admin-order-details">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Total Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.orders.slice().reverse().map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>₹{order.totalAmount.toFixed()}</td>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <div className="admin-user-summary">
                              <div className="admin-summary-card">
                                  <h4>Total Orders</h4>
                                  <p>{selectedUser.orders.length}</p>
                              </div>
                              <div className="admin-summary-card">
                                  <h4>Total Spent</h4>
                                  <p>₹{calculateTotalSpent(selectedUser.orders).toFixed()}</p>
                              </div>
                          </div>
                        </div>
                    </div>
                </UserDetailsModal>
            )}
        </div>
    );
};

export default UserDetails;