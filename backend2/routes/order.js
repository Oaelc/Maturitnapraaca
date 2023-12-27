const express = require('express');
const router = express.Router();
const { makeOrder } = require('../controllers/orderController');

router.post('/makeorder', makeOrder);

module.exports = router;
