import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/dailymenu.css';

const Dmenu = () => {
  const [dailyMenu, setDailyMenu] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    fetchDailyMenu(selectedDay);
  }, [selectedDay]);

  const fetchDailyMenu = (day) => {
    axios.get(`http://localhost:5000/api/dailymenu/${day}`)
      .then((res) => {
        setDailyMenu(res.data);
      })
      .catch((error) => console.error('Error fetching daily menu:', error));
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="dmenu-container mt-4">
      <div className="button-container mb-4">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            type="button"
            className={`btn day-button ${selectedDay === day ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="menu-items">
        {dailyMenu.map((menu, index) => (
          <div key={index} className="card mb-2" onClick={() => handleCardClick(menu)}>
            <div className="card-body">
              <h5 className="card-title">{menu.item}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{menu.price}$</h6>
              <p className="card-text">{menu.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.item}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedItem?.description}</p>
          <p>Price: {selectedItem?.price}$</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dmenu;
