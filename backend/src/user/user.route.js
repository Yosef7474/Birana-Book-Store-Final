const express = require('express');
const User = require('./user.model');
const router = express.Router();
const { registerUser, loginUser, getUserDetails, updatePreferences, getRecommendedBooks, getUsersByEmail, updateProfile } = require('./user.controller');
const { protect } = require('../middleware/verifyUser'); // Middleware to protect routes
const verifyAdminToken = require('../middleware/verifyAdminToken');

// Public routes
router.post("/register", registerUser); // User registration
router.post('/login', loginUser); // User login

// Protected routes
router.get('/profile', protect, getUserDetails); // Fetch user details
router.put('/preferences', protect, updatePreferences); // Update user preferences
router.get('/recommended', protect, getRecommendedBooks)
router.get('/users/email/:email', verifyAdminToken, getUsersByEmail)
router.put("/update", protect, updateProfile);
module.exports = router;
