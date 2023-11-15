import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import "./Styles/styles.css"
import axios from "axios"

const Dmenu = () => {
  const [dailyMenu, setDailyMenu] = useState([]);
  const [selectedDay, setSelectedDay] = useState('monday');

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  useEffect(() => {
    fetchDailyMenu(selectedDay);
  }, [selectedDay]);

  const fetchDailyMenu = (day) => {
    axios.post(`http://localhost:5000/dailymenu/${day}`)
      
      .then((data) => setDailyMenu(data))
      .catch((error) => console.error('Error fetching daily menu:', error));
  };
  console.log(dailyMenu)
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

        <ul>

        </ul>
      </main>
    </div>
  );
};

export default Dmenu;
