const fs = require('fs');
const { parseClaim } = require('./lib');

const claims = fs.readFileSync('./input.txt', 'utf8').trim().split('\n').map(parseClaim);

const claimGrid = [];

claims.forEach((claim) => {
  for(let i = claim.x; i < claim.width + claim.x; i++) {
    for(let j = claim.y; j < claim.height + claim.y; j++) {
      if (!claimGrid[i]) {
        claimGrid[i] = [];
      }
      claimGrid[i][j] = !claimGrid[i][j] ? 1 : claimGrid[i][j] + 1;
    }
  }
});

const theOne = claims.find((claim) => {
  for(let i = claim.x; i < claim.width + claim.x; i++) {
    for(let j = claim.y; j < claim.height + claim.y; j++) {
      // Check if there are any overlaps on this square inch
      if(claimGrid[i][j] > 1) {
        return false;
      }
    }
  }
  return true;
});

console.log(theOne);
