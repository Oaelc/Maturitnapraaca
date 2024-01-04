// orderRouter.js

const express = require('express');
const { makeOrder, getOrders, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/makeorder', makeOrder);
router.get('/', getOrders);
router.delete('/:reservationId', deleteOrder); // Add this line

module.exports = router;
