const fs = require('fs');
const { parseClaim } = require('./lib');

const claims = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const claimGrid = [];

claims.map(parseClaim).forEach((claim) => {
  for(let i = claim.x; i < claim.width + claim.x; i++) {
    for(let j = claim.y; j < claim.height + claim.y; j++) {
      if (!claimGrid[i]) {
        claimGrid[i] = [];
      }
      claimGrid[i][j] = !claimGrid[i][j] ? 1 : claimGrid[i][j] + 1;
    }
  }
});

const total = claimGrid
  .reduce((s, r) => s + r.reduce((a, i) => i && i > 1 ? a + 1 : a, 0), 0);

console.log(total);
