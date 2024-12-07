import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let finalResult = 0;

const canMakeNumber = (result, others) => {
    let posActions = [others[0]];
    for (let i = 1; i < others.length; i++) {
      const n = others[i];
      const nextPosAction = [];

      for (const action of posActions) {
        nextPosAction.push(action + n);
        nextPosAction.push(action * n);
        nextPosAction.push(parseInt('' + action + n, 10));
      }

      posActions = nextPosAction.filter((action) => action <= result);
    }
    
    if (posActions.some((action) => action === result)) {
      finalResult += result;
    }
}

perf().start();

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
    console: false
});

rd.on('line', (line) => {
    const data = line.split(/[\s:]+/).map(Number);
    canMakeNumber(data[0], data.slice(1))
});

rd.on('close', () => {
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
    console.log(finalResult);
});