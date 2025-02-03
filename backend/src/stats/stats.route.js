// routes/adminStats.js
const express = require('express');
const { getAdminStats, updateAdminStats, getBooksStats, getOrdersStats } = require('./stats.controller');
const router = express.Router();
const verifyAdminToken = require('../middleware/verifyAdminToken');

router.get('/stats', getAdminStats);

// Update admin stats
router.put('/update-stats', updateAdminStats);

// Fetch book-specific stats
router.get('/books-stats', getBooksStats);

// Fetch order-specific stats
router.get('/orders-stats', getOrdersStats);
module.exports = router;
