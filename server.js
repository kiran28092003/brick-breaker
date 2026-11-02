// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Allow requests from localhost and your future frontend deployment URL
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL // You can optionally set this in Render later
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV === 'production') {
      // In production, you can restrict or loosen this as needed
      return callback(null, true); 
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Import and mount routes
const scoreRoutes = require('./routes/scoreRoutes');
app.use('/api/scores', scoreRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/brick_breaker')
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// Basic Test Route
app.get('/', (req, res) => {
  res.send(`${process.env.GAME_NAME || 'Brick Breaker Quest'} API is running!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});