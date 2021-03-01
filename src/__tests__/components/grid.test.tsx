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

it("Render a Grid with RANDOM_ROWS and RANDOM_COLS", () => {
  const RANDOM_ROWS = Math.floor(Math.random() * 10);
  const RANDOM_COLS = Math.floor(Math.random() * 20);
  const g = new GridModel(START, TARGET, RANDOM_ROWS, RANDOM_COLS);
  const wrapper = shallow(
    <Grid
      grid={g}
      isWeighted={true}
      handleMouseDown={jest.fn()}
      handleMouseEnter={jest.fn()}
      handleMouseUp={jest.fn()}
    />
  );
  // Check if Grid has (<RANDOM_ROWS>) rows
  expect(wrapper.props().children.length).toBe(RANDOM_ROWS);
  // Check if Grid has (<RANDOM_COLS>) rows
  expect(wrapper.props().children[0].props.children.length).toBe(RANDOM_COLS);
});

it("Render an unweighted Grid", () => {
  const RANDOM_ROWS = Math.floor(Math.random() * 10);
  const RANDOM_COLS = Math.floor(Math.random() * 20);
  const g = new GridModel(START, TARGET, RANDOM_ROWS, RANDOM_COLS);
  const wrapper = shallow(
    <Grid
      grid={g}
      isWeighted={false}
      handleMouseDown={jest.fn()}
      handleMouseEnter={jest.fn()}
      handleMouseUp={jest.fn()}
    />
  );
  expect(wrapper.props().children.length).toBe(RANDOM_ROWS);
  expect(wrapper.props().children[0].props.children.length).toBe(RANDOM_COLS);
  // check if Grid is unweighted
  expect(wrapper.props().children[0].props.children[0].props.isWeighted);
});
