const express = require('express');
const path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var session = require('express-session');
const db = require('./models/db.js');

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: 'Exam',
  resave: false ,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 2
  }
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// GET all dog data
app.get('/api/dogs', async function(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT
        dog_id,
        name AS dog_name,
        size,
        owner_id
      FROM Dogs`
    );
    return res.status(200).json(rows);
  } catch(err) {
    console.error("Error getting dogs data");
    return res.sendStatus(500);
  }
});

// Export the app instead of listening here
module.exports = app;
