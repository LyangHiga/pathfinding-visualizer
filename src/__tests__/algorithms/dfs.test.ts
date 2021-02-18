import Grid from "../../models/Grid";
import dfs from "../../algorithms/dfs";
import { valToIndx, toggleIsWall } from "../../helpers/gridHelper";

const START = 11;
const TARGET = 13;
const U = 2;
const V = 7;
const X = 12;
const Y = 17;
const Z = 22;

const NCOLS = 5;
const NROWS = 5;

//       0  1   2   3   4      0   1   X   3   4
//       5  6   7   8   9      5   6   X   8   9
// g =  10  S   12  T   14  => 10  S   X   T   14
//      15  16  17  18  19     15  16  X   18  19
//      20  21  22  23  24     20  21  X   23  24
test("DFS: start and target nodes are not in the same connected component", async () => {
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
  const { path, parents, visited } = await dfs(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    true
  );
  expect(visited.get(TARGET)).toBeUndefined();
  expect(parents.get(TARGET)).toBeUndefined();
  expect(path).toBeNull();
});
