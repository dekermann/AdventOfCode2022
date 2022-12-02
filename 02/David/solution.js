const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\r\n');

function calculatePoints(data) {
    let score = 0;
    const scoreMap = [['A X', 4], ['A Y', 8], ['A Z', 3], ['B X', 1], ['B Y', 5], ['B Z', 9], ['C X', 7], ['C Y', 2], ['C Z', 6]];
    for (let i = 0; i < data.length; ++i) {
        const currentData = data[i];
        let found = false;
        for (let scoreMapping = 0; scoreMapping < scoreMap.length; ++scoreMapping) {
            const currentScoreMap = scoreMap[scoreMapping];
            if (currentData == currentScoreMap[0]) {
                score += currentScoreMap[1];
                found = true;
                break;
            }
        }
    }
    return score;
}

function calculatePoints2(data) {
    let score = 0;
    const scoreMap = [['A X', 3], ['A Y', 4], ['A Z', 8], ['B X', 1], ['B Y', 5], ['B Z', 9], ['C X', 2], ['C Y', 6], ['C Z', 7]];
    for (let i = 0; i < data.length; ++i) {
        const currentData = data[i];
        let found = false;
        for (let scoreMapping = 0; scoreMapping < scoreMap.length; ++scoreMapping) {
            const currentScoreMap = scoreMap[scoreMapping];
            if (currentData == currentScoreMap[0]) {
                score += currentScoreMap[1];
                found = true;
                break;
            }
        }
    }
    return score;
}


console.log(`Total amount subsets ${readings.length}`);
console.log(`part 1 > ${calculatePoints(readings)}`);
console.log(`part 2 > ${calculatePoints2(readings)}`);