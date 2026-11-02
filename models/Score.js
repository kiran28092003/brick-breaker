const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Score || mongoose.model('Score', scoreSchema);