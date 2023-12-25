const jwt = require('jsonwebtoken');
const logger = require('../config/logger'); // Make sure you have a logger configured

const authenticate = (req, res, next) => {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) {
    return res.status(403).send({ message: 'Token is required' });
  }

  logger.info('Received Token Header:', tokenHeader);

  // Extract the token
  const token = tokenHeader.split(' ')[1];
  logger.info('Extracted Token:', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.error('JWT Verification Error:', err);
      return res.status(401).send({ message: 'Invalid Token!' });
    }
    logger.info('Decoded User:', decoded);
    req.user = { id: decoded.userId }; // Adjust according to your payload
    next();
  });
};

module.exports = authenticate;
