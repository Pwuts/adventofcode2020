const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const compliantCount = input.split('\n').reduce((cumCount, line) => {
    [_match, min, max, letter, password] = /(\d+)-(\d+) ([a-z]): ([a-z]+)/.exec(line);
    min = Number(min);
    max = Number(max);

    let count = 0;
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) == letter) count++;
    }

    let compliant = count >= min && count <= max;

    return cumCount + compliant;
}, 0);

console.log('compliant number of passwords:', compliantCount);
