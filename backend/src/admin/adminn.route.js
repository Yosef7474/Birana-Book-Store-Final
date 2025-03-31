const express = require("express");
const adminn = require("./adminn.model");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await adminn.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

    
        res.cookie("token", token, {
            
            maxAge: 3600 * 1000, // 1 hour expiry
        });

        return res.status(200).json({
            message: "Authentication Successful",
            token: token,
            admin: { username: admin.username, role: admin.role },
        });

    } catch (error) {
        console.error("Login Failed", error);
        res.status(500).json({ message: "Login Failed" });
    }
});

module.exports = router;
