// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user,setUser] = useState("")

  useEffect(() => {
    // Check if the user is not authenticated
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('../login');
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  async function handleLogout() {
    try {
      await axios.post('http://localhost:5000/api/logout');
      // Clear the authentication token from localStorage
      localStorage.removeItem('authToken');
      navigate('../login');
    } catch (error) {
      alert(error.response.data.message || 'An error occurred during logout');
    }
  }

  const getUser = async () => {
    const username = JSON.parse(localStorage.getItem("username"))
    try {
      axios.post('http://localhost:5000/api/user', {
        username: username,
      }).then((res,req) => {setUser(res.data.user)})
    } catch (error) {
      alert('An error occurred during logout');
    }
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Profile Page</h2>
        {user.username}
        {user.password}
        {user.points}
        {user.id}
        {user.username === undefined && "zabudol si zapnut backend"}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
