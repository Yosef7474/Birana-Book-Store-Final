const express = require('express');
const { createOrder, getAllOrders, getUserOrders, verifyPayment, deleteOrder, getTotalAmount } = require('./order.controller');
const { protect } = require('../middleware/verifyUser');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();


// create Order
router.post("/orderPage",protect, createOrder)
// Admin: Get all orders
router.get('/orders', verifyAdminToken, getAllOrders);
// User: Get orders by email
router.get('/user-orders', protect, getUserOrders);

// router.post('/payment/callback',protect, paymentCallback);
router.post("/payment/callback", verifyPayment);

// delete Order
router.delete("/:id", verifyAdminToken, deleteOrder)

// totalAmount
router.get("/", verifyAdminToken, getTotalAmount)




module.exports = router;