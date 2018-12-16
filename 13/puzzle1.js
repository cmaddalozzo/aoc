const fs = require('fs');

const LEFT = 0;
const STRAIGHT = 1;
const RIGHT = 2;

const HORIZONTAL = '-';
const VERTICAL = '|';
const JUNCTION = '+';
const CORNERS = ['/', '\\'];
const CRASH = 'X';
const CART = ['<', '>', 'v', '^'];

class Cart {
  constructor(coords, direction) {
    this.coords = coords;
    this.decisions = 0;
    switch (direction) {
      case '<':
        this.vector = [-1, 0];
        break;
      case '>':
        this.vector = [1, 0];
        break;
      case '^':
        this.vector = [0, 1];
        break;
      case 'v':
        this.vector = [0, -1];
        break;
    }
  }
  nextTile() {
    return [
      this.coords[0] + this.vector[0],
      this.coords[1] + (this.vector[1] * -1)
    ];
  }
  handleCorner(corner) {
    if (corner === '/') {
      if (this.isVertical()) {
        this.turnRight();
      } else {
        this.turnLeft();
      }
    } else {
      if (this.isVertical()) {
        this.turnLeft();
      } else {
        this.turnRight();
      }
    }
  }
  handleJunction() {
    const dir = this.decisions % 3;
    this.decisions++;
    if (dir === STRAIGHT) {
      console.log(`Going straight for decision ${this.decisions}`);
      return;
    }
    if (dir === LEFT) {
      console.log(`Turning left for decision ${this.decisions}`);
      this.turnLeft();
    } else {
      console.log(`Turning right for decision ${this.decisions}`);
      this.turnRight();
    }
  }
  turnLeft() {
    if (this.isHorizontal()) {
      this.vector = this.vector.reverse();
    } else {
      this.vector = [this.vector[1] * -1, 0];
    }
  }
  turnRight() {
    if (this.isHorizontal()) {
      this.vector = [0, this.vector[0] * -1];
    } else {
      this.vector = this.vector.reverse();
    }
  }
  isVertical() {
    return this.vector[1] != 0;
  }
  isHorizontal() {
    return this.vector[0] != 0;
  }
}

const carts = [];
const grid = [];

const lines = fs.readFileSync(process.argv[2], 'utf8').split('\n');
lines.pop();

// Build the grid
lines.forEach((l, y) => {
  grid[y] = [];
  l.split('').forEach((p, x) => {
    let piece = p;
    if (CART.includes(p)) {
      const cart = new Cart([x, y], p);
      carts.push(cart);
      piece = cart.isVertical() ? VERTICAL : HORIZONTAL;
    }
    grid[y][x] = piece;
  });
});

function checkForCollision(carts) {
  const cartCoords = {};
  return carts.find((c) => {
    if (cartCoords[c.coords.toString()]) {
      return c.coords;
    }
    cartCoords[c.coords.toString()] = true;
    return null;
  });
}

function step() {
  carts.forEach((c) => {
    // Proceed
    c.coords = c.nextTile();
    const t = grid[c.coords[1]][c.coords[0]];
    if (t === JUNCTION) {
      c.handleJunction();
    } else if (CORNERS.includes(t)) {
      c.handleCorner(t);
    }
  });
}

let collision = null;
let steps = 0;
while (!collision) {
  steps++;
  console.log(carts);
  console.log('----');
  step();
  collision = checkForCollision(carts);
}

console.log(carts);
console.log(collision);
console.log(steps);
