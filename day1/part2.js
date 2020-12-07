const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (error, data) => {
    if (error) console.error(error);

    const numbers = data.toString().split('\n').map(Number);

    numbers.some(n1 => {
        return numbers.some(n2 => {
            n3 = numbers.find(number => n1 + n2 + number == 2020);

            if (n3) {
                console.log('%d * %d * %d = %d', n1, n2, n3, n1*n2*n3);
                return true;
            }
        });
    })
});
