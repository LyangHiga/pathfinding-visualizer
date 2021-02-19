import Grid from "../../models/Grid";
import bellmanFord from "../../algorithms/bellmanFord";
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
const TEST = true;

//       0  1   2   3   4
//       5  6   7   8   9
// g =   S  11  12  13  T
//      15  16  17  18  19
//      20  21  22  23  24
test("Bellman-Ford: Negative Cycle", async () => {
  const min = -5;
  const max = -1;
  const g = new Grid(START, TARGET, NROWS, NCOLS, max, min);

  // get row and col of start and target
  const [startRow, startCol] = valToIndx(START, NCOLS);
  const [targetRow, targetCol] = valToIndx(TARGET, NCOLS);

  const { cycle, path } = await bellmanFord(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    TEST
  );
  expect(cycle).toBeTruthy();
  expect(path).toBeNull();
});

//       0  1   2   3   4
//       5  6   7   8   9
// g =   S  11  12  13  T
//      15  16  17  18  19
//      20  21  22  23  24
test("Bellman-Ford: Test Path when all nodes have the same positive weight", async () => {
  // weight is in [min,max) ,iow all weights are 1
  const min = 1;
  const max = 2;
  const g = new Grid(START, TARGET, NROWS, NCOLS, max, min);

  // get row and col of start and target
  const [startRow, startCol] = valToIndx(START, NCOLS);
  const [targetRow, targetCol] = valToIndx(TARGET, NCOLS);

  const { cycle, path } = await bellmanFord(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    TEST
  );
  expect(cycle).toBeFalsy();
  expect(path![0]).toBe(11);
  expect(path![1]).toBe(12);
  expect(path![2]).toBe(13);
});

//       0  1   2   3   4      0   1   X   3   4
//       5  6   7   8   9      5   6   X   8   9
// g =   S  11  12  13  T  =>  S   11  X   13  T
//      15  16  17  18  19     15  16  X   18  19
//      20  21  22  23  24     20  21  X   23  24
test("Bellman-Ford: start and target nodes in different connected component, all nodes with the same positive weight ", async () => {
  // weight is in [min,max) ,iow all weights are 1
  const min = 1;
  const max = 2;
  const g = new Grid(START, TARGET, NROWS, NCOLS, max, min);

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
  const { cycle, path, parents } = await bellmanFord(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    TEST
  );
  expect(cycle).toBeFalsy();
  expect(path).toBeNull();
  expect(parents.get(TARGET)).toBeUndefined();
});
