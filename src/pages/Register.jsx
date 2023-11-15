import React, { useState } from 'react';
import Navbar from "../components/navbar"
import axios from "axios";
import "./Styles/styles.css"
import { useNavigate } from 'react-router-dom';



export default function Register(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  async function handleRegister(){
    await axios.post("http://localhost:5000/api/register", {
      username:username, password:password
    }).then(navigate("../login"))
  }

console.log(username,password)
  return (
    <div style={{display:"flex"}}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
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
      <div>
        <button onClick={handleRegister}type="submit">Register</button>
      </div>
      </div>
  );
};