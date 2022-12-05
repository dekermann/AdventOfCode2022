const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split(/\r\n\s*\r\n/);

function initialize(data) {
    let stacks = [];
    const lines = data.split('\r\n');

    // Find amount of pillars
    let size = 1;
    while (size < lines[0].length) {
        size += 4;
        stacks.push([]);
    }

    // Fill out pillars
    for (let i = lines.length - 2; i >= 0; --i) {
        const line = lines[i];
        let index = 0;
        while (true) {
            const charIndex = (index * 4) + 1;
            if (charIndex >= line.length) break;
            if (line[charIndex] != ' ') {
                stacks[index].push(line[charIndex]);
            }
            ++index;
        }
    }
    return stacks;
}

function calculateMoves(baseStacks, movementSheet) {
    for (let i = 0; i < movementSheet.length; ++i) {
        const currentMovement = movementSheet[i].split(' ');
        const amount = parseInt(currentMovement[1]);
        const from = parseInt(currentMovement[3]) - 1;
        const to = parseInt(currentMovement[5]) - 1;

        for (let j = 0; j < amount; ++j) {
            baseStacks[to].push(baseStacks[from].pop());
        }
    }

    let topCrates = '';
    for (let i = 0; i < baseStacks.length; ++i) {
        topCrates += baseStacks[i].pop();
    }
    return topCrates;
}

function calculateMoves2(baseStacks, movementSheet) {
    for (let i = 0; i < movementSheet.length; ++i) {
        const currentMovement = movementSheet[i].split(' ');
        const amount = parseInt(currentMovement[1]);
        const from = parseInt(currentMovement[3]) - 1;
        const to = parseInt(currentMovement[5]) - 1;

        let movingCrates = [];
        for (let j = 0; j < amount; ++j) {
            movingCrates.push(baseStacks[from].pop());
        }
        for (let j = 0; j < amount; ++j) {
            baseStacks[to].push(movingCrates.pop());
        }
    }

    let topCrates = '';
    for (let i = 0; i < baseStacks.length; ++i) {
        topCrates += baseStacks[i].pop();
    }
    return topCrates;
}

console.log(`Total amount subsets ${readings.length}`);
const movementSheet = readings[1].split('\r\n');
console.log(`part 1 > ${calculateMoves(initialize(readings[0]), movementSheet)}`);
console.log(`part 2 > ${calculateMoves2(initialize(readings[0]), movementSheet)}`);