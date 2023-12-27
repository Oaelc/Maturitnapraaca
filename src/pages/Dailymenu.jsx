import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import "./Styles/styles.css"
import axios from "axios"

const Dmenu = () => {
  const [dailyMenu, setDailyMenu] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    fetchDailyMenu(selectedDay);
  }, [selectedDay]);

  const fetchDailyMenu = (day) => {
    axios.get(`http://localhost:5000/api/dailymenu/${day}`)
      .then((res) => {
        setDailyMenu(res.data); // Assuming res.data is an array of menu items
      })
      .catch((error) => console.error('Error fetching daily menu:', error));
  };
  
  return (
    <div className="dmenu">
      <header>
        {/* Your Navbar component */}
      </header>
      <main>
        <h2>Daily Menu</h2>
        
        <div>
          {daysOfWeek.map((day) => (
            <button key={day} onClick={() => setSelectedDay(day)}>
              {day}
            </button>
          ))}
        </div>

        {dailyMenu.map((menu, index) => (
          <div key={index} className="menuitem">
            <div>{menu.item}</div>
            <div>{menu.price}$</div>
            <div>{menu.description}</div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Dmenu;
