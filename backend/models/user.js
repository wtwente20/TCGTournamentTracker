const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
  // Define attributes
  userId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Model options
  timestamps: false, // Adds createdAt and updatedAt timestamps
  tableName: 'users' // Defines the table name in the database
});

module.exports = User;
