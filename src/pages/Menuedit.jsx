import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/styles.css';

const Menuedit = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isadmin = localStorage.getItem('isadmin');
    if (isadmin !== 'true') {
      navigate('/home');
    }
  }, [navigate]);

  return <Menu isadmin={localStorage.getItem('isadmin')} />;
};

const Menu = ({ isadmin }) => {
  const navigate = useNavigate(); // Define navigate here
  const [menuData, setMenuData] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', price: '', description: '' });

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch('http://localhost:5000/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const handleAddItem = async () => {
    try {
      const priceFloat = parseFloat(newItem.price);
      if (isNaN(priceFloat)) {
        console.error('Invalid price format');
        return;
      }

      const response = await fetch('http://localhost:5000/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newItem, price: priceFloat }),
      });

      if (response.ok) {
        setNewItem({ item: '', price: '', description: '' });
        fetchMenuData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/menu/${itemId}`, { method: 'DELETE' });
      if (response.ok) {
        fetchMenuData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Menu Management</h2>
      {isadmin === 'true' && (
        <button className="btn btn-primary mb-3" onClick={() => navigate('/Dailymenuedit')}>
          Daily Menu
        </button>
      )}
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group mb-3">
              <label htmlFor="item-name">Item Name:</label>
              <input
                type="text"
                className="form-control"
                id="item-name"
                name="item"
                value={newItem.item}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="item-price">Price:</label>
              <input
                type="text"
                className="form-control"
                id="item-price"
                name="price"
                value={newItem.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="item-description">Description:</label>
              <input
                type="text"
                className="form-control"
                id="item-description"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" className="btn btn-success" onClick={handleAddItem}>
              Add Item
            </button>
          </form>
        </div>
      </div>
      <div className="list-group mt-4">
        {menuData.map((item, index) => (
          <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{item.item}</h5>
              <p className="mb-1">{item.price}$</p>
              <small>{item.description}</small>
            </div>
            <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menuedit;
