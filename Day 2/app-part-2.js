import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let result = 0;

perf().start();
const arrayToArrays = (array) => {
    const resultArray = [];
  
    for (let i = 2; i < array.length; i += 2) {
      const pair = [Number(array[i]), array[i + 1]];
      resultArray.push(pair);
    }
  
    return resultArray;
  };

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
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
    console.log(result);
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});