import Grid from "../../models/Grid";
import { valToIndx, toggleIsWall } from "../../helpers/gridHelper";
import a from "../../algorithms/a";

const START = 10;
const TARGET = 14;
const U = 2;
const V = 7;
const X = 12;
const Y = 17;
const Z = 22;

const NCOLS = 5;
const NROWS = 5;

const BEST_FIRST_SEARCH_ALPHA = 0;
const DIJKSTRA_ALPHA = 1;
const A_ALPHA = 0.57;

const MIN = 1;
const MAX = 201;

//       0  1   2   3   4      0   1   X   3   4
//       5  6   7   8   9      5   6   X   8   9
// g =   S  11  12  13  T  =>  S   11  X   13  T
//      15  16  17  18  19     15  16  X   18  19
//      20  21  22  23  24     20  21  X   23  24
test("Best-First Search: start and target in different connected component", async () => {
  // create grid
  const g = new Grid(START, TARGET, NROWS, NCOLS, MAX, MIN);

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
  const { path, parents } = await a(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    BEST_FIRST_SEARCH_ALPHA,
    true
  );
  expect(path).toBeNull();
  expect(parents.get(TARGET)).toBeUndefined();
});

//       0  1   2   3   4      0   1   X   3   4
//       5  6   7   8   9      5   6   X   8   9
// g =   S  11  12  13  T  =>  S   11  X   13  T
//      15  16  17  18  19     15  16  X   18  19
//      20  21  22  23  24     20  21  X   23  24
test("Dijkstra: start and target in different connected component", async () => {
  // create grid
  const g = new Grid(START, TARGET, NROWS, NCOLS, MAX, MIN);

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
  const { path, parents } = await a(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    DIJKSTRA_ALPHA,
    true
  );
  expect(path).toBeNull();
  expect(parents.get(TARGET)).toBeUndefined();
});

//       0  1   2   3   4      0   1   X   3   4
//       5  6   7   8   9      5   6   X   8   9
// g =   S  11  12  13  T  =>  S   11  X   13  T
//      15  16  17  18  19     15  16  X   18  19
//      20  21  22  23  24     20  21  X   23  24
test("A*: start and target in different connected component", async () => {
  // create grid
  const g = new Grid(START, TARGET, NROWS, NCOLS, MAX, MIN);

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
  const { path, parents } = await a(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    A_ALPHA,
    true
  );
  expect(path).toBeNull();
  expect(parents.get(TARGET)).toBeUndefined();
});
