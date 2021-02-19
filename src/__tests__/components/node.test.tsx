import React from "react";
import { shallow } from "enzyme";
import Node from "../../components/Node";

const handleMouseDown = (row: number, col: number) => {};
const handleMouseEnter = (row: number, col: number) => {};
const handleMouseUp = () => {};

describe("Node", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <Node
        val={1}
        col={1}
        row={1}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
        weight={10}
        isWeighted={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});
