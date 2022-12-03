const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\r\n');

function calculatePoints(data) {
    
    let totalValue = 0;
    for (let i = 0; i < data.length; ++i) {
        const currentData = data[i];

        let alphabetLetters = Array.apply(null, Array(53)).map(() => { return false; }) // +1 to skip 0 indexing
        for (let charIndex = 0; charIndex < currentData.length; ++charIndex) {
            const char = currentData[charIndex];
            const charValue = (char.charCodeAt(0) <= 90) ? char.charCodeAt(0) - 38 : char.charCodeAt(0) - 96;
            
            if (charIndex < currentData.length / 2) {
                alphabetLetters[charValue] = true;
            }
            else if (alphabetLetters[charValue]) {
                totalValue += charValue;
                break;
            }
        }
    }
    return totalValue;
}


function calculatePoints2(data) {
    
    let totalValue = 0;
    for (let i = 0; i < data.length; i += 3) {
        
        let alphabetLetters = Array.apply(null, Array(53)).map(() => { return 0; }) // +1 to skip 0 indexing
        for (let j = 0; j < 3; ++j) {
            const currentData = data[i + j];
            for (let charIndex = 0; charIndex < currentData.length; ++charIndex) {
                const char = currentData[charIndex];
                const charValue = (char.charCodeAt(0) <= 90) ? char.charCodeAt(0) - 38 : char.charCodeAt(0) - 96;
                
                if (j == 0) {
                    alphabetLetters[charValue] = 1;
                }
                else if (j == 1 && alphabetLetters[charValue] == 1) {
                    alphabetLetters[charValue] = 2;
                }
                else if (j == 2 && alphabetLetters[charValue] == 2) {
                    totalValue += charValue;
                    break;
                }
            }
        }
    }
    return totalValue;
}

console.log(`Total amount subsets ${readings.length}`);
console.log(`part 1 > ${calculatePoints(readings)}`);
console.log(`part 2 > ${calculatePoints2(readings)}`);