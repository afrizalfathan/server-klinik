const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user_models");

const router = express.Router();

router.post("/login_handler", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username, password } });

    if (user) {
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ accessToken, user });
    } else {
      res.status(401).json({ message: "Username or password incorrect" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
