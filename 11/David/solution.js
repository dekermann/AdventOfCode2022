const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const monkeys = input.split(/\r\n\s*\r\n/);


class Monkey {
    Items;
    Operation;
    Test;
    DivisionNumber;
    TargetTrue;
    TargetFalse;
    MonkeyList;
    Inspections;
    constructor(items, operation, test, divisionNumber, targetTrue, targetFalse, monkeyList) {
        this.Items = items;
        this.Operation = operation;
        this.Test = test;
        this.DivisionNumber = divisionNumber;
        this.TargetTrue = targetTrue;
        this.TargetFalse = targetFalse;
        this.MonkeyList = monkeyList;
        this.Inspections = 0;
    }

    performOperations(Value, remove) {
        for (let i = 0; i < this.Items.length; ++i) {
            this.Items[i] = this.Operation(this.Items[i]);
            if (remove) {
                this.Items[i] = this.Items[i] % Value; // This could be improved by finding prime numbers, but meh
            }
            else {
                this.Items[i] = Math.floor(this.Items[i] / Value);
            }
        }
    }

    performTests() {
        let amountOfInspects = this.Items.length;
        for (let i = 0; i < this.Items.length; ++i) {
            if(this.Test(this.Items[i])) {
                let nextMonkey = this.MonkeyList[this.TargetTrue];
                nextMonkey.pushItem(this.Items[i]);
            }
            else {
                let nextMonkey = this.MonkeyList[this.TargetFalse];
                nextMonkey.pushItem(this.Items[i]);
            }
        }
        this.Items = [];
        this.Inspections += amountOfInspects;
    }

    pushItem(item) {
        this.Items.push(item);
    }
}

function initMonkeys(monkeys) {
    const itemsString = "  Starting items: ";
    const operationString = "  Operation: new = old ";
    const testString = "  Test: divisible by ";
    const ifTrueString = "    If true: throw to monkey ";
    const ifFalseString = "    If false: throw to monkey ";

    let monkeyObjects = [];

    for (let i = 0; i < monkeys.length; ++i) {
        const monkey = monkeys[i].split('\r\n');
        const monkeyItems = monkey[1].substr(itemsString.length).split(", ").map((item) => parseInt(item));
        const monkeyOperationString = monkey[2].substr(operationString.length).split(' ');

        const monkeyOperation = (itemValue) => {
            if (monkeyOperationString[0] == "+") {
                return itemValue + parseInt(monkeyOperationString[1]);
            }
            else if (monkeyOperationString[1] == "old") {
                return itemValue * itemValue;
            }
            else {
                return itemValue * parseInt(monkeyOperationString[1]);
            }
        };
        const monkeyTestValue = parseInt(monkey[3].substr(testString.length));
        
        const monkeyTest = (value) => {
            return (value % monkeyTestValue) == 0;
        };
        const monkeyTestTrue = parseInt(monkey[4].substr(ifTrueString.length));
        const monkeyTestFalse = parseInt(monkey[5].substr(ifFalseString.length));


        let monkeyObject = new Monkey(monkeyItems, monkeyOperation, monkeyTest, monkeyTestValue, monkeyTestTrue, monkeyTestFalse, monkeyObjects);
        monkeyObjects.push(monkeyObject);
    }

    return monkeyObjects;
}

function monkeyStuff(monkeys, maxIterations, divideByValue, remove) {
    for (let iterations = 0; iterations < maxIterations; ++iterations) {
        for (let i = 0; i < monkeys.length; ++i) {
            monkeys[i].performOperations(divideByValue, remove);
            monkeys[i].performTests();
        }

        if (iterations % 1000 == 0 || iterations == 1 || iterations == 20) {
            let inspectionList = [];
            for (let i = 0; i < monkeys.length; ++i) {
                inspectionList.push(monkeys[i].Inspections)
            }
            console.log(inspectionList)
        }
    }

    let inspectionList = [];
    for (let i = 0; i < monkeys.length; ++i) {
        inspectionList.push(monkeys[i].Inspections)
    }
    inspectionList.sort((a, b) => b - a);
    console.log(inspectionList)
    return inspectionList[0] * inspectionList[1];
}

console.log(`Total instructions ${monkeys.length}`);
let Monkeys = initMonkeys(monkeys);
console.log(`part 1 > ${monkeyStuff(Monkeys, 20, 3, false)}`);
Monkeys = initMonkeys(monkeys);
let divisionValue = 1;
for (let i = 0; i < Monkeys.length; ++i) {
    divisionValue *= Monkeys[i].DivisionNumber;
}
console.log(`part 2 > ${monkeyStuff(Monkeys, 10000, divisionValue, true)}`);