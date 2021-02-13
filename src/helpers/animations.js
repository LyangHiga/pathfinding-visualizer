import { colors } from "./consts";

export const sleep = (m) => new Promise((r) => setTimeout(r, m));

export const pathAnimation = async (path) => {
  for (let i = 0; i < path.length; i++) {
    await sleep(12);
    changingPropAnimation(path[i], colors.yellow);
  }
};

export const visitedAnimation = async (
  val,
  start,
  end,
  color = colors.blue
) => {
  if (val === end) return;
  if (val === start) return;
  await sleep(0.01);
  changingPropAnimation(val, color);
};

export const clearAnimation = (grid, startVal, finishVal) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const v = grid[i][j];
      changingPropAnimation(v.val, colors.white);
      if (v.val === startVal) {
        changingPropAnimation(v.val, colors.green);
      }
      if (v.val === finishVal) {
        changingPropAnimation(v.val, colors.red);
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
  changingPropAnimation(v.val, colors.black);
};

export const startNodeAnimation = (val) => {
  changingPropAnimation(val, colors.green);
};

export const finishNodeAnimation = (val) => {
  changingPropAnimation(val, colors.red);
};

export const clearNodeAnimation = (val) => {
  changingPropAnimation(val, colors.white);
};

export const clearPathAnimation = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const v = grid[i][j];
      if (!v.isStart && !v.isFinish && !v.isWall) {
        clearNodeAnimation(v.val);
      }
    }
  }
};
