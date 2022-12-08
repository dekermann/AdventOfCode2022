const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const rows = input.split("\r\n");

function createGridWithEncapsulatedElements(input) {
    const sizeX = input[0].length;
    const sizeY = input.length;
    console.log("Grid size: [" + sizeX + ", " + sizeY + "]")

    let visibilityGrid = [...new Array(sizeY)].map(() => [...new Array(sizeX)].map(() => -1));

    // Left/Right
    for (let row = 1; row < sizeY - 1; ++row) {
        // Left to Right
        let currentHighestValue = parseInt(input[row][0]);
        for (let column = 1; column < sizeX - 1; ++column) {
            const currentElement = parseInt(input[row][column]);
            if (currentElement > currentHighestValue) { // Element visible, set new high
                currentHighestValue = currentElement;
                visibilityGrid[row][column] = -1;
            }
            else {
                visibilityGrid[row][column] = currentElement; 
            }
        }

        // Right to Left
        currentHighestValue = parseInt(input[row][sizeX-1]);
        for (let column = sizeX - 2; column > 0; --column) {
            const currentElement = parseInt(input[row][column]);
            if (currentElement > currentHighestValue) { // Element visible, set new high
                currentHighestValue = currentElement;
                visibilityGrid[row][column] = -1;
            }
        }
    }

    
    // Top/Bottom
    for (let column = 1; column < sizeX - 1; ++column) {
        // Top to Bottom
        let currentHighestValue = parseInt(input[0][column]);
        for (let row = 1; row < sizeY - 1; ++row) {
            const currentElement = parseInt(input[row][column]);
            if (currentElement > currentHighestValue) { // Element visible, set new high
                currentHighestValue = currentElement;
                visibilityGrid[row][column] = -1;
            }
        }

        // Bottom to Top
        currentHighestValue = parseInt(input[sizeY-1][column]);
        for (let row = sizeY - 2; row > 0; --row) {
            const currentElement = parseInt(input[row][column]);
            if (currentElement > currentHighestValue) { // Element visible, set new high
                currentHighestValue = currentElement;
                visibilityGrid[row][column] = -1;
            }
        }
    }

    return visibilityGrid;
}

function countVisibleTrees(visibilityGrid) {
    let count = 0;
    for (let row = 0; row < visibilityGrid.length; ++row) {
        for (let column = 0; column < visibilityGrid[row].length; ++column) {
            if (visibilityGrid[row][column] == -1) ++count;
        }
    }
    return count;
}

function createGridWithDistanceToSmallerElements(input) {
    const sizeX = input[0].length;
    const sizeY = input.length;
    console.log("Grid size: [" + sizeX + ", " + sizeY + "]")

    let visibilityGrid = [...new Array(sizeY)].map(() => [...new Array(sizeX)].map(() => 1));

    // Left/Right
    for (let row = 1; row < sizeY - 1; ++row) {
        // Left to Right
        let heightSlice = [...new Array(10)].map(() => -1);
        heightSlice[parseInt(input[row][0])] = 0;
        for (let column = 1; column < sizeX - 1; ++column) {
            const currentElement = parseInt(input[row][column]);
            let farthestRange = column;
            for (let largerElementIndex = currentElement; largerElementIndex < heightSlice.length; ++largerElementIndex) {
                if (heightSlice[largerElementIndex] != -1 && (column - heightSlice[largerElementIndex]) < farthestRange) {
                    farthestRange = column - heightSlice[largerElementIndex];
                }
            }
            heightSlice[currentElement] = column;
            visibilityGrid[row][column] *= farthestRange;
        }
        
        // Right to Left
        heightSlice = [...new Array(10)].map(() => -1);
        heightSlice[parseInt(input[row][sizeX - 1])] = sizeX - 1;
        for (let column = sizeX - 2; column > 0; --column) {
            const currentElement = parseInt(input[row][column]);
            let farthestRange = (sizeX - 1) - column;
            for (let largerElementIndex = currentElement; largerElementIndex < heightSlice.length; ++largerElementIndex) {
                if (heightSlice[largerElementIndex] != -1 && (heightSlice[largerElementIndex] - column) < farthestRange) {
                    farthestRange = heightSlice[largerElementIndex] - column;
                }
            }
            heightSlice[currentElement] = column;
            visibilityGrid[row][column] = visibilityGrid[row][column] * farthestRange;
        }
    }

    
    // Top/Bottom
    for (let column = 1; column < sizeY - 1; ++column) {
        // Top to Bottom
        let heightSlice = [...new Array(10)].map(() => -1);
        heightSlice[parseInt(input[0][column])] = 0;
        for (let row = 1; row < sizeY - 1; ++row) {
            const currentElement = parseInt(input[row][column]);
            let farthestRange = row;
            for (let largerElementIndex = currentElement; largerElementIndex < heightSlice.length; ++largerElementIndex) {
                if (heightSlice[largerElementIndex] != -1 && (row - heightSlice[largerElementIndex]) < farthestRange) {
                    farthestRange = row - heightSlice[largerElementIndex];
                }
            }
            heightSlice[currentElement] = row;
            visibilityGrid[row][column] *= farthestRange;
        }
        
        // Bottom to Top
        heightSlice = [...new Array(10)].map(() => -1);
        heightSlice[parseInt(input[sizeY - 1][column])] = sizeY - 1;
        for (let row = sizeY - 2; row > 0; --row) {
            const currentElement = parseInt(input[row][column]);
            let farthestRange = (sizeY - 1) - row;
            for (let largerElementIndex = currentElement; largerElementIndex < heightSlice.length; ++largerElementIndex) {
                if (heightSlice[largerElementIndex] != -1 && (heightSlice[largerElementIndex] - row) < farthestRange) {
                    farthestRange = heightSlice[largerElementIndex] - row;
                }
            }
            heightSlice[currentElement] = row;
            visibilityGrid[row][column] = visibilityGrid[row][column] * farthestRange;
        }
    }

    // console.log(visibilityGrid)
    return visibilityGrid;
}

function findLargestViewingDistance(visibilityGrid) {
    let largest = 0;
    for (let row = 0; row < visibilityGrid.length; ++row) {
        for (let column = 0; column < visibilityGrid[row].length; ++column) {
            if (visibilityGrid[row][column] > largest) largest = visibilityGrid[row][column];
        }
    }
    return largest;
}

const visibilityGrid = createGridWithEncapsulatedElements(rows);
const visibilityGrid2 = createGridWithDistanceToSmallerElements(rows);

console.log(`part 1 > ${countVisibleTrees(visibilityGrid)}`);
console.log(`part 2 > ${findLargestViewingDistance(visibilityGrid2)}`);