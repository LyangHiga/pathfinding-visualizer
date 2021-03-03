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

interface Element {
  key: string;
  props: {
    disabled: boolean;
    onClick: () => void;
    children?: {
      props?: {
        children?: string;
      };
    };
  };
}

describe("Neg Button", () => {
  it("Random size Grid with disable prop false and btn style, should render enable neg btn", () => {
    // Random size grid
    const RANDOM_ROWS = Math.floor(Math.random() * 10) + 1;
    const RANDOM_COLS = Math.floor(Math.random() * 20) + 2;
    // start = 0, target = 1 are guaranteed to exist
    const g = new Grid(0, 1, RANDOM_ROWS, RANDOM_COLS);
    const wrapper = shallow(
      <NegButton
        grid={g}
        disable={false}
        btn={true}
        handleClick={jest.fn()}
        setOpenDrawer={jest.fn()}
        clear={jest.fn()}
        newMaze={jest.fn()}
        setIsWeighted={jest.fn()}
      />
    );
    const btns = wrapper.props().children;
    const negBtn: Element = btns.filter((e: Element) => e.key === "neg-btn")[0];

    expect(negBtn).not.toBeUndefined();
    expect(negBtn).not.toBeNull();
    // typography inside btn named as "Bellman-Ford"
    expect(negBtn.props.children!.props!.children).toBe("Bellman-Ford");
    // onClick func that opens dialog
    expect(negBtn.props.onClick).not.toBeUndefined();
    // should be enable
    expect(negBtn.props.disabled).toBeFalsy();
  });
});
