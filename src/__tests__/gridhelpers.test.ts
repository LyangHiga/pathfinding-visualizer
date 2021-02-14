import { getRandomNode } from "../helpers/gridHelper";

const NCOLS = 2;
const NROWS = 2;

test("val between [0, (nCols * nRows) - 1]", () => {
  const node = getRandomNode(NROWS, NCOLS);

  expect(node >= 0).toBeTruthy();
  expect(node < NCOLS * NROWS).toBeTruthy();
});
