// backend/routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// GET top high scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new score (supports both 'playerName' and 'name' from frontend)
router.post('/', async (req, res) => {
  try {
    const playerName = req.body.playerName || req.body.name || 'Anonymous';
    const score = req.body.score !== undefined ? Number(req.body.score) : 0;

    const newScore = new Score({ playerName, score });
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (err) {
    console.error('Validation/Save Error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;