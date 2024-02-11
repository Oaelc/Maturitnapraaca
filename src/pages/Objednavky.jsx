import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../pages/Styles/Objednavky.css';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isadmin = localStorage.getItem('isadmin');
    if (isadmin !== 'true') {
      navigate('/home'); 
    } else {
      fetchOrders(); 
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/order');
      const aggregatedOrders = aggregateOrdersByReservation(response.data);
      setOrders(aggregatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const handleDeleteOrder = async (reservationId) => {
    console.log("Deleting reservation with ID:", reservationId);
    try {
        await axios.delete(`http://localhost:5000/reservation/reservation/${reservationId}`);
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
          meals: [order.menu.item.trim()], // Trim whitespace from the meal item
        };
      } else {
        const meal = order.menu.item.trim(); // Trim whitespace from the meal item
        if (meal) { // Only add the meal if it's not an empty string
          groupedOrders[order.reservation.id].meals.push(meal);
        }
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
              <tr key={order.id} className="order-row">
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
