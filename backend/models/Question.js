const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionId: { type: Number, required: true, unique: true },
    text: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'fill'], required: true },
    options: [{ type: String }], // Optional if 'fill'
    correctAnswer: { type: String, required: true },
    justification: { type: String }
});

module.exports = mongoose.model('Question', questionSchema);
