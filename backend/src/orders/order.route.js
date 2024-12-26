const express = require('express');
const Order = require('./order.model');
const { createOrder, getOrderHistory } = require('./order.controller');
const { protect } = require('../middleware/verifyUser')
const router = express.Router();



router.post("/orderPage",protect, createOrder)
router.get('/order-history', protect, getOrderHistory);

module.exports = router;