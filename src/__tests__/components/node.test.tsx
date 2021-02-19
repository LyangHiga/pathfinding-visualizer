import React from "react";
import { shallow } from "enzyme";
import Node from "../../components/Node";

describe("Node", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <Node
        val={1}
        col={1}
        row={1}
        onMouseDown={jest.fn()}
        onMouseEnter={jest.fn()}
        onMouseUp={jest.fn()}
        weight={10}
        isWeighted={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});
