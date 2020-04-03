import {
  START_NODE_COL,
  FINISH_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW,
  NUM_COL,
  NUM_ROW
} from './consts';

const createNode = (col, row) => {
  const val = row * NUM_COL + col;
  const adjList = createAdjList(val, col, row);

  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    adjList: adjList,
    val: val
  };
};

//         A
//    B   VAL  D
//         C
// return all neighbours of VAL
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

export const valToIndx = val => {
  // const val = row * NUM_COL + col;
  const row = Math.floor(val / NUM_COL);
  const col = val - row * NUM_COL;
  // console.log(`row = ${row}, col = ${col}`);
  return { row, col };
};

export const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COL; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
