const express = require('express');
const router = express.Router();
const { getDailyMenu } = require('../controllers/dailymenuController.js');

// Define routes
router.get('/:day', getDailyMenu); // Use a dynamic parameter for the day
module.exports = router;
