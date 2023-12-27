// Profile.js
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
      <div className="profile-page"> {/* Updated class name */}
      <div className="profile-content bg-light p-4 rounded shadow">
        <h2 className="mb-4">Profile Page</h2>
        <p>Username: {user.username}</p>
        <p>Points: {user.points}</p>
        <p>User ID: {user.id}</p>
        <p>Admin: {user.isadmin ? 'Yes' : 'No'}</p>
        {user.username === undefined && <div className="alert alert-warning">You forgot to turn on the backend</div>}
        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
      </div>
    </div>
    </div>
  );
}
