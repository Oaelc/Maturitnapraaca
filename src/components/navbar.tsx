import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../pages/authContext'; // Import useAuth from authContext
import './navbar.css';

const Navbar: React.FC = () => {
  const { user } = useAuth(); // Use useAuth to access user data
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      // If logged in, navigate to the profile page
      navigate('/profile');
    } else {
      // If not logged in, navigate to the login page
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/">
          <h2 className="navbar-title">Restaurant Name</h2>
        </Link>
        <div
          onClick={handleProfileClick}
          className="navbar-link"
        >
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <span className="menu-text">Profile</span>
        </div>
        <Link to="/Dailymenu" className="navbar-link">
          Daily Menu
        </Link>
        <Link to="/Menu" className="navbar-link">
          Menu
        </Link>
        <Link to="/reservation" className="navbar-link">
          Reservations
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
