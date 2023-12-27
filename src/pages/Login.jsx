// Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleLoginSubmit() {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: username,
        password: password,
      });

      // Save the authentication token in localStorage
      console.log(response.data.user_id);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem('username', JSON.stringify(username));
      localStorage.setItem('isadmin', response.data.isadmin);
      console.log(localStorage.getItem("isadmin"))
      console.log("Login Response:", response);

     
      navigate('../profile');
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  useEffect(() => {
    // Check if the user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('../profile');
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  
  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Login</h2>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleLoginSubmit} type="submit">
          Login
        </button>
        <Link to="../register">Register</Link>
      </div>
    </div>
  );
}
