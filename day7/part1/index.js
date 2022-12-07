const fs = require('fs');

let file = fs.readFileSync('./input.txt', {encoding:'utf8'});
let inputArray = file.split('\r\n');
inputArray = inputArray.map((el) => el.split(" "));

console.table(inputArray);

let dirs = {};

let currentDir = [];
let allDirs = []

inputArray.forEach(input => {
    if (input[0] === "$" ) {
        if (input[1] === "cd") {
            if (input[2] === "..") {
                currentDir.pop();
            } else if (input[2] === "/") {
                //current dir
            } else {
                currentDir.push(input[2]);
                allDirs.push(currentDir.join('.'));
                console.log("test" + allDirs);
            }
            console.log(currentDir)
        }
    } else if (input[0] === "dir") {
        eval(`dirs${currentDir.length>0?".":""}${currentDir.join(".")}.${input[1]} = {}`);
    } else {
        eval(`dirs${currentDir.length>0?".":""}${currentDir.join(".")}["${input[1]}"] = ${input[0]}`);
    }
});

console.log(dirs);
console.log("---")
console.log(allDirs);
console.log("---")
let dirSizeList = {};
let totalSize = 0;
allDirs.forEach((dir) => {
    let size = getDirSize(dir);
    if (size <= 100000) {
        dirSizeList[dir] = size;
        totalSize += size;
    }
});
console.table(dirSizeList);

// dir = "a.e"
function getDirSize(dir) {
    let size = 0;
    let searchDir = eval(`dirs.${dir}`);

    for (const name in searchDir) {
        if (typeof searchDir[name] === "object") {
            size += getDirSize(dir + "." + name);
        } else {
            size += searchDir[name];
        }
    }
    return size;
}


console.log(totalSize);