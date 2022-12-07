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

// dir = ".a.e"
function getDirSize(dir) {
    let size = 0;

    let searchDir = eval(`dirs${dir}`);

    for (const name in searchDir) {
        if (typeof searchDir[name] === "object") {
            size += getDirSize(dir + "." + name);
        } else {
            size += searchDir[name];
        }
    }
    return size;
}

let usedSpace = getDirSize("");
console.log("free space: "+ (70000000 - usedSpace));
let needed = -(70000000 - usedSpace - 30000000);
console.log("space needed: "+ (needed));
console.table(allDirs)
let answer = Number.MAX_VALUE;
allDirs.forEach((dir) => {
    let size = getDirSize("."+dir);
    if (size > needed && size < answer) {
        answer = size;
    }
});
console.log(answer);