import { NUM_COL, NUM_ROW } from './consts';
import { wallAnimation } from './animations';

// Node Helpers

// returns a random vertex value
export const getRandomVertex = () => {
  return Math.floor(Math.random() * NUM_COL * NUM_ROW);
};

const createNode = (col, row, start, finish) => {
  const val = row * NUM_COL + col;
  const adjList = createAdjList(val, col, row);

  return {
    col,
    row,
    isStart: val === start,
    isFinish: val === finish,
    isWall: false,
    adjList: adjList,
    val: val,
  };
};

//         A
//    B   VAL  D
//         C
// returns all neighbours of VAL
const createAdjList = (val, col, row) => {
  //   neighbours in a line above
  // negative numbers arent a node
  const a = row !== 0 ? val - NUM_COL : null;
  // neighbours in the same line
  // check left border
  const b = col !== 0 ? val - 1 : null;
  // check right border
  const d = col !== NUM_COL - 1 ? val + 1 : null;
  //  neighbours in a line bellow
  // check overflow
  const c = row !== NUM_ROW - 1 ? val + NUM_COL : null;

  return { a, b, c, d };
};

// returns {row, col} of a vertex val
export const valToIndx = (val) => {
  const row = Math.floor(val / NUM_COL);
  const col = val - row * NUM_COL;
  return [row, col];
};

// Grid Helpers
// returns the initial Grid
export const getInitialGrid = (start, finish) => {
  const grid = [];
  for (let row = 0; row < NUM_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COL; col++) {
      currentRow.push(createNode(col, row, start, finish));
    }
    grid.push(currentRow);
  }
  return grid;
};

const getNewGridWithNewProperty = (grid, row, col, prop, val) => {
  const newGrid = grid.slice();
  const [r, c] = valToIndx(val);
  const oldNode = newGrid[r][c];
  const oldPropToggled = toggleNodeProperty(oldNode, `${prop}`);
  newGrid[r][c] = oldPropToggled;
  const node = newGrid[row][col];
  const newNode = toggleNodeProperty(node, `${prop}`);
  newGrid[row][col] = newNode;
  return newGrid;
};

// returns a new grid after a mouse click (wall is created)
export const getNewGridWithWallToggled = (grid, row, col) => {
  if (grid[row][col].isStart || grid[row][col].isFinish) return grid;
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = toggleNodeProperty(node, 'isWall');
  newGrid[row][col] = newNode;
  return newGrid;
};

// returns a new grid after a mouse click (new start node)
export const getNewGridWitNewStart = (grid, row, col, startVal) => {
  const newGrid = getNewGridWithNewProperty(
    grid,
    row,
    col,
    'isStart',
    startVal
  );
  return newGrid;
};

// returns a new grid after a mouse click (new finish point)
export const getNewGridWitNewFinish = (grid, row, col, finishVal) => {
  const newGrid = getNewGridWithNewProperty(
    grid,
    row,
    col,
    'isFinish',
    finishVal
  );
  return newGrid;
};

// returns a new mazed grid
// a node has eps to be a wall
export const getNewMazedGrid = async (grid, eps) => {
  let newGrid = grid.slice();
  for (let row = 0; row < NUM_ROW; row++) {
    for (let col = 0; col < NUM_COL; col++) {
      if (grid[row][col].isStart || grid[row][col].isFinish) {
        break;
      }
      if (Math.random() <= eps) {
        const node = newGrid[row][col];
        const newNode = toggleNodeProperty(node, 'isWall');
        newGrid[row][col] = newNode;
        await wallAnimation(newGrid[row][col]);
      }
    }
  }
  return newGrid;
};

const toggleNodeProperty = (node, prop) => {
  const newNode = {
    ...node,
    [prop]: !node.prop,
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
  return path.reverse();
};
