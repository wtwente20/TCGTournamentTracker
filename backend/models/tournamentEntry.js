const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const TournamentEntry = db.define(
  "TournamentEntry",
  {
    // Define attributes
    entryId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    tcgFormat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfTournament: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deckLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matchesWon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalMatches: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    prizes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId',
      }
    },
  },
  {
    // Model options
    timestamps: true,
    tableName: "tournament_entries",
  }
);

module.exports = TournamentEntry;
