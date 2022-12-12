const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const rows = input.split("\r\n");

function followTarget(currentPosition, targetPosition) {
    let moves = [];
    let delta = [targetPosition[0] - currentPosition[0], targetPosition[1] - currentPosition[1]];
    if ((Math.abs(delta[0]) > 0 && Math.abs(delta[1]) > 1) ||  (Math.abs(delta[0]) > 1 && Math.abs(delta[1]) > 0)) { // Move Diagonal first
        currentPosition[0] += Math.sign(delta[0]);
        currentPosition[1] += Math.sign(delta[1]);
        moves.push([...currentPosition]);
    }
    delta = [targetPosition[0] - currentPosition[0], targetPosition[1] - currentPosition[1]];
    for (let i = 1; i < Math.abs(delta[0]); ++i) {
        currentPosition[0] += Math.sign(delta[0]);
        moves.push([...currentPosition]);
    }
    for (let i = 1; i < Math.abs(delta[1]); ++i) {
        currentPosition[1] += Math.sign(delta[1]);
        moves.push([...currentPosition]);
    }
    return moves;
}

function snake(input, knots) {
    const visitedPositions = new Map();
    visitedPositions.set(0 + ':' + 0, true);

    let currentPositions = [...new Array(knots)].map(() => [...new Array(2)].map(() => 0));
    for (let i = 0; i < input.length; ++i) {
        let move = input[i].split(' ');
        let moveParsed = [move[0], parseInt(move[1])];
        for (let m = 0; m < moveParsed[1]; ++m) {
            switch (move[0]) {
                case 'U':
                    ++currentPositions[0][0];
                    break;
                case 'D':
                    --currentPositions[0][0];
                    break;
                case 'L':
                    ++currentPositions[0][1];
                    break;
                case 'R':
                    --currentPositions[0][1];
                    break;
            }
    
            let moves = [];
            for (let i = 0; i < knots - 1; ++i) {
                moves = followTarget(currentPositions[i + 1], currentPositions[i]);
            }
            for (let i = 0; i < moves.length; ++i) {
                visitedPositions.set(moves[i][0] + ":" + moves[i][1], true);
            }
        }
    }

    return visitedPositions.size;
}

console.log(`Total rows ${rows.length}`);
console.log(`part 1 > ${snake(rows, 2)}`);
console.log(`part 2 > ${snake(rows, 10)}`);