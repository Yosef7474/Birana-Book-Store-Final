// controllers/adminStatsController.js

const AdminStats = require('../stats/statModel');
const Order = require('../orders/order.model');
const Book = require('../books/book.model');

// Fetch Admin Stats
const getAdminStats = async (req, res) => {
    try {
        const stats = await AdminStats.findOne();
        if (stats) {
            res.json(stats); // Return existing stats
        } else {
            // If no stats, return a default object
            res.json({
                totalBooks: 0,
                totalOrders: 0,
                totalRevenue: 0.0,
                totalCustomers: 0,
                totalStock: 0,
            });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching stats' });
    }
};

// Update Admin Stats (e.g., after a new order or book is added)
const updateAdminStats = async (req, res) => {
    try {
        const stats = req.body; // Get stats from the request body
        const updatedStats = await AdminStats.findOneAndUpdate({}, stats, { new: true });
        res.json(updatedStats);
    } catch (err) {
        res.status(500).json({ error: 'Error updating stats' });
    }
};

// Additional Routes for fetching books and orders stats
const getBooksStats = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const totalStock = await Book.aggregate([
            { $group: { _id: null, totalStock: { $sum: '$quantity' } } },
        ]);
        res.json({ totalBooks, totalStock: totalStock[0]?.totalStock || 0 });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching book stats' });
    }
};

const getOrdersStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $unwind: '$books' },
            { $group: { _id: null, revenue: { $sum: { $multiply: ['$books.price', '$books.quantity'] } } } },
        ]);
        const totalCustomers = await Order.distinct('email').countDocuments();
        res.json({
            totalOrders,
            totalRevenue: totalRevenue[0]?.revenue || 0,
            totalCustomers,
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching order stats' });
    }
};

module.exports = { getAdminStats, updateAdminStats, getBooksStats, getOrdersStats };
