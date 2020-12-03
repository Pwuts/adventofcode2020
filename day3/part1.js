const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
const xStep = 3;
const yStep = 1;

const lines = input.split('\n');
const lineLength = lines[0].length;

function isTree(x, y)
{
    return lines[y].charAt(x % lineLength) == '#';
}

let treeCount = 0;
for (let x = 0, y = 0; y < lines.length; x += xStep, y += yStep)
{
    treeCount += isTree(x, y);
}

console.log('number of trees encountered:', treeCount);
