const fs = require('fs');

const polymer = fs.readFileSync('./input.txt', 'utf8');

const sourceUnits = polymer.trim().split('')
const destUnits = [];

function willReact(unit1, unit2) {
  return unit1 !== unit2 && unit1.toUpperCase() === unit2.toUpperCase();
}

while(sourceUnits.length > 0) {
  const next = sourceUnits.shift();
  if (destUnits.length > 0) {
    if (willReact(next, destUnits[destUnits.length - 1])) {
      destUnits.pop()
      continue;
    }
  }
  destUnits.push(next);
}
console.log(destUnits.length);
