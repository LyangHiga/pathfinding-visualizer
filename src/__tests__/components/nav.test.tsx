import React from "react";
import { shallow } from "enzyme";
import Nav from "../../components/Nav";
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

describe("Nav", () => {
  it("renders correctly", () => {
    const grid = new Grid(START, TARGET, NROWS, NCOLS);
    const wrapper = shallow(
      <Nav
        grid={grid}
        disable={false}
        isWeighted={false}
        isNegative={false}
        setGrid={jest.fn()}
        setDisable={jest.fn()}
        setIsWeighted={jest.fn()}
        toggleIsweighted={jest.fn()}
        toggleIsNegative={jest.fn()}
        handleChangeStart={jest.fn()}
        handleChangeTarget={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});

interface Btn {
  key: string;
  props: {
    disabled: boolean;
  };
}

it("Weighted and Negative Grid with disable prop, should render unWeighted btn, positive btn and keep all btns disabled ", () => {
  // Random size grid
  const RANDOM_ROWS = Math.floor(Math.random() * 10) + 1;
  const RANDOM_COLS = Math.floor(Math.random() * 20) + 2;
  // start = 0, target = 1 are guaranteed to exist
  const g = new Grid(0, 1, RANDOM_ROWS, RANDOM_COLS);
  // disable true
  // isWeighted true
  // isNegative false
  const wrapper = shallow(
    <Nav
      grid={g}
      disable={true}
      isWeighted={true}
      isNegative={false}
      setGrid={jest.fn()}
      setDisable={jest.fn()}
      setIsWeighted={jest.fn()}
      toggleIsweighted={jest.fn()}
      toggleIsNegative={jest.fn()}
      handleChangeStart={jest.fn()}
      handleChangeTarget={jest.fn()}
    />
  );

  // Option Btns from Nav component
  const optBtns: (Btn | null)[] = wrapper.props().children.props.children[1]
    .props.children[0].props.children[1].props.children;

  let unWeightedBtn: Btn | null = null;
  let weightedBtn: Btn | null = null;
  let negBtn: Btn | null = null;
  let posBtn: Btn | null = null;
  for (let i = 0; i < optBtns.length; i++) {
    // there are btns only available for mobile
    if (optBtns[i] !== null) {
      if (optBtns[i]!.key === "btnOpt-Unweighted Grid") {
        unWeightedBtn = optBtns[i]!;
      }
      if (optBtns[i]!.key === "btnOpt-Weighted Grid") {
        weightedBtn = optBtns[i];
      }
      if (optBtns[i]!.key === "btnOpt-Negative") {
        negBtn = optBtns[i];
      }
      if (optBtns[i]!.key === "btnOpt-Positive") {
        posBtn = optBtns[i];
      }
    }
  }

  expect(unWeightedBtn).not.toBeUndefined();
  expect(unWeightedBtn).not.toBeNull();
  expect(unWeightedBtn!.props.disabled).toBeTruthy();
  expect(weightedBtn).toBeNull();
  expect(negBtn).not.toBeUndefined();
  expect(negBtn).not.toBeNull();
  expect(negBtn!.props.disabled).toBeTruthy();
  expect(posBtn).toBeNull();
});

it("unWeighted and Positive Grid with disable prop false, should render weighted btn, negative btn and keep all btns enable ", () => {
  // Random size grid
  const RANDOM_ROWS = Math.floor(Math.random() * 10) + 1;
  const RANDOM_COLS = Math.floor(Math.random() * 20) + 2;
  // start = 0, target = 1 are guaranteed to exist
  const g = new Grid(0, 1, RANDOM_ROWS, RANDOM_COLS);
  // disable false
  // isWeighted false
  // isNegative true
  const wrapper = shallow(
    <Nav
      grid={g}
      disable={false}
      isWeighted={false}
      isNegative={true}
      setGrid={jest.fn()}
      setDisable={jest.fn()}
      setIsWeighted={jest.fn()}
      toggleIsweighted={jest.fn()}
      toggleIsNegative={jest.fn()}
      handleChangeStart={jest.fn()}
      handleChangeTarget={jest.fn()}
    />
  );

  // Option Btns from Nav component
  const optBtns: (Btn | null)[] = wrapper.props().children.props.children[1]
    .props.children[0].props.children[1].props.children;

  let unWeightedBtn: Btn | null = null;
  let weightedBtn: Btn | null = null;
  let negBtn: Btn | null = null;
  let posBtn: Btn | null = null;
  for (let i = 0; i < optBtns.length; i++) {
    // there are btns only available for mobile
    if (optBtns[i] !== null) {
      if (optBtns[i]!.key === "btnOpt-Unweighted Grid") {
        unWeightedBtn = optBtns[i]!;
      }
      if (optBtns[i]!.key === "btnOpt-Weighted Grid") {
        weightedBtn = optBtns[i];
      }
      if (optBtns[i]!.key === "btnOpt-Negative") {
        negBtn = optBtns[i];
      }
      if (optBtns[i]!.key === "btnOpt-Positive") {
        posBtn = optBtns[i];
      }
    }
  }

  expect(weightedBtn).not.toBeUndefined();
  expect(weightedBtn).not.toBeNull();
  expect(weightedBtn!.props.disabled).not.toBeTruthy();
  expect(unWeightedBtn).toBeNull();
  expect(posBtn).not.toBeUndefined();
  expect(posBtn).not.toBeNull();
  expect(posBtn!.props.disabled).not.toBeTruthy();
  expect(negBtn).toBeNull();
});
