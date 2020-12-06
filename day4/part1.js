const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const requiredFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

const passports = input.split('\n\n');

const validPassportCount = passports.filter(passport =>
    requiredFields.every(requiredField =>
        passport.split(/\s/)
                .map(field => field.split(':')[0])
                .includes(requiredField))
).length;

console.debug('total number of passports:', passports.length);
console.log('number of valid passports:', validPassportCount);
