const fs = require('fs');
const readline = require('readline');

const threshold = new Map([['red', 12], ['green', 13], ['blue', 14]]);
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
    let validator = true;
    const data = line.split(/[\s,:;]+/);
    const games = arrayToArrays(data);
    games.forEach(game => {
        if (game[0] > threshold.get(game[1])) {
            validator = false;   
            return;  
        }
    })
    if (validator) {
        result += Number(data[1]);
    }
});

rd.on('close', () => {
    console.log('Finished');
    console.log(result);
});