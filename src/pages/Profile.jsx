// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import '../components/profile.css'; // Ensure the correct path to your CSS file

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('../login');
    }
  }, [navigate]);

  async function handleLogout() {
    try {
      await axios.post('http://localhost:5000/api/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem("isadmin");
      navigate('../login');
    } catch (error) {
      alert(error.response.data.message || 'An error occurred during logout');
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const username = JSON.parse(localStorage.getItem("username"));
      try {
        const response = await axios.post('http://localhost:5000/api/user', { username });
        setUser(response.data.user);
      } catch (error) {
        alert('An error occurred while fetching user data');
      }
    };

    getUser();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <span className="user-info">{user.username}</span>
        <span className="user-info">{user.points}</span>
        <span className="user-info">{user.id}</span>
        <span className="user-info">{user.isadmin ? 'Yes' : 'No'}</span>
      </div>
      <button onClick={handleLogout} className="btn btn-primary logout-button">Logout</button>
      {user.username === undefined && (
        <div className="alert alert-warning">You forgot to turn on the backend</div>
      )}
    </div>
  );
}