const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
const traversalSlopes = [
    { xStep: 1, yStep: 1 },
    { xStep: 3, yStep: 1 },
    { xStep: 5, yStep: 1 },
    { xStep: 7, yStep: 1 },
    { xStep: 1, yStep: 2 },
];

const treeLines = input.split('\n');
const lineLength = treeLines[0].length;

function isTree(x, y)
{
    return treeLines[y].charAt(x % lineLength) == '#';
}

const treeEncounters = traversalSlopes.map(slope => {
    let treeCount = 0;
    for (let x = 0, y = 0; y < treeLines.length; x += slope.xStep, y += slope.yStep)
    {
        treeCount += isTree(x, y);
    }

    console.debug(
        '"Right %d, down %d": %d trees encountered',
        slope.xStep, slope.yStep, treeCount
    );
    return treeCount;
});

console.log('\nproduct of encounters: %d', treeEncounters.reduce((p, c) => p * c));
