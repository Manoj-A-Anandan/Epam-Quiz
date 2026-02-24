const mongoose = require('mongoose');
const { calculateScores } = require('./utils/scoring');

const submissions = [
    { teamId: 'A', lockedAt: new Date('2026-02-24T10:00:00.000Z'), isCorrect: true, skipped: false }, // 1st Correct (+4)
    { teamId: 'B', lockedAt: new Date('2026-02-24T10:00:01.000Z'), isCorrect: false, skipped: false }, // 1st Wrong (-2)
    { teamId: 'C', lockedAt: new Date('2026-02-24T10:00:02.000Z'), isCorrect: true, skipped: false }, // 2nd Correct (+3)
    { teamId: 'D', lockedAt: new Date('2026-02-24T10:00:03.000Z'), isCorrect: false, skipped: false }, // 2nd Wrong (-1)
];

const results = calculateScores(submissions);
console.log("Scenario 1:", results.map(r => `${r.teamId}: ${r.pointsAwarded}`));

const submissions2 = [
    { teamId: 'A', lockedAt: new Date('2026-02-24T10:00:00.000Z'), isCorrect: true, skipped: false }, // Tie 1st Correct (+4)
    { teamId: 'B', lockedAt: new Date('2026-02-24T10:00:00.000Z'), isCorrect: true, skipped: false }, // Tie 1st Correct (+4)
    { teamId: 'C', lockedAt: new Date('2026-02-24T10:00:02.000Z'), isCorrect: true, skipped: false }, // 3rd Correct (+2)
    { teamId: 'D', lockedAt: new Date('2026-02-24T10:00:03.000Z'), isCorrect: true, skipped: false }, // 4th Correct (+1)
];

const results2 = calculateScores(submissions2);
console.log("Scenario 2 (Tie):", results2.map(r => `${r.teamId}: ${r.pointsAwarded}`));

const submissions3 = [
    { teamId: 'A', lockedAt: new Date('2026-02-24T10:00:00.000Z'), isCorrect: true, skipped: false }, // 1st Correct (+4)
    { teamId: 'B', lockedAt: new Date('2026-02-24T10:00:01.000Z'), isCorrect: true, skipped: false }, // 2nd Correct (+3)
    { teamId: 'C', lockedAt: new Date('2026-02-24T10:00:05.000Z'), isCorrect: false, skipped: true }, // Skipped (0)
    { teamId: 'D', lockedAt: new Date('2026-02-24T10:00:05.000Z'), isCorrect: false, skipped: true }, // Skipped (0)
];

const results3 = calculateScores(submissions3);
console.log("Scenario 3 (Skips):", results3.map(r => `${r.teamId}: ${r.pointsAwarded}`));
