const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true }, // e.g. "A", "B", "C", "D"
  name: { type: String, required: true },
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model('Team', teamSchema);
