import perf from 'execution-time';
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

perf().start();

const space = [];
const galaxies = [];
let emptyRows = [];
let emptyColumns = [];
let distance = 0;

const rd = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/data`),
    console: false
});

rd.on('line', (line) => {   
    const data = line.split('');
    space.push(data);
});

rd.on('close', () => {
    const spaceL = space.length;
    const spaceFirstL = space[0].length;
  
    emptyRows = new Array(spaceL).fill(true);
    emptyColumns = new Array(spaceFirstL).fill(true);
  
    for (let y = 0; y < spaceL; y++) {
      for (let x = 0; x < spaceFirstL; x++) {
        if (space[y][x] === '#') {
          galaxies.push({ x, y });
          emptyRows[y] = false;
          emptyColumns[x] = false;
        }
      }
    }
  
    for (let i = 0; i < galaxies.length; i++) {
      const { x: xi, y: yi } = galaxies[i];
      for (let j = i + 1; j < galaxies.length; j++) {
        const { x: xj, y: yj } = galaxies[j];
        const x1 = Math.min(xi, xj);
        const y1 = Math.min(yi, yj);
        const x2 = Math.max(xi, xj);
        const y2 = Math.max(yi, yj);
  
        for (let x = x1; x < x2; x++) {
          if (emptyColumns[x]) {
            distance += 2;
          } else {
            distance += 1;
          }
        }
  
        for (let y = y1; y < y2; y++) {
          if (emptyRows[y]) {
            distance += 2;
          } else {
            distance += 1;
          }
        }
      }
    }
  
    console.log(distance);
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
});
