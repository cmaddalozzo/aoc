const fs = require('fs');

const f = fs.readFileSync('/Users/cmadd/Downloads/input.txt', 'utf8');
const ff = f.trim().split('\n');

let freq = 0
let found = NaN; 
const s = new Set();

s.add(0);

while(!found) {
  freq = ff.reduce((a, i) => {
    const n = a + parseInt(i);
    if(s.has(n)) {
      console.log('Found im', n)
      found = n
    }
    s.add(n);
    return n
  }, freq);
}

console.log(freq);
