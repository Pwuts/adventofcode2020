const fs = require('fs');

fs.readFile('input.txt', (error, data) => {
    if (error) console.error(error);

    const numbers = data.toString().split('\n').map(Number);

    numbers.some(n1 => {
        n2 = numbers.find(number => n1 + number == 2020);

        if (n2) {
            console.log('%d * %d = %d', n1, n2, n1*n2);
            return true;
        }
    })
});
