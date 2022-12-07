const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const lines = input.split("\r\n");

class Folder {
    Name;
    SubFolders;
    Files;
    TotalSize;
    Parent;
    constructor(name, parent) {
        this.Name = name;
        this.SubFolders = [];
        this.Files = [];
        this.Parent = parent;
    }

    addSubFolder(folderName) {
        this.SubFolders.push(new Folder(folderName, this));
    }

    getSubFolder(name) {
        for (let i = 0; i < this.SubFolders.length; ++i) {
            if (this.SubFolders[i].Name == name) {
                return this.SubFolders[i];
            }
        }
        console.log("Could not find subfolder!");
        return this;
    }

    addFile(file, size) {
        this.Files.push([file, size]);
    }
}

function createFilesystem(input) {
    const root = new Folder("/", undefined);
    let currentNode = root;

    for (let i = 1; i < input.length; ++i) {
        const command = input[i].split(' ');
        if (command[0] == '$') { // Command
            if (command[1] == 'cd') {
                if (command[2] == '/') {
                    currentNode = root;
                }
                else if (command[2] == '..'){
                    currentNode = currentNode.Parent;
                }
                else {
                    currentNode = currentNode.getSubFolder(command[2]);
                }
            }
            // else do nothing, to consume ls command
        }
        else { // Listing files
            if (command[0] == 'dir') {
                currentNode.addSubFolder(command[1]);
            }
            else {
                currentNode.addFile(command[1], command[0]);
            }
        }
    }
    return root;
}

function recursiveSizeCalculation(currentNode) {
    let totalSize = 0;
    for (let i = 0; i < currentNode.SubFolders.length; ++i) {
        totalSize += recursiveSizeCalculation(currentNode.SubFolders[i]);
    }
    
    for (let i = 0; i < currentNode.Files.length; ++i) {
        totalSize += parseInt(currentNode.Files[i][1]); // Get file size
    }
    
    currentNode.TotalSize = totalSize;
    return totalSize;
}

function recursiveAddAllFoldersWithSizeLessThan(currentNode, size) {
    let totalSize = 0;
    
    if (currentNode.TotalSize <= size) {
        totalSize += currentNode.TotalSize;
    }

    for (let i = 0; i < currentNode.SubFolders.length; ++i) {
        totalSize += recursiveAddAllFoldersWithSizeLessThan(currentNode.SubFolders[i], size);
    }

    return totalSize;
}

function recursiveFindSmallestDirectoryWithMinimumSizeOf(currentNode, sizeMinimum, bestFitSoFar) {
    if (currentNode.TotalSize < bestFitSoFar && currentNode.TotalSize > sizeMinimum) { // Found a node with big enough size
        bestFitSoFar = currentNode.TotalSize;
        return bestFitSoFar;
    }

    for (let i = 0; i < currentNode.SubFolders.length; ++i) {
        bestFitSoFar = recursiveFindSmallestDirectoryWithMinimumSizeOf(currentNode.SubFolders[i], sizeMinimum, bestFitSoFar);
    }

    return bestFitSoFar;
}

console.log(`Total input length ${lines.length}`);

const fileSystem = createFilesystem(lines);
recursiveSizeCalculation(fileSystem);

console.log(`part 1 > ${recursiveAddAllFoldersWithSizeLessThan(fileSystem, 100000)}`);
console.log(`part 2 > ${recursiveFindSmallestDirectoryWithMinimumSizeOf(fileSystem, 30000000 - (70000000 - fileSystem.TotalSize), fileSystem.TotalSize)}`);