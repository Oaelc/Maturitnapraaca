import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../pages/Styles/ordermenu.css"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const Ordermenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [suma, setSuma] = useState(0);
  const [zvoleneMenus, setZvoleneMenus] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/menu');
        if (response.status === 200) {
          setMenuItems(response.data.map(item => ({ ...item, selected: false })));
        } else {
          console.log('Failed to fetch menu data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMenuData();
  }, []);

  const handleCheckboxChange = (index, itemPrice, itemId) => {
    let newSum = suma;
    let newZvoleneMenus = [...zvoleneMenus];
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].selected = !updatedMenuItems[index].selected;

    if (updatedMenuItems[index].selected) {
      newSum += itemPrice;
      newZvoleneMenus = [...newZvoleneMenus, itemId];
    } else {
      newSum -= itemPrice;
      newZvoleneMenus = newZvoleneMenus.filter(id => id !== itemId);
    }

    setSuma(newSum);
    setZvoleneMenus(newZvoleneMenus);
    localStorage.setItem('zvoleneMenus', JSON.stringify(newZvoleneMenus));
    setMenuItems(updatedMenuItems);

    console.log("Updated selected meals:", newZvoleneMenus); // Console log for debugging
  };

  return (
    <div className="container menuWindow mt-4">
      <h3 className="mb-4 text-center">Select Meals From Menu</h3>
      <div className="total-sum mb-3">
        <p className="font-weight-bold text-primary">Total: <span className="text-success">{suma.toFixed(2)}$</span></p>
      </div>
      <ul className="list-group">
        {menuItems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{item.item}</h5>
              <p className="mb-0">Price: <span className="font-weight-bold">{item.price}$</span></p>
              <small>{item.description}</small>
            </div>
            <div>
              {item.selected ? (
                <button
                  className="btn btn-danger"
                  onClick={() => handleCheckboxChange(index, item.price, item.id)}
                >
                  Delete
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => handleCheckboxChange(index, item.price, item.id)}
                >
                  Add
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ordermenu;
