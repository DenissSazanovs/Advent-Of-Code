const fs = require('fs');
const readline = require('readline');

let result = 0;

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});
const cardsCopies = []
let idx = 0

rd.on('line', (line) => {
    const data = line.split(/\|/);
    const winNumbers = data[0].trim().split(/\s+/).splice(1);
    const elfNumbers = data[1].trim().split(/\s+/);
    const winnedNumbers = (winNumbers.filter(number => elfNumbers.includes(number))).length
    if (cardsCopies[idx] === undefined) {
        cardsCopies[idx] = 1
    }
    for (let i = idx +1; i < idx +1 + winnedNumbers; i++) {
        cardsCopies[i] = cardsCopies[i] !== undefined ? cardsCopies[i] + cardsCopies[idx] : cardsCopies[idx] + 1
    }
    result += cardsCopies[idx]
    idx++
});

rd.on('close', () => {
    console.log(result)
});