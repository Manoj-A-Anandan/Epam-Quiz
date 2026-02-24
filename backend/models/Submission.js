const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    teamId: { type: String, required: true }, // string reference to Team's teamId
    questionIndex: { type: Number, required: true },
    answer: { type: String }, // User's answer
    lockedAt: { type: Date }, // Timestamp when locked
    isCorrect: { type: Boolean, default: false },
    pointsAwarded: { type: Number, default: 0 },
    skipped: { type: Boolean, default: false },
    order: { type: Number } // 1st, 2nd, 3rd, 4th
});

// Compound unique index so a team can only submit once per question
submissionSchema.index({ teamId: 1, questionIndex: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);
