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

const passBeforeMissingPass = parsedPasses.find((pass, index, list) => list[index + 1].id === pass.id + 2);
const myPassMustBe = {
    row: passBeforeMissingPass.row + (passBeforeMissingPass.column == 7 ? 1 : 0),
    column: (passBeforeMissingPass.column + 1) % 8,
    id: passBeforeMissingPass.id + 1
};

console.debug(myPassMustBe);

console.log('following boarding pass not found and probably yours:', myPassMustBe);
