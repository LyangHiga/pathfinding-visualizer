import AdjList from "../models/AdjList";

// returns a random vertex value
export const getRandomVertex = (nRows: number, nCols: number) => {
  return Math.floor(Math.random() * nRows * nCols);
};

// convert row x col to val
export const getVal = (row: number, nCols: number, col: number) => {
  return row * nCols + col;
};

//         A
//    B   VAL  D
//         C
// returns all neighbours of VAL
export const createAdjList = (
  val: number,
  col: number,
  row: number,
  nRows: number,
  nCols: number
): AdjList => {
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
