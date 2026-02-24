const calculateScores = (submissions) => {
    // Sort submissions by lock time
    const sortedSubmissions = submissions.sort((a, b) => new Date(a.lockedAt) - new Date(b.lockedAt));

    const results = [];

    // Group by exact same time to handle ties
    const groups = [];
    sortedSubmissions.forEach(sub => {
        if (groups.length === 0) {
            groups.push([sub]);
        } else {
            const lastGroup = groups[groups.length - 1];
            if (new Date(sub.lockedAt).getTime() === new Date(lastGroup[0].lockedAt).getTime()) {
                lastGroup.push(sub);
            } else {
                groups.push([sub]);
            }
        }
    });

    let correctRank = 1;
    let hasWrongAnswer = false;

    for (const group of groups) {
        let groupCorrectRank = correctRank;
        let groupHasCorrect = false;

        for (const sub of group) {
            if (sub.skipped) {
                sub.pointsAwarded = 0;
            } else if (sub.isCorrect) {
                if (groupCorrectRank === 1) sub.pointsAwarded = 4;
                else if (groupCorrectRank === 2) sub.pointsAwarded = 3;
                else if (groupCorrectRank === 3) sub.pointsAwarded = 2;
                else sub.pointsAwarded = 1;

                sub.order = groupCorrectRank;
                groupHasCorrect = true;
            } else {
                // Wrong answer
                sub.pointsAwarded = hasWrongAnswer ? -1 : -2;
            }
            results.push(sub);
        }

        if (groupHasCorrect) {
            // Increase correctRank by the number of correct submissions in this group
            correctRank += group.filter(s => s.isCorrect).length;
        }

        if (group.some(s => !s.isCorrect && !s.skipped)) {
            hasWrongAnswer = true;
        }
    }

    return results;
};

module.exports = { calculateScores };
