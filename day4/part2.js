const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const passports = input.split('\n\n')
                        .map(passport => Object.fromEntries(
                            passport.split(/\s/)
                                    .map(field => field.split(':'))
                        ));

const validators = {
    'byr': yearValidator(1920, 2002),
    'iyr': yearValidator(2010, 2020),
    'eyr': yearValidator(2020, 2030),
    'hgt': lengthValidator,
    'hcl': color => /^#[0-9a-f]{6}$/.test(color),
    'ecl': color => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(color),
    'pid': id => /^\d{9}$/.test(id)
};

const requiredFields = Object.keys(validators);

const validPassportCount = passports.filter(passport =>
    requiredFields.every(requiredField =>
        Object.keys(passport).includes(requiredField)
    )
    && requiredFields.every(field => {
        const isValid = validators[field](passport[field]);
        if (isValid) console.debug(`field "${field}" has ${isValid ? '' : 'in'}valid value "${passport[field]}"`);
        return isValid;
    })
).length;

console.debug('total number of passports:', passports.length);
console.log('number of valid passports:', validPassportCount);

function yearValidator(min, max)
{
    return (yearString) => yearString.length == 4 && validateNumber(yearString, min, max)
}

function lengthValidator(lengthString)
{
    const match = /^(?<number>\d{2,3})(?<unit>cm|in)$/.exec(lengthString)?.groups;
    if (!match) return false;

    const retardUnits = match.unit == 'in';
    const [min, max] = !retardUnits ? [150, 193] : [59, 76];

    return validateNumber(match.number, min, max);
}

function validateNumber(numberString, min, max)
{
    const number = Number(numberString);
    return !isNaN(number) && min <= number && number <= max;
}
