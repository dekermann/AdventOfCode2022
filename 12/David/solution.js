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

function recursiveWeightGraph(currentPosition, grid, result, currentLength) {
    // Set weight of current position
    const currentGridElement = grid[currentPosition[0]][currentPosition[1]];
    if (result[currentPosition[0]][currentPosition[1]] <= currentLength) return;
    result[currentPosition[0]][currentPosition[1]] = currentLength;

    for (let nextPosition = 0; nextPosition < 4; ++nextPosition) { // 0bXY
        // Setup X Y next positions
        const negativePositive = ((nextPosition & 0b1) * 2) - 1;
        const XorY = ((nextPosition >> 1) & 0b1);
        const nextYPosition = currentPosition[0] + (negativePositive * XorY);
        const nextXPosition = currentPosition[1] + (negativePositive * !XorY);
        if (nextYPosition < 0 || nextYPosition >= grid.length || nextXPosition < 0 || nextXPosition >= grid[0].length) {
            continue;
        }

        const nextGridElement = grid[nextYPosition][nextXPosition];

        if (currentGridElement <= nextGridElement + 1) { // Can move
            recursiveWeightGraph([nextYPosition, nextXPosition], grid, result, currentLength + 1);
        }
    }
}

let GridMap = initGrid(data);
let WeightMap = [...new Array(GridMap[2].length)].map(() => [...new Array(GridMap[2][0].length)].map(() => Number.MAX_SAFE_INTEGER));

recursiveWeightGraph(GridMap[1], GridMap[2], WeightMap, 0);

function findBestStart(grid, weightGrid, startValue) {
    let currentBest = Number.MAX_SAFE_INTEGER;
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[y].length; ++x) {
            if (grid[y][x] == startValue && weightGrid[y][x] < currentBest) {
                currentBest = weightGrid[y][x];
            }
        }
    }
    return currentBest;
}

console.log(`Total input ${input.length}`);
console.log(`part 1 > ${WeightMap[GridMap[0][0]][GridMap[0][1]]}`);
console.log(`part 2 > ${findBestStart(GridMap[2], WeightMap, 0)}`);

// Bonus Print

// for (let y = 0; y < WeightMap.length; ++y) {
//     let s = "";
//     for (let x = 0; x < WeightMap[y].length; ++x) {
//         if (WeightMap[y][x] == Number.MAX_SAFE_INTEGER) s += "    ";
//         else {
//             s += WeightMap[y][x] + " ";
//             if (WeightMap[y][x] < 9) s += " ";
//             if (WeightMap[y][x] < 99) s += " ";
//         }
//     }
//     console.log(s);
// }