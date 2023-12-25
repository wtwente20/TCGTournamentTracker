const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path as needed
const logger = require('../config/logger'); // Ensure you have a logger

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUserEmail = await User.findOne({ where: { email: email } });
    const existingUsername = await User.findOne({ where: { username: username } });

    if (existingUserEmail) {
      return res.status(409).send({ message: "User with this email already exists." });
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
      password: hashedPassword
    });

    res.status(201).send({
      message: "User registered successfully!",
      user: {
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    logger.error("Error in /register route:", error);
    res.status(500).send({ message: "Server error for registration route." });
  }
};

module.exports = {
  registerUser
};
