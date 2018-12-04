const claimRegex = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/u;

function parseClaim(claimString) {
  const matches = claimRegex.exec(claimString);
  return {
    id: parseInt(matches[1]),
    x: parseInt(matches[2]),
    y: parseInt(matches[3]),
    width: parseInt(matches[4]),
    height: parseInt(matches[5])
  };
}

module.exports = {
  parseClaim
};
