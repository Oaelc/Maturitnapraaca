// reservationRouter.js
const express = require('express');
const router = express.Router();
const { makeReservation } = require('../controllers/reservationController');

router.post('/makereservation', makeReservation);

module.exports = router;
