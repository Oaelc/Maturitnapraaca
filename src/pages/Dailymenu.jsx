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
      
      .then((res,req) => setDailyMenu(res.data.data))
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
          {daysOfWeek.map((day) => { return(
            <button key={day} onClick={() => setSelectedDay(day)}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
)})}
        </div>
        <div className="menuitem">{dailyMenu.item}</div>
        <div className="menuitem">{dailyMenu.price}</div>
        <div className="menuitem">{dailyMenu.description}</div> 

        <ul>

        </ul>
      </main>
    </div>
  );
};

export default Dmenu;
