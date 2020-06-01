// import { NUM_COL, NUM_ROW } from '../consts';

// returns a random vertex value
export const getRandomVertex = (nRows, nCols) => {
  return Math.floor(Math.random() * nRows * nCols);
};

const createNode = (col, row, start, finish, nRows, nCols) => {
  const val = row * nCols + col;
  const adjList = createAdjList(val, col, row, nRows, nCols);

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
const createAdjList = (val, col, row, nRows, nCols) => {
  //   neighbours in a line above
  // negative numbers arent a node
  const a = row !== 0 ? val - nCols : null;
  // neighbours in the same line
  // check left border
  const b = col !== 0 ? val - 1 : null;
  // check right border
  const d = col !== nCols - 1 ? val + 1 : null;
  //  neighbours in a line bellow
  // check overflow
  const c = row !== nRows - 1 ? val + nCols : null;

  return { a, b, c, d };
};

// returns the initial Grid
export const getInitialGrid = (start, finish, nRows, nCols) => {
  const grid = [];
  for (let row = 0; row < nRows; row++) {
    const currentRow = [];
    for (let col = 0; col < nCols; col++) {
      currentRow.push(createNode(col, row, start, finish, nRows, nCols));
    }
    grid.push(currentRow);
  }
  return grid;
};
