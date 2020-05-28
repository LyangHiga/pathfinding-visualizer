const sleep = (m) => new Promise((r) => setTimeout(r, m));

export const pathAnimation = async (path) => {
  let vertex;
  for (let i = 0; i < path.length; i++) {
    vertex = document.getElementById(`node-${path[i]}`).style;
    await sleep(5);
    vertex.backgroundColor = "yellow";
  }
};

export const visitedAnimation = async (v, start, end) => {
  if (v === end) return;
  if (v === start) return;
  const vertex = document.getElementById(`node-${v}`).style;
  await sleep(5);
  vertex.backgroundColor = "blue";
};

export const clearAnimation = (grid, startVal, finishVal) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const v = grid[i][j];
      const vertex = document.getElementById(`node-${v.val}`).style;
      vertex.backgroundColor = "white";
      if (v.val === startVal) {
        const start = document.getElementById(`node-${v.val}`).style;
        start.backgroundColor = "green";
      }
      if (v.val === finishVal) {
        const start = document.getElementById(`node-${v.val}`).style;
        start.backgroundColor = "red";
      }
    }
  }
};

export const wallAnimation = async (v) => {
  if (v.isStart || v.isFinish) return;
  const vertex = document.getElementById(`node-${v.val}`).style;
  await sleep(1);
  vertex.backgroundColor = "rgb(12, 53, 71)";
};
