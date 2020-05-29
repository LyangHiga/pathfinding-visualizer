import { NUM_COL, NUM_ROW } from '../consts';

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
