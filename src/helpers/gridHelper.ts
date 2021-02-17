import AdjList from "../models/AdjList";
import Grid from "../models/Grid";
import Node from "../models/Node";

import { wallAnimation } from "./animations";

// returns a random Node by val
export const getRandomNode = (nRows: number, nCols: number) => {
  return Math.floor(Math.random() * nRows * nCols);
};

// returns {row, col} of a node val
export const valToIndx = (val: number, nCols: number) => {
  const row = Math.floor(val / nCols);
  const col = val - row * nCols;
  return [row, col];
};

// convert row x col to val
export const getVal = (row: number, nCols: number, col: number) => {
  return row * nCols + col;
};

export const manhattan = (a: number, b: number, c: number, d: number) => {
  return Math.abs(a - b) + Math.abs(c - d);
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

export const getNRowsandNCols = (
  matchesSM: boolean,
  height: number,
  width: number
) => {
  // 87% or 80%(SM display) of total height: discount nav height
  const nRows = matchesSM
    ? Math.floor((height * 0.8) / 27)
    : Math.floor((height * 0.87) / 27);
  const nCols = Math.floor(width / 27);
  return [nRows, nCols];
};

// to change a boolean property of Node (isStart, isTarget, isWall) to a new prop val
const changeNodeProperty = (node: Node, prop: string, newPropVal: boolean) => {
  switch (prop) {
    case "isStart":
      node.isStart = newPropVal;
      return node;
    case "isTarget":
      node.isTarget = newPropVal;
      return node;
    case "isWall":
      node.isWall = newPropVal;
      return node;
    default:
      console.log(`${prop} is not a property of Node`);
      return null;
  }
};

export const toggleIsWall = (node: Node) => {
  changeNodeProperty(node, "isWall", !node.isWall);
};

// returns a new grid after a mouse click (wall is created)
// probably dont need this function
export const getNewGridWithWallToggled = (
  grid: Grid,
  // row and col of the node to toggle isWall property
  row: number,
  col: number
) => {
  if (grid.grid[row][col].isStart || grid.grid[row][col].isTarget) return grid;
  const newGrid = grid.grid.slice();
  const node = newGrid[row][col];
  const newNode = changeNodeProperty(node, "isWall", !node.isWall)!;
  newGrid[row][col] = newNode;
  return newGrid;
};

// returns a new grid that changes some property (isStart or isTarget) from an oldNode
//  by its val, to a new node by its row and col
const getNewGridWithNewProperty = (
  grid: Grid,
  // row and col of the node that will get a new propperty
  row: number,
  col: number,
  // property to be changed {is}
  // prop: string,
  prop: "isStart" | "isTarget",
  // val of the node that was (start,target or wall) and will be a free node
  val: number
  // nCols: number
) => {
  const newGrid = grid.grid.slice();
  // const [r, c] = valToIndx(val, nCols);
  const [r, c] = valToIndx(val, grid.nCols);
  const oldNode = newGrid[r][c];
  const oldPropToggled = changeNodeProperty(oldNode, prop, false)!;
  newGrid[r][c] = oldPropToggled;
  const node = newGrid[row][col];
  const newNode = changeNodeProperty(node, prop, true);
  newGrid[row][col] = newNode!;
  return newGrid;
};

// returns a new grid with a new start node
export const getNewGridWitNewStart = (
  grid: Grid,
  // row and col of the new isStart
  row: number,
  col: number,
  // val representation of the old isStart
  startVal: number
  //
  // nCols: number
) => {
  const newGrid = getNewGridWithNewProperty(
    grid,
    row,
    col,
    "isStart",
    startVal
    // nCols
  );
  return newGrid;
};

// returns a new grid with a new target point
export const getNewGridWitNewTarget = (
  grid: Grid,
  // row and col of the new isStart
  row: number,
  col: number,
  // val representation of the old isTarget
  targetVal: number
  // nCols
) => {
  const newGrid = getNewGridWithNewProperty(
    grid,
    row,
    col,
    "isTarget",
    targetVal
    // nCols
  );
  return newGrid;
};

// returns a new mazed grid
// a node has eps prob to become a wall,
//  start and target node can not be a wall
// IMPURE Function, changes grid param
// should I make a newGrid: Grid obejct? using overload constructor
// for while just make work
export const getNewMazedGrid = async (grid: Grid, eps: number) => {
  // const newGrid = new Grid()
  const newGrid = grid.grid.slice();
  for (let row = 0; row < grid.grid.length; row++) {
    for (let col = 0; col < grid.grid[row].length; col++) {
      // start and target node can not be a wall
      if (grid.grid[row][col].isStart || grid.grid[row][col].isTarget) {
        break;
      }
      if (Math.random() <= eps) {
        const node = newGrid[row][col];
        const newNode = changeNodeProperty(node, "isWall", true)!;
        newGrid[row][col] = newNode;
        await wallAnimation(newGrid[row][col]);
      }
    }
  }
  grid.grid = newGrid;
  return grid;
};

//   building path
// export const getPath = (parents: Node[], end, dist) => {
//   let a = parents[end];
//   let path = [];
//   for (let i = 0; i < dist - 1; i++) {
//     path.push(a);
//     a = parents[a];
//   }
//   console.log(`Min Path: ${path.length + 1} squares`);
//   return path.reverse();
// };

//   building path
export const getPath = (
  // array of nodes by val representation
  // parents: number[],
  parents: Map<number, number | null>,
  // start node val representation
  startVal: number,
  // target node val representation
  targetVal: number
) => {
  let a = parents.get(targetVal)!;
  let path = [];
  while (a !== startVal) {
    path.push(a);
    a = parents.get(a)!;
  }
  return path.reverse();
};
