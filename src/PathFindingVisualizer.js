import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Node from "./Node";
import {
  getNewGridWithWallToggled,
  getNewGridWitNewStart,
  getNewGridWitNewFinish,
} from "./helpers/gridPropertiesHelper";
import { getRandomVertex, getInitialGrid } from "./helpers/initialGridHelper";
import Nav from "./Nav";
import "./PathFindingVisualizer.css";
import {
  wallAnimation,
  startNodeAnimation,
  finishNodeAnimation,
  clearNodeAnimation,
  sleep,
} from "./animations";
import useToggleState from "./hooks/useToggleState";
import useWindowDimensions from "./hooks/useWindowDim";

export default function PathFindingVisualizer() {
  // max edge weight
  const wRange = 50;
  const [grid, setGrid] = useState([]);
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  // 87% or 80%(SM display) of total height: discount nav height
  const nRows = matchesSM
    ? Math.floor((height * 0.8) / 27)
    : Math.floor((height * 0.87) / 27);
  const nCols = Math.floor(width / 27);
  const [isWeighted, setIsWeighted, toggleIsweighted] = useToggleState(false);
  //   disable buttons in nav
  const [disable, setDisable] = useState(false);
  const [startVertex, setStarteVertex] = useState(
    getRandomVertex(nRows, nCols)
  );
  const [finishVertex, setFinishVertex] = useState(
    getRandomVertex(nRows, nCols)
  );
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [createWall, setCreatWall, toggleCreateWall] = useToggleState(false);
  const [changeStart, setChangeStart, toggleChangeStart] = useToggleState(
    false
  );
  const [changeFinish, setChangeFinish, toggleChangeFinish] = useToggleState(
    false
  );

  //   run only once, similar to Component Did mount
  useEffect(() => {
    async function initialGrid() {
      document.title = "Pathfinding Visualizer";
      const n = getInitialGrid(startVertex, finishVertex, nRows, nCols, wRange);
      setGrid(n);
      await sleep(1);
      startNodeAnimation(startVertex);
      finishNodeAnimation(finishVertex);
    }
    initialGrid();
  }, []);

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
      clearNodeAnimation(startVertex);
      const newGrid = getNewGridWitNewStart(grid, row, col, startVertex, nCols);
      setStarteVertex(newGrid[row][col].val);
      setGrid(newGrid);
      startNodeAnimation(newGrid[row][col].val);
      setChangeStart(false);
    } else if (changeFinish) {
      clearNodeAnimation(finishVertex);
      const newGrid = getNewGridWitNewFinish(
        grid,
        row,
        col,
        finishVertex,
        nCols
      );
      setFinishVertex(newGrid[row][col].val);
      setGrid(newGrid);
      finishNodeAnimation(newGrid[row][col].val);
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
        nRows={nRows}
        nCols={nCols}
        wRange={wRange}
        isWeighted={isWeighted}
        setIsWeighted={setIsWeighted}
        toggleIsweighted={toggleIsweighted}
      />
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node) => {
                const { row, col, val, adjList, w } = node;
                return (
                  <Node
                    key={val}
                    val={val}
                    col={col}
                    row={row}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                    adjList={adjList}
                    w={w}
                    isWeighted={isWeighted}
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
