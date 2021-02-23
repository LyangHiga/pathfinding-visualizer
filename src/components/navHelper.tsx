import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import { valToIndx } from "../helpers/gridHelper";
import { clearPathAnimation } from "../helpers/animations";
import { BtnOptListParams, UnWBtnsListParams } from "./types/NavHelperTypes";

export const createBtnOptList = (params: BtnOptListParams) => {
  const {
    grid,
    isNegative,
    isWeighted,
    disable,
    handleClick,
    clear,
    newMaze,
    handleChangeStart,
    handleChangeTarget,
    negativeWeight,
    toggleIsweighted,
  } = params;
  return [
    { name: "Clear", click: () => clear(), disabled: disable },
    {
      name: "Clear Path",
      click: () => clearPathAnimation(grid),
      disabled: disable,
    },
    { name: "Maze", click: () => handleClick(newMaze()), disabled: disable },
    {
      name: "Change Start",
      click: () => handleChangeStart(),
      disabled: disable,
    },
    {
      name: "Change Target",
      click: () => handleChangeTarget(),
      disabled: disable,
    },
    {
      name: isWeighted ? "Unweighted Grid" : "Weighted Grid",
      click: () => toggleIsweighted(),
      disabled: disable,
    },
    {
      name: isNegative ? "Positive" : "Negative",
      click: negativeWeight,
      disabled: disable,
    },
  ];
};

export const createUnWBtnsList = (params: UnWBtnsListParams) => {
  const { grid, start, target, isWeighted, disable, handleClick } = params;
  const [rowTarget, colTarget] = valToIndx(target, grid.nCols);
  const [rowStart, colStart] = valToIndx(start, grid.nCols);
  return [
    {
      name: "BFS",
      click: () => {
        handleClick(
          bfs(
            grid,
            grid.grid[rowStart][colStart],
            grid.grid[rowTarget][colTarget]
          )
        );
      },
      disabled: isWeighted ? true : disable,
    },
    {
      name: "DFS",
      click: () =>
        handleClick(
          dfs(
            grid,
            grid.grid[rowStart][colStart],
            grid.grid[rowTarget][colTarget]
          )
        ),
      disabled: isWeighted ? true : disable,
    },
  ];
};
