const fs = require('fs');
const readline = require('readline');

const lines = [];
const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,?~\\\/\-='"]/g;
const numbersRegex = /\d+/g;

let result = 0;
let currentLine, previousLine, nextLine;

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

const validateLine = (number, line) => {
    const inRange = el => {
        return el >= number[1] && el <= number[2];
    };

    if (line && line.symbols.some(inRange)) {
        return Number(number[0]);
    };
    return 0;
}

rd.on('line', (line) => {
    const lineMatches = {
        numbers: Array.from(line.matchAll(numbersRegex), (m) => [m[0], m.index-1, m.index + m[0].length]),
        symbols: Array.from(line.matchAll(symbolRegex), (m) => m.index)
    };

    lines.push(lineMatches);

    if (lines.length > 3) {
        lines.shift();
    };

    if (lines.length > 1) {
        currentLine = lines[lines.length - 2];
        previousLine = lines[lines.length - 3];
        nextLine = lines[lines.length - 1];

        currentLine.numbers.forEach(number => {
            result += validateLine(number, currentLine);
            result += validateLine(number, previousLine);
            result += validateLine(number, nextLine);
        });
    }
});

rd.on('close', () => {
    nextLine.numbers.forEach(number => {
        result += validateLine(number, currentLine);
        result += validateLine(number, nextLine);
    })
    console.log(result);
});