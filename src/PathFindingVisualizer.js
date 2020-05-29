import React, { useState, useEffect } from "react";
import Node from "./Node";
import {
  getInitialGrid,
  getNewGridWithWallToggled,
  getRandomVertex,
  getNewGridWitNewStart,
} from "./helpers";
import Nav from "./Nav";
import "./PathFindingVisualizer.css";
import { wallAnimation, clearAnimation } from "./animations";
import useToggleState from "./hooks/useToggleState";

export default function PathFindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [disable, setDisable] = useState(false);
  const [startVertex, setStarteVertex] = useState(getRandomVertex());
  const [finishVertex, setFinishVertex] = useState(getRandomVertex());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [createWall, setCreatWall, toggleCreateWall] = useToggleState(false);
  const [changeStart, setChangeStart, toggleChangeStart] = useToggleState(
    false
  );
  const [changeFinish, setChangeFinish, toggleChangeFinish] = useToggleState(
    false
  );

  useEffect(() => {
    const n = getInitialGrid(startVertex, finishVertex);
    setGrid(n);
  }, [startVertex, finishVertex]);

  const handleKeyPress = (event) => {
    switch (event.key) {
      case "w":
        setChangeStart(false);
        setChangeFinish(false);
        return toggleCreateWall();
      case "s":
        setChangeFinish(false);
        setCreatWall(false);
        return toggleChangeStart();
      case "f":
        setChangeStart(false);
        setCreatWall(false);
        return toggleChangeFinish();
      default:
        return;
    }
  };

  const handleMouseDown = (row, col) => {
    if (createWall) {
      wallAnimation(grid[row][col]);
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    } else if (changeStart) {
      // TODO Change start Node using animation
      const newGrid = getNewGridWitNewStart(grid, row, col, startVertex);
      setStarteVertex(newGrid[row][col].val);
      setGrid(newGrid);
      clearAnimation(newGrid, grid[row][col].val, finishVertex);
      setChangeStart(false);
    } else if (changeFinish) {
      // TODO Change Finish Node using animation
      const newGrid = getNewGridWitNewStart(grid, row, col, finishVertex);
      setFinishVertex(newGrid[row][col].val);
      setGrid(newGrid);
      clearAnimation(newGrid, startVertex, grid[row][col].val);
      setChangeFinish(false);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || !createWall) return;
    wallAnimation(grid[row][col]);
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div onKeyDown={handleKeyPress} tabIndex="0">
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
