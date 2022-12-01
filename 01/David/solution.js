const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split(/\r\n\s*\r\n/);

function highestAmountSubSet(data) {
    let currentMax = 0;
    for (let i = 0; i < data.length; ++i) {
        const items = data[i].split('\n').map(item => parseInt(item));
        let subSetValue = 0;
        for (let j = 0; j < items.length; ++j) {
            subSetValue += items[j];
        }
        if (currentMax < subSetValue) {
            currentMax = subSetValue;
        }
    }
    return currentMax;
}

function highest3AmountSubSet(data) {
    let allSubsetTotalAmount = [];
    for (let i = 0; i < data.length; ++i) {
        const items = data[i].split('\n').map(item => parseInt(item));
        let subSetValue = 0;
        for (let j = 0; j < items.length; ++j) {
            subSetValue += items[j];
        }
        allSubsetTotalAmount.push(subSetValue)
    }
    allSubsetTotalAmount.sort((a, b) => b - a)
    return allSubsetTotalAmount[0] + allSubsetTotalAmount[1] + allSubsetTotalAmount[2];
}

console.log(`Total amount subsets ${readings.length}`)
console.log(`part 1 > ${highestAmountSubSet(readings)}`);
console.log(`part 2 > ${highest3AmountSubSet(readings)}`);