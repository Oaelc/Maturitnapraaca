import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';  // Make sure this import is complete
import { useAuth } from '../pages/authContext'; // Import useAuth from authContext
import '../pages/Styles/navbar.css';



const Navbar= () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };
  console.log(user)
  const isadmin = localStorage.getItem('isadmin');

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/"  className="navbar-title">
        Vrbový Prístav
        </Link>
        <div onClick={handleProfileClick} className="navbar-link">
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
        {isadmin === 'true' && (
          <Link to="/Menuedit" className="navbar-link">
            Menuedit
          </Link>
          
        )}
        {isadmin === 'true' && (
          <Link to="/Orders" className="navbar-link">
            Orders
          </Link>
          
        )}
      </div>
    </nav>
  );
};

export default Navbar;

