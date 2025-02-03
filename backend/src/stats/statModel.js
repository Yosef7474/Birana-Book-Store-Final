// models/adminStats.js

const mongoose = require('mongoose');

const adminStatsSchema = new mongoose.Schema({
    totalBooks: {
        type: Number,
        default: 0,
    },
    totalOrders: {
        type: Number,
        default: 0,
    },
    totalRevenue: {
        type: Number,
        default: 0.0,
    },
    totalCustomers: {
        type: Number,
        default: 0,
    },
    totalStock: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

const AdminStats = mongoose.model('AdminStats', adminStatsSchema);

module.exports = AdminStats;
