const sleep = (m) => new Promise((r) => setTimeout(r, m));

export async function pathAnimation(path) {
  let vertex;
  for (let i = 0; i < path.length; i++) {
    vertex = document.getElementById(`node-${path[i]}`).style;
    await sleep(1);
    vertex.backgroundColor = 'yellow';
  }
}

export async function visitedAnimation(v, end) {
  if (v === end.val) return;
  const vertex = document.getElementById(`node-${v}`).style;
  await sleep(10);
  vertex.backgroundColor = 'blue';
}

export const clear = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const v = grid[i][j];
      if (!v.isStart && !v.isFinish) {
        const vertex = document.getElementById(`node-${v.val}`).style;
        vertex.backgroundColor = 'white';
      }
    }
  }
};
