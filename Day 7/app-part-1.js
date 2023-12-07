const perf = require('execution-time')();
const fs = require('fs');
const readline = require('readline');

const customOrder = {
    A: 114,
    K: 113,
    Q: 112,
    J: 111,
    T: 110,
    '9': 109,
    '8': 108,
    '7': 107,
    '6': 106,
    '5': 105,
    '4': 104,
    '3': 103,
    '2': 102,
};

perf.start();
let game = [];

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

rd.on('line', (line) => {
    const hand = line.split(' ');
    const matches = hand[0].split("").sort().join("").match(/(.)\1+/g);
    const rank = matches ? matches.reduce((acc, match) => acc + match.length ** 2, 0) : 0;
    hand.push(rank, '');
    
    for (let i = 0; i < hand[0].length; i++ ){
        hand[3] += customOrder[hand[0][i]];
    }
    hand[3] = Number(hand[3]);
    game.push(hand);
});

rd.on('close', () => {
    const gameResult = game.sort((a, b) => a[2] - b[2] || a[3] - b[3]);

    let result = 0;
    for (let i = gameResult.length - 1; i >= 0; i--) {
        result += Number(gameResult[i][1]) * (i + 1);
    }

    console.log(result);
    console.log(`Time to finish - ${perf.stop().time} ms`);
});