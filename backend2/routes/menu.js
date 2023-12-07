const express = require('express');
const router = express.Router();
const { getMenuData } = require('../controllers/menuController.js');

// Define routes
router.get('/', getMenuData);

module.exports = router;
