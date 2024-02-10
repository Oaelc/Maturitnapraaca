const express = require('express');
const { makeReservation, deleteReservation, checkTableAvailability } = require('../controllers/reservationController');
const router = express.Router();

router.post('/makereservation', makeReservation);
router.delete('/reservation/:reservationId', deleteReservation); // Updated route
router.post('/checkavailability', checkTableAvailability);

module.exports = router;
