import React, { useState, useEffect } from 'react';
import Node from './Node';
import {
  getNewGridWithWallToggled,
  getNewGridWitNewStart,
  getNewGridWitNewFinish,
  getRowsCols,
} from './helpers/gridPropertiesHelper';
import { getRandomVertex, getInitialGrid } from './helpers/initialGridHelper';
import Nav from './Nav';
import './PathFindingVisualizer.css';
import {
  wallAnimation,
  startNodeAnimation,
  finishNodeAnimation,
  clearNodeAnimation,
  sleep,
} from './animations';
import useToggleState from './hooks/useToggleState';

export default function PathFindingVisualizer() {
  const minRows = 20;
  const minCols = 20;
  const wRange = 50;
  const [grid, setGrid] = useState([]);
  const [nRows, setNRows] = useState();
  const [nCols, setNCols] = useState();
  const [isWeighted, setIsWeighted] = useState(false);
  //   disable buttons in nav
  const [disable, setDisable] = useState(false);
  const [startVertex, setStarteVertex] = useState(
    getRandomVertex(minRows, minCols)
  );
  const [finishVertex, setFinishVertex] = useState(
    getRandomVertex(minRows, minCols)
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
      const [nRows, nCols] = getRowsCols();
      setNRows(nRows);
      setNCols(nCols);
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
      case 'w':
        setChangeStart(false);
        setChangeFinish(false);
        return toggleCreateWall();
      case 's':
        setChangeFinish(false);
        setCreatWall(false);
        return toggleChangeStart();
      case 'f':
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
    <div onKeyDown={handleKeyPress} tabIndex='0'>
      <Nav
        grid={grid}
        setGrid={setGrid}
        disable={disable}
        setDisable={setDisable}
        start={startVertex}
        end={finishVertex}
        nRows={nRows}
        nCols={nCols}
        isWeighted={isWeighted}
        setIsWeighted={setIsWeighted}
      />
      <div className='grid'>
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
