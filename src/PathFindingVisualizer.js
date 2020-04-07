import React, { useState, useEffect } from "react";
import Node from "./Node";
import {
  getInitialGrid,
  getNewGridWithWallToggled,
  getRandomVertex,
} from "./helpers";
import Nav from "./Nav";
import "./PathFindingVisualizer.css";
import { wallAnimation } from "./animations";

export default function PathFindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [disable, setDisable] = useState(false);
  const [startVertex, setStarteVertex] = useState(getRandomVertex());
  const [finishVertex, setFinishVertex] = useState(getRandomVertex());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    const n = getInitialGrid(startVertex, finishVertex);
    setGrid(n);
  }, [startVertex, finishVertex]);

  const handleMouseDown = (row, col) => {
    wallAnimation(grid[row][col]);
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    wallAnimation(grid[row][col]);
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div>
      <Nav
        grid={grid}
        setGrid={setGrid}
        disable={disable}
        setDisable={setDisable}
        start={startVertex}
        end={finishVertex}
      />
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node) => {
                const {
                  row,
                  col,
                  isStart,
                  isFinish,
                  isWall,
                  val,
                  adjList,
                } = node;
                return (
                  <Node
                    key={val}
                    val={val}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                    adjList={adjList}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
