// TODO: Change start and finish node in mobile node, reorganize files
// TODO: Refactoring with TypeSCript
// TODO: Handle state with useReducer !? is probably better
// TODO: Context api to global state is probably better than share state using props

import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import GridModel from "./models/Grid";

import Nav from "./components/Nav";
import GridComponent from "./components/Grid";

import useToggleState from "./hooks/useToggleState";
import useWindowDimensions from "./hooks/useWindowDim";

import {
  getNRowsandNCols,
  getRandomNode,
  changeStartNode,
  changeTargetNode,
} from "./helpers/gridHelper";

import {
  wallAnimation,
  startNodeAnimation,
  finishNodeAnimation,
  clearNodeAnimation,
  sleep,
} from "./helpers/animations";

import { MAX } from "./helpers/consts";

function App() {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [nRows, nCols] = getNRowsandNCols(matchesSM, height, width);
  const [isWeighted, setIsWeighted, toggleIsweighted] = useToggleState();
  const [isNegative, setIsNegative, toggleIsNegative] = useToggleState();
  //   disable buttons in nav
  const [disable, setDisable] = useState(false);
  const [grid, setGrid] = useState<GridModel>();

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [createWall, setCreatWall, toggleCreateWall] = useToggleState(false);
  const [changeStart, setChangeStart, toggleChangeStart] = useToggleState(
    false
  );
  const [changeTarget, setChangeTarget, toggleChangeTarget] = useToggleState(
    false
  );

  //   run only once, similar to Component Did mount
  useEffect(() => {
    const initialGrid = async () => {
      const start = getRandomNode(nRows, nCols);
      const target = getRandomNode(nRows, nCols);
      const g = new GridModel(start, target, nRows, nCols, MAX);
      setGrid(g);
      await sleep(1);
      startNodeAnimation(start);
      finishNodeAnimation(target);
    };
    initialGrid();
  }, []);

  const handleChangeStart = () => {
    setChangeTarget(false);
    setCreatWall(false);
    toggleChangeStart();
  };

  const handleChangeTarget = () => {
    setChangeStart(false);
    setCreatWall(false);
    toggleChangeTarget();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "w":
        setChangeStart(false);
        setChangeTarget(false);
        return toggleCreateWall();
      case "s":
        return handleChangeStart();
      case "f":
        return handleChangeTarget();
      default:
        return;
    }
  };

  const handleMouseDown = (row: number, col: number) => {
    if (createWall) {
      wallAnimation(grid!.grid[row][col]);
      // const newGrid = getNewGridWithWallToggled(grid!, row, col);
      // setGrid(newGrid);
      setMouseIsPressed(true);
    } else if (changeStart) {
      clearNodeAnimation(grid!.start);
      // we will change 2 nodes inside from grid.grid out of setState
      changeStartNode(grid!, grid!.grid[row][col]);
      // changing start property of grid using setState
      setGrid({ ...grid!, start: grid!.grid[row][col].val });
      startNodeAnimation(grid!.grid[row][col].val);
      setChangeStart(false);
    } else if (changeTarget) {
      clearNodeAnimation(grid!.target);
      // we will change 2 nodes inside from grid.grid out of setState
      changeTargetNode(grid!, grid!.grid[row][col]);
      // changing target property of grid using setState
      setGrid({ ...grid!, target: grid!.grid[row][col].val });
      finishNodeAnimation(grid!.grid[row][col].val);
      setChangeTarget(false);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || !createWall) return;
    wallAnimation(grid!.grid[row][col]);
    // const newGrid = getNewGridWithWallToggled(grid!, row, col);
    // setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div onKeyDown={handleKeyPress} tabIndex={0}>
      {!grid ? null : (
        <Nav
          grid={grid!}
          setGrid={setGrid}
          disable={disable}
          setDisable={setDisable}
          isWeighted={isWeighted}
          setIsWeighted={setIsWeighted}
          toggleIsweighted={toggleIsweighted}
          isNegative={isNegative}
          toggleIsNegative={toggleIsNegative}
          handleChangeStart={handleChangeStart}
          handleChangeTarget={handleChangeTarget}
        />
      )}
      <div className="grid">
        {!grid ? null : (
          <GridComponent
            grid={grid}
            isWeighted={isWeighted}
            handleMouseDown={handleMouseDown}
            handleMouseEnter={handleMouseEnter}
            handleMouseUp={handleMouseUp}
          />
        )}
      </div>
    </div>
  );
}

export default App;
