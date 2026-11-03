// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Explicitly allow localhost and any Vercel deployment (*.vercel.app)
const allowedOrigins = [
  'http://localhost:5173',
  'https://brick-breaker-frontend-three.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl requests)
    if (!origin) return callback(null, true);

    // Allow any Vercel preview/production deployment or whitelisted local origin
    const isVercelApp = origin.endsWith('.vercel.app');
    if (allowedOrigins.indexOf(origin) !== -1 || isVercelApp) {
      return callback(null, true);
    }

    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
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