const User = require("./user.model");
const Book = require("../books/book.model")
const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRETT_KEY
const app = express();


// Register User
const registerUser = async (req, res) => {
  // console.log(req.body);
  const { name, email, password, preferences } = req.body; // Include preferences

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      preferences, // Save preferences in the database
    });
    console.log(user);

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        // token: generateToken(user.id),
       
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error whats wrong" });
  }
};


// Login usesr

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { email: user.email, role: user.role, name: user.name, preferences: user.preferences },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Set the token as an HTTP-only cookie
      res.cookie("token", token, {
        maxAge: 60 * 60 * 1000, // 1 hour expiration (same as token expiry)
      });

      // Respond with user details (excluding token from response body)
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
        token: token,
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// get users

const getUsersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const users = await User.find({ email: new RegExp(email, 'i') }); // 'i' for case-insensitive search
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found with this email" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//   User details
const getUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { userId, name, email, password, preference } = req.body;

    // Check if password is provided, if so, hash it
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Find user and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password: hashedPassword, preference },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// recommended books
const getRecommendedBooks = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated user
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found. Please log in." });
    }

    const { preferences } = user;

    // Check if user has preferences
    if (!preferences || preferences.length === 0) {
      return res.status(200).json([]); // Return an empty array
    }

    // Fetch books matching user preferences
    const recommendedBooks = await Book.find({
      category: { $in: preferences }, // Matches any of the categories in preferences
    });

    return res.status(200).json(recommendedBooks);
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).json({ message: "Failed to fetch recommendations", error });
  }
};


//   update preferences
const updatePreferences = async (req, res) => {
  const { preferences } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.preferences = preferences;
    await user.save();

    res.json({ message: "Preferences updated", preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  updatePreferences,
  getRecommendedBooks,
  getUsersByEmail,
  updateProfile
};
