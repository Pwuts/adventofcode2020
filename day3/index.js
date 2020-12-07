const { count } = require('console');
const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
const treeLines = input.split('\n');
const lineLength = treeLines[0].length;


/*** part 1 ***/
const part1TraversalSlope = { xStep: 3, yStep: 1 };

console.log(
    '[part 1] number of trees encountered:',
    countTraversalTrees(part1TraversalSlope),
    '\n',
);


/*** part 2 ***/
const part2TraversalSlopes = [
    { xStep: 1, yStep: 1 },
    { xStep: 3, yStep: 1 },
    { xStep: 5, yStep: 1 },
    { xStep: 7, yStep: 1 },
    { xStep: 1, yStep: 2 },
];

console.log(
    '\n[part 2] product of encounters:',
    part2TraversalSlopes.map(slope => {
        const treeCount = countTraversalTrees(slope);
    
        console.debug(
            '[part 2] "Right %d, down %d": %d trees encountered',
            slope.xStep, slope.yStep, treeCount
        );
        return treeCount;
    })
    .reduce((p, c) => p * c)
);


function countTraversalTrees({ xStep, yStep })
{
    let treeCount = 0;
    for (let x = 0, y = 0; y < treeLines.length; x += xStep, y += yStep)
    {
        treeCount += isTree(x, y);
    }
    return treeCount;
}

function isTree(x, y)
{
    return treeLines[y].charAt(x % lineLength) == '#';
}
