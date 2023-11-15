// ReservationForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/styles.css";
import 'react-calendar/dist/Calendar.css';
import {Calendar} from "react-calendar"


const ReservationForm = ({ onReserve }) => {
  const [reservationDate, setReservationDate] = useState('');
  const [table, setTable] = useState('');
  const navigate = useNavigate();
  const [datee,setDate] = useState(new Date())

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('../login');
    }
  }, [navigate]);

  const handleReserve = () => {
    // Perform validation if needed

    // Call the parent component's onReserve function with the reservation details
    onReserve({
      reservationDate,
      table,
    });

    // Clear the form after submitting
    setReservationDate('');
    setTable('');
  };

  return (
    <div>
      <h2>Make a Reservation</h2>
      <Calendar value={datee} onChange={(e) => setDate(e)} />
      {datee.getFullYear()}<br />
      {datee.getMonth()+1}<br />
      {datee.getDate()}<br />
      <br />
      <label>Table Number: </label>
      <input
        type="number"
        value={table}
        onChange={(e) => console.log(e)}
      />
      <br />
      <button onClick={handleReserve}>Reserve</button>
    </div>
  );
};

export default ReservationForm;
