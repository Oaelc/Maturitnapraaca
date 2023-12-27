import React, { useState, useEffect } from "react";
import axios from "axios";

const Ordermenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [suma, setSuma] = useState(0);
  const [zvoleneMenus, setZvoleneMenus] = useState([]);

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

  const handleCheckboxChange = (index, itemPrice, itemId) => {
    let updatedMenuItems = [...menuItems];
    
    updatedMenuItems[index].selected = !updatedMenuItems[index].selected;
    const roundedPrice = +itemPrice.toFixed(2); // Change '2' to the desired number of decimal places

    if (updatedMenuItems[index].selected) {
      setSuma((prevSuma) => prevSuma + roundedPrice);
    } else {
      setSuma((prevSuma) => +(prevSuma - roundedPrice).toFixed(2));
    }

    if (zvoleneMenus.includes(itemId)) {
      setZvoleneMenus((prevMenus) => {
        const updatedMenus = prevMenus.filter((item) => item !== itemId);
        localStorage.setItem("zvoleneMenus", JSON.stringify(updatedMenus));
        return updatedMenus;
      });
    } else {
      setZvoleneMenus((prevMenus) => {
        const updatedMenus = [...prevMenus, itemId];
        localStorage.setItem("zvoleneMenus", JSON.stringify(updatedMenus));
        return updatedMenus;
      });
    }
  
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className="menuWindow">
      <h3>Menu Items</h3>
      <p>{suma}$</p>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <div className="mealItem">
              <div>
                <div className="menuitem">{item.item}</div>
                <div className="menuitem">{item.price}$</div>
                <div className="menuitem">{item.description}</div>
              </div>
              <div className="checkboxContainer">
                <input
                  type="checkbox"
                  checked={item.selected || false}
                  onChange={() => handleCheckboxChange(index, +item.price.toFixed(2), item.id)}
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
