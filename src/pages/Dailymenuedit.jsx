import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/dailymenu.css'; // Make sure the CSS file is correctly imported

const Dailymenuedit = () => {
  const navigate = useNavigate();
  const [editedMenu, setEditedMenu] = useState({ item: '', price: 0, description: '', day: 'Monday' });
  const [menuItems, setMenuItems] = useState([]);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    const isadmin = localStorage.getItem('isadmin');
    if (isadmin !== 'true') {
      navigate('/home');
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
    <div className="container mt-4">
      <h2>Edit Daily Menu</h2>
      <div className="menu-controls">
        {/* Buttons for other controls can go here if needed */}
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <form>
            <div className="form-group mb-3">
              <label htmlFor="item">Item:</label>
              <input type="text" className="form-control" name="item" value={editedMenu.item} onChange={handleInputChange} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="price">Price:</label>
              <input type="number" className="form-control" name="price" value={editedMenu.price} onChange={handleInputChange} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description:</label>
              <textarea className="form-control" name="description" value={editedMenu.description} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="day">Day:</label>
              <select className="form-control" name="day" value={editedMenu.day} onChange={handleDayChange}>
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="card menu-list">
        <div className="card-header">
          <h3>Current Menu</h3>
        </div>
        <ul className="list-group list-group-flush">
          {menuItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {item.item} - {item.price}$ - {item.description}
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dailymenuedit;
