// backend/models/Score.js
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: { type: String, required: true, default: 'Anonymous' },
  score: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Score || mongoose.model('Score', scoreSchema);