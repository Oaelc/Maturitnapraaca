const express = require('express');
const router = express.Router();
const { getDailyMenu, getAllMenuData, deleteMenuItem, editdailymenu } = require('../controllers/dailymenuController.js');

// Define routes
router.get('/:day', getDailyMenu); // Use a dynamic parameter for the day
router.get('/', getAllMenuData); // Add a new route for fetching all menu data
router.delete('/:id', deleteMenuItem); // Add a route for deleting a menu item
router.post('/:day',editdailymenu);
module.exports = router;
