// ReservationForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/styles.css";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";
import axios from "axios";
import Ordermenu from "../components/ordermenu";

function makeReservation() {
  const [reservationDate, setReservationDate] = useState("");
  const [table, setTable] = useState(0);
  const navigate = useNavigate();
  const [datee, setDate] = useState(new Date());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("../login");
    }
  }, [navigate]);

  const onReserve = () => {
    const requestData = { reservationDate: datee, tableNumber: table };
    axios
      .post(`http://localhost:5000/reservation/makereservation`, requestData)

      .then((res, req) => setMessage("Table reserved succesfully"))
      .catch((error) => setMessage("Table not reserved"));
  };

  const handleReserve = () => {
    // Perform validation if needed

    // Call the parent component's onReserve function with the reservation details
    console.log(datee,table)
    onReserve();

    // Clear the form after submitting
    setReservationDate("");
    setTable("");
  };

  const disablePastDates = (date) => {
    return date < new Date(); 
  };


  return (
    <div>
      <h2>Make a Reservation</h2>
      <Calendar value={datee} onChange={(e) => setDate(e)} 
      minDate={new Date()}
      tileDisabled={disablePastDates}/>
      <br />
      <label>Table Number: </label>
      <input
        type="number"
        value={table}
        onChange={(e) => setTable(e.target.value)}
        min={0}
      />
      <br />
      <button onClick={handleReserve}>Reserve</button>
      {message !== "" && (
        <div>
          {message}{" "}
          <div
            onClick={() => {
              setMessage("");
            }}
          >
            Ok
          </div>
        </div>
      )}
      <Ordermenu />
    </div>
  );
};

export default makeReservation;
