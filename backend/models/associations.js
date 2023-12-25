const User = require('./user');
const TournamentEntry = require('./tournamentEntry');

// Users have many tournament entries
User.hasMany(TournamentEntry, { foreignKey: 'userId' });
TournamentEntry.belongsTo(User, { foreignKey: 'userId' });
