const express = require('express');
const { makeReservation, deleteReservation, checkTableAvailability } = require('../controllers/reservationController');
const router = express.Router();

router.post('/makereservation', makeReservation);
router.delete('/:reservationId', deleteReservation);
router.post('/checkavailability', checkTableAvailability); // New route to check table availability

module.exports = router;
