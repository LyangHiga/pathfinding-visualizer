import React from "react";
import { shallow } from "enzyme";
import NegButton from "../../components/NegButton";
import Grid from "../../models/Grid";

const START = 10;
const TARGET = 14;

const NCOLS = 5;
const NROWS = 5;

//       0  1   2   3   4
//       5  6   7   8   9
// g =   S  11  12  13  T
//      15  16  17  18  19
//      20  21  22  23  24
describe("Neg Button", () => {
  it("renders correctly", () => {
    const grid = new Grid(START, TARGET, NROWS, NCOLS);
    const wrapper = shallow(
      <NegButton
        grid={grid}
        disable={true}
        btn={true}
        handleClick={jest.fn()}
        setOpenDrawer={jest.fn()}
        clear={jest.fn()}
        newMaze={jest.fn()}
        setIsWeighted={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});