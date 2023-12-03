const fs = require('fs');
const readline = require('readline');

const lines = [];
const symbolRegex = /\*/g;
const numbersRegex = /\d+/g;

let result = 0;
let currentLine, previousLine, nextLine;

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

const validateLine = (symbol, line) => {
    const result = [];
    const inRange = el => {
        return (el[1] >= symbol[0] && el[1] <= symbol[1]) || (el[2] >= symbol[0] && el[2] <= symbol[1]);
    };

    if (line) {
        line.numbers.forEach(number => {
            if (inRange(number)) {
                result.push(Number(number[0]));
            };
        })
    }

    return result;
}

rd.on('line', (line) => {
    const lineMatches = {
        numbers: Array.from(line.matchAll(numbersRegex), (m) => [m[0], m.index, m.index + m[0].length-1]),
        symbols: Array.from(line.matchAll(symbolRegex), (m) => [m.index-1, m.index + m[0].length])
    };

    lines.push(lineMatches);

    if (lines.length > 3) {
        lines.shift();
    };

    if (lines.length > 1) {
        currentLine = lines[lines.length - 2];
        previousLine = lines[lines.length - 3];
        nextLine = lines[lines.length - 1];

        currentLine.symbols.forEach(symbol => {
            const correctNumbers = [...validateLine(symbol, currentLine), ...validateLine(symbol, previousLine), ...validateLine(symbol, nextLine)]
            if (correctNumbers.length === 2) {
                result += correctNumbers[0] * correctNumbers[1]; 
            }
        });
    }
});

rd.on('close', () => {
    nextLine.symbols.forEach(symbol => {
        const correctNumbers = [...validateLine(symbol, currentLine), ...validateLine(symbol, nextLine)]
        if (correctNumbers.length === 2) {
            result += correctNumbers[0] * correctNumbers[1]; 
        }
    });
    console.log(result);
});