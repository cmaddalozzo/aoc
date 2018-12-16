const PLAYER_COUNT = parseInt(process.argv[2]);
const LAST_POINT = parseInt(process.argv[3]);

const scores = new Array(PLAYER_COUNT).fill(0);

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
  remove() {
    if (this.prev) {
      this.prev.next = this.next;
    }
  }
  seek(position) {
    if (position === 0) {
      return this;
    }
    const dir = position > 0 ? 'next' : 'prev';
    let i = Math.abs(position);
    let n = this;
    while(n && i > 0) {
      n = n[dir];
      i--;
    }
    return n;
  }
  find(val, start) {
    if (this.value === val) {
      return this;
    }
    if (this.value === start) {
      return null;
    }
    return this.next.find(val, typeof start === 'undefined' ? this.value : start);
  }
}

const m0 = new ListNode(0);
const m1 = new ListNode(1);
const m2 = new ListNode(2);

//Link m0 -> m2
m0.next = m2;
m2.prev = m0;
//Link m0 -> m2
m2.next = m1;
m1.prev = m2;

//Link m1 -> m0
m0.prev = m1;
m1.next = m0;

let curr = m2;

let count = 3;
let turn = 3;

for(let i = 3; i <= LAST_POINT; i++) {
  if (i % 23 === 0) {
    const m = curr.seek(-7);
    curr = m.next;
    const points = i + m.value;
    curr.prev = m.prev;
    m.prev.next = curr;
    scores[turn] += points;
  } else {
    const n = new ListNode(i);
    const prev = curr.next;
    const next = curr.next.next;
    n.prev = prev;
    prev.next = n;
    n.next = next;
    next.prev = n;
    curr = n;
  }
  count++;
  turn = i % PLAYER_COUNT;
}

function dumpList() {
  let n = m0.next;
  const vals = [m0.value];
  while(n.value !== 0) {
    vals.push(n.value);
    n = n.next;
  }
  console.log(vals.join(', '));
}

const topScore = scores.reduce((a, v) => v > a ? v : a, 0);
const winner = scores.findIndex((v) => v === topScore) + 1;
console.log(`Player ${winner} won with ${topScore} points`);
