import Grid from "../../models/Grid";
import bfs from "../../algorithms/bfs";
import { valToIndx, toggleIsWall } from "../../helpers/gridHelper";

const START = 10;
const TARGET = 14;
const U = 2;
const V = 7;
const X = 12;
const Y = 17;
const Z = 22;

const NCOLS = 5;
const NROWS = 5;

//       0  1   2   3   4
//       5  6   7   8   9
// g =   S  11  12  13  T
//      15  16  17  18  19
//      20  21  22  23  24
test("BFS: min path from S to T without walls", async () => {
  // create grid
  const g = new Grid(START, TARGET, NROWS, NCOLS);

  // get row and col of start and target
  const [startRow, startCol] = valToIndx(START, NCOLS);
  const [targetRow, targetCol] = valToIndx(TARGET, NCOLS);

  const { path, parents, visited } = await bfs(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    true
  );
  // path from S to T
  expect(path![0]).toBe(11);
  expect(path![1]).toBe(12);
  expect(path![2]).toBe(13);
  // T was visited
  expect(visited.get(TARGET)).toBeTruthy();
  // 13 is the father of T
  expect(parents.get(TARGET)).toBe(13);
});

//       0  1   2   3   4      0   1   X   3   4
//       5  6   7   8   9      5   6   X   8   9
// g =   S  11  12  13  T  =>  S   11  X   13  T
//      15  16  17  18  19     15  16  X   18  19
//      20  21  22  23  24     20  21  X   23  24
test("BFS: start and target nodes are not in the same connected component", async () => {
  // create grid
  const g = new Grid(START, TARGET, NROWS, NCOLS);

  // get row and col of start and target
  const [startRow, startCol] = valToIndx(START, NCOLS);
  const [targetRow, targetCol] = valToIndx(TARGET, NCOLS);

  // make nodes: 2,7,12,17,22 walls
  const [uRow, uCol] = valToIndx(U, NCOLS);
  const [vRow, vCol] = valToIndx(V, NCOLS);
  const [xRow, xCol] = valToIndx(X, NCOLS);
  const [yRow, yCol] = valToIndx(Y, NCOLS);
  const [zRow, zCol] = valToIndx(Z, NCOLS);

  toggleIsWall(g.grid[uRow][uCol]);
  toggleIsWall(g.grid[vRow][vCol]);
  toggleIsWall(g.grid[xRow][xCol]);
  toggleIsWall(g.grid[yRow][yCol]);
  toggleIsWall(g.grid[zRow][zCol]);
  const { path, parents, visited } = await bfs(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    true
  );
  expect(path).toBeNull();
  expect(visited.get(TARGET)).toBeUndefined();
  expect(parents.get(TARGET)).toBeUndefined();
});
