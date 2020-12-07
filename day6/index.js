const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

const groups = input.split('\n\n');

const answersPerGroup = groups.map(group => {
    const yesedQuestions = {};

    const persons = group.split('\n');

    persons.forEach(person => {
        for (let question of person) {
            yesedQuestions[question] = (yesedQuestions[question] ?? 0) + 1;
        }
    });

    return {
        groupSize: persons.length,
        answers: yesedQuestions,
    }
});


/*** part 1 ***/
console.log(
    '[part 1] sum of distinct positively answered questions per group:',
    answersPerGroup.reduce((total, group) => {
        return total + Object.keys(group.answers).length
    }, 0),
);


/*** part 2 ***/
console.log(
    '[part 2] sum of common positively answered questions per group:',
    answersPerGroup.reduce((total, group) => {
        return total
            + Object.values(group.answers)
                    .filter(yesCount => yesCount == group.groupSize)
                    .length
    }, 0),
);
