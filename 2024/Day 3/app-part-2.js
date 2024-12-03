import perf from 'execution-time';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


perf().start();

let finalResult = 0;

const rd = fs.readFile(`${__dirname}/data`, 'utf8', (err, data) => {
    if (err) throw err; 
    const regex = /(?=do\(\))|(?=don't\(\))/g;
    const parts = data.split(regex);

    const result = parts.map(part => {
        if (part.includes("don't()")) {
            return { type: "no", value: part.replace("don't()", "").trim() };
        } else if (part.includes("do()")) {
            return { type: "do", value: part.replace("do()", "").trim() };
        } else {
            return { type: "do", value: part.trim() };
        }
    });

    let finalString = '';

    result.forEach(element => {
        if (element.type === 'do') {
            finalString += element.value;
        }
    });

    const multiplyRegex = /mul\((\d+),(\d+)\)/g;
    let match;

    while ((match = multiplyRegex.exec(finalString)) !== null) {
        finalResult += Number(match[1]) * Number(match[2]);
    }
    const results = perf().stop();
    console.log(`Time to finish - ${results.time} ms`);
    console.log(finalResult);
});