import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isadmin = localStorage.getItem('isadmin');
    console.log(isadmin);

    
    if (isadmin !== 'true') {
      navigate('/home'); 
    } else {
      fetchOrders(); 
    }
  }, [navigate]);

  const fetchOrders = async () => {
    console.log("Sending request to fetch orders");
    try {
      const response = await axios.get('http://localhost:5000/order');
      console.log("Orders:", response.data);
      
      // Initialize aggregatedOrders first before logging it
      const aggregatedOrders = aggregateOrdersByReservation(response.data);
      console.log("Updated orders:", aggregatedOrders);
      
      setOrders(aggregatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const handleDeleteOrder = async (reservationId) => {
    try {
      console.log(`Deleting reservation and orders for reservation ID: ${reservationId}`);
      
      // Delete the orders associated with the reservation
      await axios.delete(`http://localhost:5000/order/${reservationId}`);
    
      // Delete the reservation
      await axios.delete(`http://localhost:5000/reservation/${reservationId}`);
    
      // Update the state to remove the deleted reservation
      const updatedOrders = orders.filter(order => order.id !== reservationId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  
  
  
  
  
  
  

  const aggregateOrdersByReservation = (orders) => {
    const groupedOrders = {};

    orders.forEach(order => {
      if (!groupedOrders[order.reservation.id]) {
        groupedOrders[order.reservation.id] = {
          ...order.reservation,
          meals: [order.menu.item],
        };
      } else {
        groupedOrders[order.reservation.id].meals.push(order.menu.item);
      }
    });

    return Object.values(groupedOrders);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>User</th>
              <th>Date of Reservation</th>
              <th>Table</th>
              <th>Meals Ordered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.user?.username || 'N/A'}</td>
                <td>{new Date(order.reservationDate).toLocaleDateString()}</td>
                <td>{order.table}</td>
                <td>{order.meals.join(", ")}</td>
                <td>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Order completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewOrders;
