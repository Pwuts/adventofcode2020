const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const passports =
    input.split('\n\n').map(passport =>
        Object.fromEntries(
            passport.split(/\s/)
                    .map(field => field.split(':'))
        )
    );

console.debug('total number of passports:', passports.length);

const validators = {
    'byr': yearValidator(1920, 2002),
    'iyr': yearValidator(2010, 2020),
    'eyr': yearValidator(2020, 2030),
    'hgt': heightValidator,
    'hcl': color => /^#[0-9a-f]{6}$/.test(color),
    'ecl': color => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(color),
    'pid': id => /^\d{9}$/.test(id),
};

const requiredFields = Object.keys(validators);


/*** part 1 ***/
const passportsWithRequiredFields = passports.filter(passport =>
    requiredFields.every(requiredField => requiredField in passport)
);

console.log(
    '[part 1] number of passwords with all required fields:',
    passportsWithRequiredFields.length,
);


/*** part 2 ***/
const validPassports = passportsWithRequiredFields.filter(passport =>
    requiredFields.every(field => validators[field](passport[field]))
);

console.log('[part 2] number of valid passports:', validPassports.length);


/*** validator functions ***/
function yearValidator(min, max)
{
    return (yearString) => yearString.length == 4 && validateNumber(yearString, min, max)
}

function heightValidator(lengthString)
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
