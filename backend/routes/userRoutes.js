const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController'); // Adjust the path as needed

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
