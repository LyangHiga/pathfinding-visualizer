import { wallAnimation } from "../animations";

// Node Helpers

export const manhattan = (a, b, c, d) => {
  return Math.abs(a - b) + Math.abs(c - d);
};

// returns {row, col} of a vertex val
export const valToIndx = (val, nCols) => {
  const row = Math.floor(val / nCols);
  const col = val - row * nCols;
  return [row, col];
};

// Grid Helpers

const getNewGridWithNewProperty = (grid, row, col, prop, val, nCols) => {
  const newGrid = grid.slice();
  const [r, c] = valToIndx(val, nCols);
  const oldNode = newGrid[r][c];
  const oldPropToggled = toggleNodeProperty(oldNode, prop, false);
  newGrid[r][c] = oldPropToggled;
  const node = newGrid[row][col];
  const newNode = toggleNodeProperty(node, prop, true);
  newGrid[row][col] = newNode;
  return newGrid;
};

// returns a new grid after a mouse click (wall is created)
export const getNewGridWithWallToggled = (grid, row, col) => {
  if (grid[row][col].isStart || grid[row][col].isFinish) return grid;
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = toggleNodeProperty(node, "isWall", !node.isWall);
  newGrid[row][col] = newNode;
  return newGrid;
};

// returns a new grid after a mouse click (new start node)
export const getNewGridWitNewStart = (grid, row, col, startVal, nCols) => {
  const newGrid = getNewGridWithNewProperty(
    grid,
    row,
    col,
    "isStart",
    startVal,
    nCols
  );
  return newGrid;
};

// returns a new grid after a mouse click (new finish point)
export const getNewGridWitNewFinish = (grid, row, col, finishVal, nCols) => {
  const newGrid = getNewGridWithNewProperty(
    grid,
    row,
    col,
    "isFinish",
    finishVal,
    nCols
  );
  return newGrid;
};

// returns a new mazed grid
// a node has eps prob to become a wall
export const getNewMazedGrid = async (grid, eps) => {
  let newGrid = grid.slice();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].isStart || grid[row][col].isFinish) {
        break;
      }
      if (Math.random() <= eps) {
        const node = newGrid[row][col];
        const newNode = toggleNodeProperty(node, "isWall", true);
        newGrid[row][col] = newNode;
        await wallAnimation(newGrid[row][col]);
      }
    }
  }
  return newGrid;
};

const toggleNodeProperty = (node, prop, val) => {
  const newNode = {
    ...node,
    [prop]: val,
  };
  return newNode;
};

//   building path
export const getPath = (parents, end, dist) => {
  let a = parents[end];
  let path = [];
  for (let i = 0; i < dist - 1; i++) {
    path.push(a);
    a = parents[a];
  }
  console.log(`Min Path: ${path.length + 1} squares`);
  return path.reverse();
};

//   building path
export const getWeightedPath = (parents, start, end) => {
  let a = parents[end];
  let path = [];
  while (a !== start) {
    path.push(a);
    a = parents[a];
  }
  return path.reverse();
};
