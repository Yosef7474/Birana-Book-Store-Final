const express = require('express');
const User = require('./user.model');
const router = express.Router();
const { registerUser, loginUser, getUserDetails, updatePreferences, getRecommendedBooks } = require('./user.controller');
const { protect } = require('../middleware/verifyUser'); // Middleware to protect routes

// Public routes
router.post("/register", registerUser); // User registration
router.post('/login', loginUser); // User login

// Protected routes
router.get('/profile', protect, getUserDetails); // Fetch user details
router.put('/preferences', protect, updatePreferences); // Update user preferences
router.get('/recommended', protect, getRecommendedBooks)

module.exports = router;
