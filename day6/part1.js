const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const groups = input.split('\n\n');
const countPerGroup = groups.map(group => {
    const yesedQuestions = [];

    for (let question of group.replace(/\n/g, '')) {
        if (!yesedQuestions.includes(question)) {
            yesedQuestions.push(question);
        }
    }

    return yesedQuestions.length;
});

const total = countPerGroup.reduce((t, c) => t + c);

console.debug('total number of positively answered questions:', total);
