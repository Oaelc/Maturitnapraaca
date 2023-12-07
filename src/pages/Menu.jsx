import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles/styles.css"

const Menu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu'); // Replace with your actual API endpoint
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

    fetchMenuData();
  }, []);

  return (
    <div className="dmenu">
      <main className="menucontent">
        <div>
          <h2>Menu</h2>
          {menuData.map((item, index) => (
            <div key={index}>
              <ul >
                <div className="menuitem">{item.item}</div>
                <div className="menuitem">{item.price}</div>
                <div className="menuitem">{item.description}</div>

              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;
