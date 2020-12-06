const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const groups = input.split('\n\n');
const countPerGroup = groups.map(group => {
    const yesedQuestions = {};

    const persons = group.split('\n');

    persons.forEach(person => {
        for (let question of person) {
            yesedQuestions[question] = (yesedQuestions[question] ?? 0) + 1;
        }
    });

    return Object.values(yesedQuestions)
                 .filter(count => count == persons.length).length;
});

const total = countPerGroup.reduce((t, c) => t + c);

console.debug('total number of common positively answered questions:', total);
