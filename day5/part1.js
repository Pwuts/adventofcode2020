const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const passes = input.split('\n');
const parsedPasses = passes.map(pass => {
    pass = pass.replace(/[FL]/g, '0').replace(/[BR]/g, '1');
    const row = parseInt(pass.substr(0, 7), 2);
    const column = parseInt(pass.substr(7, 3), 2);

    return {
        row,
        column,
        id: row * 8 + column
    };
}).sort((a, b) => a.id - b.id);

console.log('highest boarding pass ID:', parsedPasses[parsedPasses.length - 1].id);
