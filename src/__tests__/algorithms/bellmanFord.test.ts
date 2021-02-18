import Grid from "../../models/Grid";
import bellmanFord from "../../algorithms/bellmanFord";
import { valToIndx } from "../../helpers/gridHelper";

const START = 10;
const TARGET = 14;

const NCOLS = 5;
const NROWS = 5;
const MIN = -5;
const MAX = -1;

//       0  1   2   3   4
//       5  6   7   8   9
// g =   S  11  12  13  T
//      15  16  17  18  19
//      20  21  22  23  24
test("Bellman-Ford: Negative Cycle", async () => {
  const g = new Grid(START, TARGET, NROWS, NCOLS, MAX, MIN);

  // get row and col of start and target
  const [startRow, startCol] = valToIndx(START, NCOLS);
  const [targetRow, targetCol] = valToIndx(TARGET, NCOLS);

  const { cycle, path } = await bellmanFord(
    g,
    g.grid[startRow][startCol],
    g.grid[targetRow][targetCol],
    true
  );
  expect(cycle).toBeTruthy();
  expect(path).toBeNull();
});
