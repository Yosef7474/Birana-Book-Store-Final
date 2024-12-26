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
      res.status(404).send({ message: "Admin not found" });
    }
    if (admin.password !== password) {
      res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication Succesfull",
      token: token,
      adminn: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login Faied", error);
    res.status(401).send({ message: "Login Failed" });
  }
});

module.exports = router;
