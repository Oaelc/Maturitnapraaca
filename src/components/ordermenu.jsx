import React, { useState, useEffect } from "react";
import axios from "axios";

const Ordermenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu'); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        } else {
          console.log('Failed to fetch menu data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMenuData();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].selected = !updatedMenuItems[index].selected;
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className="menuWindow">
      <h3>Menu Items</h3>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <div className="mealItem">
              <div>
                <div className="menuitem">{item.item}</div>
                <div className="menuitem">{item.price}</div>
                <div className="menuitem">{item.description}</div>
              </div>
              <div className="checkboxContainer">
                <input
                  type="checkbox"
                  checked={item.selected || false}
                  onChange={() => handleCheckboxChange(index)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ordermenu;
