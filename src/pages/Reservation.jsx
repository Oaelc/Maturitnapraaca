import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/styles.css";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";
import axios from "axios";
import Ordermenu from "../components/ordermenu";

function MakeReservation() {
  const [datee, setDate] = useState(new Date());
  const [table, setTable] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("../login");
    }
  }, [navigate]);

  const handleReserve = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("../login");
      return;
    }

    const userId = localStorage.getItem("user_id");
    const zvoleneMenus = JSON.parse(localStorage.getItem("zvoleneMenus") || "[]");

    try {
      const reservationResponse = await axios.post('http://localhost:5000/reservation/makereservation', {
        reservationDate: datee,
        tableNumber: table,
        userId
      });

      await axios.post('http://localhost:5000/order/makeorder', {
        reservation_id: reservationResponse.data.reservationId,
        menu_id: zvoleneMenus
      });

      setMessage("Table and menu items reserved successfully");
    } catch (error) {
      setMessage("Error in reservation");
    }
  };

  const disablePastDates = (date) => date < new Date();

  return (
    <div>
      <h2>Make a Reservation</h2>
      <Calendar value={datee} onChange={setDate} minDate={new Date()} tileDisabled={disablePastDates} />
      <br />
      <label>Table Number: </label>
      <input type="number" value={table} onChange={(e) => setTable(e.target.value)} min={0} />
      <br />
      <button onClick={handleReserve}>Reserve</button>
      {message && <div>{message} <span onClick={() => setMessage("")}>Ok</span></div>}
      <Ordermenu />
    </div>
  );
}

export default MakeReservation;
