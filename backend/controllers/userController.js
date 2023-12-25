const bcrypt = require("bcrypt");
const User = require("../models/user");
const logger = require("../config/logger");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUserEmail = await User.findOne({ where: { email: email } });
    const existingUsername = await User.findOne({
      where: { username: username },
    });

    if (existingUserEmail) {
      return res
        .status(409)
        .send({ message: "User with this email already exists." });
    }

    if (existingUsername) {
      return res.status(409).send({ message: "Username is already taken!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      message: "User registered successfully!",
      user: {
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    logger.error("Error in /register route:", error);
    res.status(500).send({ message: "Server error for registration route." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME || "1h",
    });

    res.send({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Server error during login" });
  }
};

module.exports = {
  registerUser,
  loginUser
};
