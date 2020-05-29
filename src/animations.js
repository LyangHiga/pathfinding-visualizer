const sleep = (m) => new Promise((r) => setTimeout(r, m));

export const pathAnimation = async (path) => {
  let vertex;
  for (let i = 0; i < path.length; i++) {
    await sleep(12);
    changingPropAnimation(path[i], 'yellow');
  }
};

export const visitedAnimation = async (val, start, end) => {
  if (val === end) return;
  if (val === start) return;
  await sleep(7);
  changingPropAnimation(val, 'blue');
};

export const clearAnimation = (grid, startVal, finishVal) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const v = grid[i][j];
      changingPropAnimation(v.val, 'white');
      if (v.val === startVal) {
        changingPropAnimation(v.val, 'green');
      }
      if (v.val === finishVal) {
        changingPropAnimation(v.val, 'red');
      }
    }
  }
};

const changingPropAnimation = (val, color) => {
  const vertex = document.getElementById(`node-${val}`).style;
  vertex.backgroundColor = `${color}`;
};

export const wallAnimation = async (v) => {
  if (v.isStart || v.isFinish) return;
  await sleep(1);
  changingPropAnimation(v.val, 'rgb(12, 53, 71)');
};

export const startNodeAnimation = (val) => {
  changingPropAnimation(val, 'green');
};

export const finishNodeAnimation = (val) => {
  changingPropAnimation(val, 'red');
};

export const clearNodeAnimation = (val) => {
  changingPropAnimation(val, 'white');
};

export const clearPathAnimation = (grid) => {
  let vertex;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const v = grid[i][j];
      vertex = document.getElementById(`node-${v.val}`).style;
      if (
        vertex.backgroundColor === 'blue' ||
        vertex.backgroundColor === 'yellow'
      ) {
        clearNodeAnimation(v.val, 'white');
      }
    }
  }
};
