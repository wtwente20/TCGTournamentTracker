const TournamentEntry = require('../models/tournamentEntry'); // adjust path as needed

// Add a new tournament entry
const addTournamentEntry = async (req, res) => {
    try {
        const { tcgFormat, dateOfTournament, deckLink, matchesWon, totalMatches, prizes, userId } = req.body;
        const newEntry = await TournamentEntry.create({ tcgFormat, dateOfTournament, deckLink, matchesWon, totalMatches, prizes, userId });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).send({ message: "Error adding tournament entry", error });
    }
};

// Get all tournament entries for a user
const getTournamentEntries = async (req, res) => {
    try {
        const userId = req.params.userId; // set up JWT auth later
        const entries = await TournamentEntry.findAll({ where: { userId } });
        res.json(entries);
    } catch (error) {
        res.status(500).send({ message: "Error fetching tournament entries", error });
    }
};

module.exports = {
    addTournamentEntry,
    getTournamentEntries
};
