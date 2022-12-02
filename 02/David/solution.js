const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\n');

function calculatePoints(data) {
    let score = 0;
    const scoreMap = [['A X', 1], ['A Y', 6], ['A Z', 3], ['B X', 1], ['B Y', 2], ['B Z', 9], ['C X', 4], ['C Y', 2], ['C Z', 3]];
    for (let i = 0; i < data.length; ++i) {
        const currentData = data[i];
        console.log(`Current Data: ${currentData}`);
        for (let scoreMapping = 0; scoreMapping < scoreMap.length; ++scoreMapping) {
            const currentScoreMap = scoreMap[scoreMapping];
            console.log(`${currentData}`); // Prints correct
            console.log(`${currentData} vs ${currentScoreMap[0]}`);  // Prints wrong
            if (currentData == currentScoreMap[0]) {
                score += currentScoreMap[1];
                console.log(`found`);
                break;
            }
        }
    }
    return score;
}


console.log(`Total amount subsets ${readings.length}`);
console.log(`part 1 > ${calculatePoints(readings)}`);
// console.log(`part 2 > ${calculatePoints(readings)}`);