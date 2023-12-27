import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/styles.css';

const Menuedit = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isadmin = localStorage.getItem('isadmin');
    console.log(isadmin);

    // Check if isadmin is null or undefined
    if (isadmin === null || isadmin === undefined || isadmin === 'false') {
      navigate('../home');
    }
  }, [navigate]);

  return (
    <div>
      {/* Pass the isadmin value as a prop to the Menu component */}
      <Menu isadmin={localStorage.getItem('isadmin')} />
    </div>
  );
};

const Menu = ({ isadmin }) => {
  const [menuData, setMenuData] = useState([]);
  const [newItem, setNewItem] = useState({
    item: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch('http://localhost:5000/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuData(data);
      } else {
        console.log('Failed to fetch menu data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleAddItem = async () => {
    try {
      // Convert the price to a floating-point number
      const priceFloat = parseFloat(newItem.price);

      // Check if the conversion was successful
      if (isNaN(priceFloat)) {
        console.error('Invalid price format');
        return;
      }

      const response = await fetch('http://localhost:5000/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newItem,
          price: priceFloat, // Use the converted price value
        }),
      });

      console.log('Response:', response);

      if (response.ok) {
        console.log('Menu item added successfully');
        // Clear the form fields after a successful addition
        setNewItem({
          item: '',
          price: '',
          description: '',
        });
        // You may choose to refetch the menu data after adding a new item
        fetchMenuData();
      } else {
        console.log('Failed to add a menu item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      console.log('Deleting item with ID:', itemId);
  
      const response = await fetch(`http://localhost:5000/menu/${itemId}`, {
        method: 'DELETE',
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        console.log('Menu item deleted successfully');
        // You may choose to refetch the menu data after deleting an item
        fetchMenuData();
      } else {
        console.log('Failed to delete a menu item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="dmenu">
      <main className="menucontent">
        <div>
          <h2>Menu</h2>

          {/* Form for adding a new menu item */}
          {isadmin === 'true' && (
            <Link to="/Dailymenuedit">
                DailyMenuEdit
            </Link>
          )}
          <form>
            <label>
              Item Name:
              <input
                type="text"
                name="item"
                value={newItem.item}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={newItem.price}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleAddItem}>
              Add Item
            </button>
          </form>

          {/* Display existing menu items */}
          {menuData.map((item, index) => (
            <div key={index}>
              <ul>
                <div className="menuitem">{item.item}</div>
                <div className="menuitem">{item.price}$</div>
                <div className="menuitem">{item.description}</div>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Menuedit;
