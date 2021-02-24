// TODO: Change start and finish node in mobile node, reorganize files
// TODO: Refactoring with TypeSCript
// TODO: Handle state with useReducer !? is probably better
// TODO: Context api to global state is probably better than share state using props

import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Node from "./components/Node";
import {
  getNewGridWithWallToggled,
  getNewGridWitNewStart,
  getNewGridWitNewTarget,
  getNRowsandNCols,
} from "./helpers/gridHelper";
import { getRandomNode } from "./helpers/gridHelper";
import Nav from "./components/Nav";
import "./PathFindingVisualizer.css";
import {
  wallAnimation,
  startNodeAnimation,
  finishNodeAnimation,
  clearNodeAnimation,
  sleep,
} from "./helpers/animations";
import useToggleState from "./hooks/useToggleState";
import useWindowDimensions from "./hooks/useWindowDim";
import { MAX } from "./helpers/consts";
import Grid from "./models/Grid";

export default function PathFindingVisualizer() {
  // max edge weight
  const wRange = MAX;
  const [grid, setGrid] = useState([]);
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [nRows, nCols] = getNRowsandNCols(matchesSM, height, width);
  const [isWeighted, setIsWeighted, toggleIsweighted] = useToggleState(false);
  const [isNegative, setIsNegative, toggleIsNegative] = useToggleState(false);
  //   disable buttons in nav
  const [disable, setDisable] = useState(false);
  const [startVertex, setStarteVertex] = useState(getRandomNode(nRows, nCols));
  const [finishVertex, setFinishVertex] = useState(getRandomNode(nRows, nCols));
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [createWall, setCreatWall, toggleCreateWall] = useToggleState(false);
  const [changeStart, setChangeStart, toggleChangeStart] = useToggleState(
    false
  );
  const [changeFinish, setChangeFinish, toggleChangeFinish] = useToggleState(
    false
  );

  const handleChangeStart = () => {
    setChangeFinish(false);
    setCreatWall(false);
    toggleChangeStart();
  };

  const handleChangeFinish = () => {
    setChangeStart(false);
    setCreatWall(false);
    toggleChangeFinish();
  };

  //   run only once, similar to Component Did mount
  useEffect(() => {
    async function initialGrid() {
      document.title = "Pathfinding Visualizer";
      const n = new Grid(startVertex, finishVertex, nRows, nCols, wRange);
      // setGrid(n.grid);
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
        return handleChangeStart();
      case "f":
        return handleChangeFinish();
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
      const newGrid = getNewGridWitNewTarget(
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
        nRows={nRows}
        nCols={nCols}
        wRange={wRange}
        isWeighted={isWeighted}
        setIsWeighted={setIsWeighted}
        toggleIsweighted={toggleIsweighted}
        isNegative={isNegative}
        toggleIsNegative={toggleIsNegative}
        handleChangeStart={handleChangeStart}
        handleChangeFinish={handleChangeFinish}
      />
      <div className="grid">
        {!grid.grid
          ? null
          : grid.grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node) => {
                    const { row, col, val, adjList, weight } = node;
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
                        weight={weight}
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
