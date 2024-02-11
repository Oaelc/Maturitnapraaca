import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Ensure you have date-fns installed for date formatting
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Styles/profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [greeting, setGreeting] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const [todaysMenu, setTodaysMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('../login');
    }
  }, [navigate]);

  useEffect(() => {
    const getUser = async () => {
      const username = JSON.parse(localStorage.getItem("username"));
      try {
        const response = await axios.post('http://localhost:5000/api/user', { username });
        setUser(response.data.user);
        fetchOrderHistory(response.data.user.id);
      } catch (error) {
        alert('An error occurred while fetching user data');
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const determineGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        setGreeting('Good Morning');
      } else if (hours < 18) {
        setGreeting('Good Afternoon');
      } else if (hours < 22) {
        setGreeting('Good Evening');
      } else {
        setGreeting('Good Night');
      }
    };

    determineGreeting();
  }, []);

  const fetchOrderHistory = async (userId) => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}/order-history`);
      setOrderHistory(response.data.orderHistory || []);
    } catch (error) {
      alert('An error occurred while fetching order history');
      setOrderHistory([]);
    }
    setIsLoading(false); // End loading
  };

  const getDayOfWeek = () => {
    // Uncomment the line below to get the actual day of week
    // return format(new Date(), 'EEEE');
    return 'Monday'; // for testing, we force it to always be 'Monday'
  };
  
  // Then use this function instead of format(new Date(), 'EEEE')
  const fetchTodaysMenu = async () => {
    const dayOfWeek = getDayOfWeek(); // This will now always be 'Monday'
    try {
      const response = await axios.get(`http://localhost:5000/api/dailymenu/${dayOfWeek}`);
      setTodaysMenu(response.data);
    } catch (error) {
      console.error('Error fetching today\'s menu:', error);
    }
  };

  async function handleLogout() {
    try {
      await axios.post('http://localhost:5000/api/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem("isadmin");
      navigate('../login');
    } catch (error) {
      alert('An error occurred during logout');
    }
  }

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="card welcome-card">
        <h1 className="card-header">{greeting}, {user.username}</h1>
      </div>
      <div className="card todays-menu-card">
        <h2 className="card-header">Today's Menu</h2>
        <div className="card-body">
          {todaysMenu.length > 0 ? (
            todaysMenu.map((menu, index) => (
              <div key={index} className="menu-item">
                <h4>{menu.item}</h4>
                <p>{menu.description}</p>
                <p>Price: ${menu.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>There are no items on today's menu.</p>
          )}
        </div>
      </div>
      <div className="card order-history-card">
        <h2 className="card-header">Order History</h2>
        <div className="card-body">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            orderHistory.map((reservation) => (
              <div key={reservation.id} className="reservation-history">
                <h4>Reservation Date: {new Date(reservation.reservationDate).toLocaleString()}</h4>
                {reservation.orders.map((order) => (
                  <div key={order.id} className="order-details">
                    <p>Menu Item: {order.menu.item}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Price: ${order.menu.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
      {orderHistory.length === 0 && (
        <div className="empty-state">
          <i className="fa fa-history fa-2x"></i>
          <p>No order history available.</p>
        </div>
      )}
      <button onClick={handleLogout} className="btn btn-primary logout-button">
        Logout
      </button>
    </div>
  );
}
