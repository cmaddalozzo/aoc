const fs = require('fs');

const polymer = fs.readFileSync('./input.txt', 'utf8').trim().split('');

function getUniqueUnits(units) {
  return Array.from(new Set(polymer.map((p) => p.toUpperCase())));
}

function createChain(units) {
  const sourceUnits = [...units];
  const destUnits = [];

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
  return destUnits;
}

function willReact(unit1, unit2) {
  return unit1 !== unit2 && unit1.toUpperCase() === unit2.toUpperCase();
}

const lengths = getUniqueUnits(polymer).map((unit) => {
  const clean = polymer.filter(u => u.toUpperCase() !== unit);
  return createChain(clean).length;
});

console.log(lengths.sort()[0]);
