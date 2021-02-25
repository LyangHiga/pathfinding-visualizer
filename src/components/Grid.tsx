import React from "react";

import Node from "./Node";

import { GridProps } from "./types/GridTypes";

function Grid(props: GridProps) {
  const {
    grid,
    isWeighted,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = props;

  return (
    <div style={{ textAlign: "center" }}>
      {grid.grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node) => {
              const { row, col, val, weight } = node;
              return (
                <Node
                  key={val}
                  val={val}
                  col={col}
                  row={row}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  weight={weight}
                  isWeighted={isWeighted}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
