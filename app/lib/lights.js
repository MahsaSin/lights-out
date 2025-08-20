const N = 3;

function indexToRC(i) { return [Math.floor(i / N), i % N]; }
function rcToIndex(r, c) { return r * N + c; }

export function neighbors(i) {
  const [r, c] = indexToRC(i);
  const list = [[r, c], [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];
  return list
    .filter(([rr, cc]) => rr >= 0 && rr < N && cc >= 0 && cc < N)
    .map(([rr, cc]) => rcToIndex(rr, cc));
}

export function toggle(grid, idxs) {
  const next = grid.slice();
  for (const i of idxs) next[i] = !next[i];
  return next;
}

export function isSolved(grid) { return grid.every(v => !v); }

export function randomGrid() {
  let g = Array(N * N).fill(false);
  for (let k = 0; k < 6; k++) {
    const i = Math.floor(Math.random() * (N * N));
    g = toggle(g, neighbors(i));
  }
  return g;
}
