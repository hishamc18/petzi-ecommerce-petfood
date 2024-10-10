// import React, { useContext } from 'react';
// import { AdminContext } from '../../Context/AdminContext';
// import './admin.css';

// function Dashboard() {

//   const { totalUsers, totalOrders, totalRevenue, products } = useContext(AdminContext)

//       // Calculate product counts
//       const totalProducts = products.length;
//       const dogProducts = products.filter((product) => product.category === "dog").length;
//       const catProducts = products.filter((product) => product.category === "cat").length;

//   return (
//     <div className="dashboard-container">
//       <h1>Dashboard</h1>
//       <div className="dashboardCard-container">
//       <div className="dashcard">
//         <div className="dashCardcontent">
//           <h3>Total Users</h3>
//           <p>{totalUsers}</p>
//           </div>
//         </div>
//         <div className="dashcard">
//         <div className="dashCardcontent">
//         <h3>Total Orders</h3>
//         <p>{totalOrders}</p>
//       </div>
//       </div>
//       <div className="dashcard">
//       <div className="dashCardcontent">
//           <h3>Total Revenue</h3>
//           <p>₹{totalRevenue.toFixed(2)}</p>
//         </div>
//         </div>
//         <div className="dashcard">
//                         <div className="dashCardcontent">
//                             <h3 className="Cardheading">Product Overview</h3>
//                             <p>
//                                 <strong>Total Products: </strong>
//                                 {totalProducts}
//                             </p>
//                             <p>
//                                 <strong>Cat Products: </strong>
//                                 {catProducts}
//                             </p>
//                             <p>
//                                 <strong>Dog Products: </strong>
//                                 {dogProducts}
//                             </p>
//                         </div>
//                     </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




import React, { useContext } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import './admin.css';

function Dashboard() {
  const { totalUsers, totalOrders, totalRevenue, products } = useContext(AdminContext);

  // Calculate product counts
  const totalProducts = products.length;
  const dogProducts = products.filter((product) => product.category === 'dog').length;
  const catProducts = products.filter((product) => product.category === 'cat').length;

  return (
    <div className="admin-dashboard-container">
      <h1>Dashboard</h1>
      <div className="admin-dashboardCard-container">
        <div className="admin-dashcard">
          <div className="admin-bg"></div>
          <div className="admin-blob"></div>
          <div className="admin-dashCardcontent">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
        </div>

        <div className="admin-dashcard">
          <div className="admin-bg"></div>
          <div className="admin-blob"></div>
          <div className="admin-dashCardcontent">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
        </div>

        <div className="admin-dashcard">
          <div className="admin-bg"></div>
          <div className="admin-blob"></div>
          <div className="admin-dashCardcontent">
            <h3>Total Revenue</h3>
            <p>₹{totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="admin-dashcard">
          <div className="admin-bg"></div>
          <div className="admin-blob"></div>
          <div className="admin-dashCardcontent">
            <h3 className="Cardheading">Product Overview</h3>
            <p>
              <strong>Total Products: </strong>
              {totalProducts}
            </p>
            <p>
              <strong>Cat Products: </strong>
              {catProducts}
            </p>
            <p>
              <strong>Dog Products: </strong>
              {dogProducts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;