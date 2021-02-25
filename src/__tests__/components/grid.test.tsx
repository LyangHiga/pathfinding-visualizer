import React from "react";
import { shallow } from "enzyme";
import Grid from "../../components/Grid";

import GridModel from "../../models/Grid";

const START = 10;
const TARGET = 14;

const NCOLS = 5;
const NROWS = 5;

//       0  1   2   3   4
//       5  6   7   8   9
// g =   S  11  12  13  T
//      15  16  17  18  19
//      20  21  22  23  24
describe("Grid", () => {
  it("renders correctly", () => {
    const g = new GridModel(START, TARGET, NROWS, NCOLS);
    const wrapper = shallow(
      <Grid
        grid={g}
        isWeighted={true}
        handleMouseDown={jest.fn()}
        handleMouseEnter={jest.fn()}
        handleMouseUp={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});
