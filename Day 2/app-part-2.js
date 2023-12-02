const fs = require('fs');
const readline = require('readline');

let result = 0;

const arrayToArrays = (array) => {
    const resultArray = [];
  
    for (let i = 2; i < array.length; i += 2) {
      const pair = [Number(array[i]), array[i + 1]];
      resultArray.push(pair);
    }
  
    return resultArray;
  };

const rd = readline.createInterface({
    input: fs.createReadStream('data'),
    console: false
});

rd.on('line', (line) => {
    const peakMap = new Map([['red', 0], ['blue', 0], ['green', 0]]);
    const data = line.split(/[\s,:;]+/);
    const games = arrayToArrays(data);

    games.forEach(game => {
        if (game[0] > peakMap.get(game[1])) {
            peakMap.set(game[1], game[0]);
        }
    })

    result += [...peakMap.values()].reduce((pv, cv) => pv * cv, 1);
});

rd.on('close', () => {
    console.log('Finished');
    console.log(result);
});