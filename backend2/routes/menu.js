const express = require('express');
const router = express.Router();
const { getMenuData, editMenu, deleteMenu } = require('../controllers/menuController.js');

// Define routes
router.get('/', getMenuData);
router.post('/', editMenu);
router.delete('/:id', deleteMenu);
module.exports = router;
