const express = require('express');
const Order = require('./order.model');
const { createOrder, getAllOrders, getUserOrders, verifyPayment } = require('./order.controller');
const { protect } = require('../middleware/verifyUser');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();



router.post("/orderPage",protect, createOrder)
// Admin: Get all orders
router.get('/orders', verifyAdminToken, getAllOrders);
// User: Get orders by email
router.get('/user-orders', protect, getUserOrders);

// router.post('/payment/callback',protect, paymentCallback);
router.post("/payment/callback", verifyPayment);




module.exports = router;