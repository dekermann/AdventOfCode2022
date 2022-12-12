const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const data = input.split('\r\n');

function initGrid(data) {
    let grid = [];
    let start;
    let end;
    for (let i = 0; i < data.length; ++i) {
        let row = [];
        for (let char = 0; char < data[i].length; ++char) {
            let charIndex = data[i].charCodeAt(char);
            if (charIndex == 83) {
                row.push(0);
                start = [i, char];
            }
            else if (charIndex == 69) {
                row.push(25);
                end = [i, char];
            }
            else {
                row.push(data[i].charCodeAt(char) - 97);
            }
        }
        grid.push(row);
    }

    return [start, end, grid];
}

function recursivePathFind(currentPosition, end, grid, visited, currentLength) {
    console.log(currentPosition)
    let currentNodesValue = grid[currentPosition[0]][currentPosition[1]];
    let currentBest = 9999999;
    // console.log("start")

    // Check up
    if (currentPosition[0] > 0 && !visited.has(currentPosition[0] - 1 + ":" + currentPosition[1])) {
        // console.log("UP");
        let adjacentNodeValue = grid[currentPosition[0] - 1][currentPosition[1]];
        const jump = adjacentNodeValue <= currentNodesValue + 1;
        // Path possible
        if (jump) {
            // console.log("Jump");
            if (end[0] == [currentPosition[0] - 1] && end[1] == [currentPosition[1]]) {
                return currentLength;
            }
            let newMap = new Map(visited);
            newMap.set(currentPosition[0] - 1 + ":" + currentPosition[1]);
            let newLength = recursivePathFind([currentPosition[0] - 1, currentPosition[1]], end, grid, newMap, currentLength + 1);
            if (newLength < currentBest) {
                currentBest = newLength;
            }
        }
    }
    
    // Check down
    if (currentPosition[0] < grid.length && !visited.has(currentPosition[0] + 1 + ":" + currentPosition[1])) {
        // console.log("Down");
        let adjacentNodeValue = grid[currentPosition[0] + 1][currentPosition[1]];
        const jump = adjacentNodeValue <= currentNodesValue + 1;
        // Path possible
        if (jump) {
            // console.log("Jump");
            if (end[0] == [currentPosition[0] + 1] && end[1] == [currentPosition[1]]) {
                return currentLength;
            }
            let newMap = new Map(visited);
            newMap.set(currentPosition[0] + 1 + ":" + currentPosition[1]);
            let newLength = recursivePathFind([currentPosition[0] + 1, currentPosition[1]], end, grid, newMap, currentLength + 1);
            if (newLength < currentBest) {
                currentBest = newLength;
            }
        }
    }

    // Check left
    if (currentPosition[0] > 0 && !visited.has(currentPosition[0] + ":" + currentPosition[1] - 1)) {
        // console.log("Left");
        let adjacentNodeValue = grid[currentPosition[0]][currentPosition[1] - 1];
        const jump = adjacentNodeValue <= currentNodesValue + 1;
        // Path possible
        if (jump) {
            // console.log("Jump");
            if (end[0] == [currentPosition[0]] && end[1] == [currentPosition[1] - 1]) {
                return currentLength;
            }
            let newMap = new Map(visited);
            newMap.set(currentPosition[0] + ":" + currentPosition[1] - 1);
            let newLength = recursivePathFind([currentPosition[0], currentPosition[1] - 1], end, grid, newMap, currentLength + 1);
            if (newLength < currentBest) {
                currentBest = newLength;
            }
        }
    }
    
    // Check right
    if (currentPosition[0] < grid[0].length && !visited.has(currentPosition[0] + ":" + currentPosition[1] + 1)) {
        // console.log("Right");
        let adjacentNodeValue = grid[currentPosition[0]][currentPosition[1] + 1];
        const jump = adjacentNodeValue <= currentNodesValue + 1;
        // Path possible
        if (jump) {
            // console.log("Jump");
            if (end[0] == [currentPosition[0]] && end[1] == [currentPosition[1] + 1]) {
                console.log(currentLength)
                return currentLength;
            }
            let newMap = new Map(visited);
            newMap.set(currentPosition[0] + ":" + currentPosition[1] + 1);
            let newLength = recursivePathFind([currentPosition[0], currentPosition[1] + 1], end, grid, newMap, currentLength + 1);
            if (newLength < currentBest) {
                currentBest = newLength;
            }
        }
    }
    return currentBest;
}

function findBestpath(gridMap) {
    const visitedMap = new Map();
    visitedMap.set(gridMap[0][0] + ":" + gridMap[0][1], true);
    return recursivePathFind(gridMap[0], gridMap[1], gridMap[2], visitedMap, 0);
}


console.log(`Total input ${input.length}`);
let GridMap = initGrid(data);
console.log(`part 1 > ${findBestpath(GridMap)}`);