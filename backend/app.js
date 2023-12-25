const express = require("express");
const db = require("./config/database");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const User = require('./models/user');
const TournamentEntry = require('./models/tournamentEntry');
require('./models/associations');
require("dotenv").config();

const app = express();

// Route definitions go here, filler added for template
// const tournamentRoutes = require("./routes/tournamentRoutes");
// const userRoutes = require("./routes/userRoutes");

app.use(cors({
  origin: 'http://localhost:4200',
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Test DB Connection
const assertDatabaseConnection = async () => {
  try {
    await db.authenticate();
    console.log("Database connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

// Use routes here
// app.use("/tournaments", tournamentRoutes);
// app.use("/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  assertDatabaseConnection();
});

// Sync models with the database
db.sync().then(() => {
  console.log("Models synchronized with the database.");
}).catch(err => {
  console.error("Error synchronizing models with the database:", err);
});