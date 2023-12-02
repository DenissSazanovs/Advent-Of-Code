const fs = require('fs');
const readline = require('readline');
const numbers = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9]
])
function getAllIndexes(str, val) {
    let indexes = new Map()
    let i = -1;
    while ((i = str.indexOf(val, i+1)) != -1) {
        indexes.set(i, val);
    }
    return indexes;
}
let result = 0;
const rd = readline.createInterface({
  input: fs.createReadStream('data'),
  console: false
});
rd.on('line', (line) => {
    let indexes = new Map();
    numbers.forEach((val, key) => {
        indexes = new Map([...indexes, ...getAllIndexes(line, key)])
    })
    indexes.delete(-1);

    const maxKey = Math.max(...indexes.keys());
    const minKey = Math.min(...indexes.keys());

    result += Number(numbers.get(indexes.get(minKey)).toString() + numbers.get(indexes.get(maxKey)).toString());
});
rd.on('close', () => {
  console.log(result);
});
