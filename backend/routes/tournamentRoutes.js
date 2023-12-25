const express = require('express');
const { addTournamentEntry, getTournamentEntries } = require('../controllers/tournamentEntryController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/add', authenticate, addTournamentEntry);
router.get('/:userId', authenticate, getTournamentEntries);

module.exports = router;
