const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const compliantCount = input.split('\n').reduce((cumCount, line) => {
    [_match, pos1, pos2, letter, password] = /(\d+)-(\d+) ([a-z]): ([a-z]+)/.exec(line);
    pos1 = Number(pos1);
    pos2 = Number(pos2);

    let compliant = password.charAt(pos1 - 1) == letter ^ password.charAt(pos2 - 1) == letter;

    return cumCount + compliant;
}, 0);

console.log('compliant number of passwords:', compliantCount);
