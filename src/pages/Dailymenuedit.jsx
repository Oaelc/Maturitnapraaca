import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import './Styles/styles.css';
import axios from 'axios';

const Dailymenuedit = () => {
  const navigate = useNavigate();
  const [editedMenu, setEditedMenu] = useState({ item: '', price: 0, description: '', day: 'Monday' });
  const [menuItems, setMenuItems] = useState([]);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    const isadmin = localStorage.getItem('isadmin');
    if (isadmin === null || isadmin === undefined || isadmin === 'false') {
      navigate('../home');
    } else {
      fetchMenu();
    }
  }, [navigate]);

  const fetchMenu = () => {
    axios
      .get(`http://localhost:5000/api/dailymenu`)
      .then((res) => setMenuItems(res.data))
      .catch((error) => console.error('Error fetching menu:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMenu({ ...editedMenu, [name]: value });
  };

  const handleDayChange = (e) => {
    setEditedMenu({ ...editedMenu, day: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/api/dailymenu/${editedMenu.day}`, editedMenu)
      .then((res) => {
        console.log('Menu item added successfully');
        fetchMenu();
      })
      .catch((error) => console.error('Error adding menu item:', error));
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/dailymenu/${itemId}`)
      .then((res) => {
        console.log('Item deleted:', itemId);
        setMenuItems(menuItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  return (
    <div className="dailymenuedit">
      <header>
        {/* Your Navbar component */}
      </header>
      <main>
        <h2>Edit Daily Menu</h2>
        <div>
          <div>
            <label htmlFor="item">Item:</label>
            <input type="text" name="item" value={editedMenu.item} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" name="price" value={editedMenu.price} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea name="description" value={editedMenu.description} onChange={handleInputChange}></textarea>
          </div>
          <div>
            <label htmlFor="day">Day:</label>
            <select name="day" value={editedMenu.day} onChange={handleDayChange}>
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <div>
          <h3>Current Menu</h3>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.item} - {item.price} - {item.description}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dailymenuedit;
