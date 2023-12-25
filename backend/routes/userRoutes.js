const express = require('express');
const { registerUser } = require('../controllers/userController'); // Adjust the path as needed

const router = express.Router();

router.post('/register', registerUser);

module.exports = router;
