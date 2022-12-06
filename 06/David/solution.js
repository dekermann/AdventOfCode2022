const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");

function checkIfSlidingWindowIsUnique(slidingWindow) {
    for (let i = 1; i < slidingWindow.length; ++i) {
        for (let j = 0; j < i; ++j) {
            if (slidingWindow[i] == slidingWindow[j]) {
                return false;
            }
        }
    }
    return true;
}

function findFirstUniqueGlyphSubset(input, size) {
    let slidingWindow = new Array(size);
    let needle = 0;
    for (let i = 0; i < size; ++i) {
        slidingWindow[i] = input[i];
    }
    for (let i = size; i < input.length; ++i) {
        slidingWindow[needle] = input[i]
        if (checkIfSlidingWindowIsUnique(slidingWindow)) {
            return i + 1;
        }
        ++needle;
        needle = needle % size;
    }
    return input.length;
}

console.log(`Total input length ${input.length}`);
console.log(`part 1 > ${findFirstUniqueGlyphSubset(input, 4)}`);
console.log(`part 2 > ${findFirstUniqueGlyphSubset(input, 14)}`);