const express = require('express');
const router = express.Router();
const { getOrdersWithDetails } = require('../controllers/checkorderController');

router.get('/', getOrdersWithDetails);

module.exports = router;
