// test with different g sizes, btn or drawer, disable or not
// differnt values of alpha

import React from "react";
import { shallow } from "enzyme";
import WeightedButton from "../../components/WeightedButton";
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
describe("Node", () => {
  it("renders correctly", () => {
    const grid = new Grid(START, TARGET, NROWS, NCOLS);
    const wrapper = shallow(
      <WeightedButton
        grid={grid}
        disable={true}
        btn={true}
        handleClick={jest.fn()}
        setOpenDrawer={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});

interface element {
  key: string;
  props: {
    disabled: boolean;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    children?:
      | {
          [idx: number]: number | string;
        }
      | string;
  };
}

it("Random size Grid with disable prop false and btn style, should render slider, name of the function and algorithm btn ", () => {
  // Random size grid
  const RANDOM_ROWS = Math.floor(Math.random() * 10) + 1;
  const RANDOM_COLS = Math.floor(Math.random() * 20) + 2;
  // start = 0, target = 1 are guaranteed to exist
  const g = new Grid(0, 1, RANDOM_ROWS, RANDOM_COLS);
  // disable false
  // btn ture
  const wrapper = shallow(
    <WeightedButton
      grid={g}
      disable={false}
      btn={true}
      handleClick={jest.fn()}
      setOpenDrawer={jest.fn()}
    />
  );

  const weightedBtns: element[] = wrapper.props().children;
  const slider = weightedBtns.filter((e) => e.key === "slider")[0];
  const alpha = weightedBtns.filter((e) => e.key === "alpha")[0];
  const btn = weightedBtns.filter((e) => e.key === "alg-btn")[0];

  expect(slider).not.toBeUndefined();
  expect(slider).not.toBeNull();
  expect(slider.props.disabled).toBeFalsy();
  expect(slider.props.min).toBe(0);
  expect(slider.props.max).toBe(1);
  expect(slider.props.step).toBe(0.01);

  expect(alpha).not.toBeUndefined();
  expect(alpha).not.toBeNull();
  // default val of Alpha
  expect(alpha.props.children![1]).toBe(0.57);

  expect(btn).not.toBeUndefined();
  expect(btn).not.toBeNull();
  expect(btn.props.disabled).toBeFalsy();
  // Btn name for default val of Alpha(0.57)
  expect(btn.props.children).toBe("A*");
});

it("Random size Grid with disable prop true and btn style, should render slider disabled, name of the function and algorithm btn disabled ", () => {
  // Random size grid
  const RANDOM_ROWS = Math.floor(Math.random() * 10) + 1;
  const RANDOM_COLS = Math.floor(Math.random() * 20) + 2;
  // start = 0, target = 1 are guaranteed to exist
  const g = new Grid(0, 1, RANDOM_ROWS, RANDOM_COLS);
  // disable true
  // btn true
  const wrapper = shallow(
    <WeightedButton
      grid={g}
      disable={true}
      btn={true}
      handleClick={jest.fn()}
      setOpenDrawer={jest.fn()}
    />
  );

  const weightedBtns: element[] = wrapper.props().children;
  const slider = weightedBtns.filter((e) => e.key === "slider")[0];
  const alpha = weightedBtns.filter((e) => e.key === "alpha")[0];
  const btn = weightedBtns.filter((e) => e.key === "alg-btn")[0];

  expect(slider).not.toBeUndefined();
  expect(slider).not.toBeNull();
  expect(slider.props.disabled).toBeTruthy();
  expect(slider.props.min).toBe(0);
  expect(slider.props.max).toBe(1);
  expect(slider.props.step).toBe(0.01);

  expect(alpha).not.toBeUndefined();
  expect(alpha).not.toBeNull();
  // default val of Alpha
  expect(alpha.props.children![1]).toBe(0.57);

  expect(btn).not.toBeUndefined();
  expect(btn).not.toBeNull();
  expect(btn.props.disabled).toBeTruthy();
  // Btn name for default val of Alpha(0.57)
  expect(btn.props.children).toBe("A*");
});
