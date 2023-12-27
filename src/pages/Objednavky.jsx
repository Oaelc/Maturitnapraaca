  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import '../components/Objednavky.css';

  const Objednávky = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      // Fetch orders from the backend
      axios.get('http://localhost:5000/objednavky')
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error("Error fetching orders:", error);
        });
    }, []);

    return (
      <div className="orders-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Table</th>
              <th>Meals</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.userName}</td>
                  <td>{new Date(order.reservationDate).toLocaleDateString()}</td>
                  <td>{order.tableNumber}</td>
                  <td>{order.meals.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  export default Objednávky;
