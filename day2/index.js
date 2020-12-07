const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
const lines = input.split('\n');

console.log('[part 1] compliant number of passwords:', countValidPasswords(lines, passwordChecker1));
console.log('[part 2] compliant number of passwords:', countValidPasswords(lines, passwordChecker2));

function countValidPasswords(lines, validator)
{
    return lines.reduce((cumCount, line) => {
        [_match, number1, number2, letter, password] = /(\d+)-(\d+) ([a-z]): ([a-z]+)/.exec(line);
        number1 = Number(number1);
        number2 = Number(number2);

        return cumCount + validator(number1, number2, letter, password);
    }, 0);
}

/*** part 1 ***/
function passwordChecker1(min, max, letter, password)
{
    let count = 0;
    for (let char of password) {
        if (char == letter) count++;
    }

    return count >= min && count <= max;
}

/*** part 2 ***/
function passwordChecker2(pos1, pos2, letter, password)
{
    return password.charAt(pos1 - 1) == letter ^ password.charAt(pos2 - 1) == letter;
}
