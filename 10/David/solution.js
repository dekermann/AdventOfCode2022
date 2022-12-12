const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const instructions = input.split("\r\n");

function executeInstructions(instructions, interestingCycles, interestingPrintCycles) {
    let interestingCycleValue = 0;
    let registerCurrentValue = 1;
    let cycle = 1;
    let string = "#"
    for (let i = 0; i < instructions.length; ++i) {

        let instruction = instructions[i].split(' ');
        if (instruction[0] == "addx") {
            // DRAW CRT
            let delta = registerCurrentValue - (cycle % interestingPrintCycles);
            if (delta >= -1 && delta <= 1) {
                string += "#";
            }
            else {
                string += ".";
            }

            ++cycle;
            if (cycle % interestingCycles[1] == interestingCycles[0]) {
                interestingCycleValue += registerCurrentValue * cycle;
            }
            if (cycle % interestingPrintCycles == 0) {
                console.log(string);
                string = "";
            }
            registerCurrentValue += parseInt(instruction[1]);
            
        }
        // DRAW CRT
        let delta = registerCurrentValue - (cycle % interestingPrintCycles);
        if (delta >= -1 && delta <= 1) {
            string += "#";
        }
        else {
            string += ".";
        }

        ++cycle;
        if (cycle % interestingCycles[1] == interestingCycles[0]) {
            interestingCycleValue += registerCurrentValue * cycle;
        }
        if (cycle % interestingPrintCycles == 0) {
            console.log(string);
            string = "";
        }
    }

    return interestingCycleValue;
}

let interestingCycles = [20, 40];
let interestingPrintCycles = 40;
console.log(`Total instructions ${instructions.length}`);
console.log(`part 1/2 > ${executeInstructions(instructions, interestingCycles, interestingPrintCycles)}`);