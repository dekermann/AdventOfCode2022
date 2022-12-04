const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\r\n');

function isPairCompletelyOverlapping(pair) {
    const splitPair = pair.split(',').map((individual) => { return individual.split('-').map(item => parseInt(item)) });
    const delta = [splitPair[0][0] - splitPair[1][0], splitPair[0][1] - splitPair[1][1]];
    if(Math.sign(delta[0]) != Math.sign(delta[1]) || delta[0] == 0 || delta[1] == 0) {
        return true;
    }
    return false;
}
function calculateComleteOverlaps(data) {
    let totalValue = 0;
    for (let i = 0; i < data.length; ++i) {
        const currentData = data[i];
        if(isPairCompletelyOverlapping(currentData)) {
            ++totalValue;
        }
    }
    return totalValue;
}

function isPairOverlapping(pair) {
    const splitPair = pair.split(',').map((individual) => { return individual.split('-').map(item => parseInt(item)) });
    const delta = [splitPair[0][1] - splitPair[1][0], splitPair[1][1] - splitPair[0][0]];
    if(delta[0] >= 0 && delta[1] >= 0) {
        return true;
    }
    return false;
}
function calculateOverlaps(data) {
    let totalValue = 0;
    for (let i = 0; i < data.length; ++i) {
        const currentData = data[i];
        if(isPairOverlapping(currentData)) {
            ++totalValue;
        }
    }
    return totalValue;
}

console.log(`Total amount subsets ${readings.length}`);
console.log(`part 1 > ${calculateComleteOverlaps(readings)}`);
console.log(`part 2 > ${calculateOverlaps(readings)}`);