import React, { useState, useEffect } from 'react';
import Node from './Node';
import {
  START_NODE_COL,
  FINISH_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW,
  NUM_COL,
  NUM_ROW
} from './consts';

export default function PathFindingVisualizer() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const n = getInitialGrid();
    setGrid(n);
  }, []);

  const createNode = (col, row) => {
    const val = row * NUM_COL + col;
    const adjList = createAdjList(val, col, row);

    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      adjList: adjList,
      val: val
    };
  };

  //    A     B     C
  //    D    VAL    E
  //    F     G     H
  // return all neighbours of VAL
  const createAdjList = (val, col, row) => {
    //   neighbours in a line above
    // negative numbers arent a node
    const b = row !== 0 ? val - NUM_COL : null;
    // check negative numbers and left border
    const a = b !== null && col !== 0 ? b - 1 : null;
    // check negative numbers and right border
    const c = b !== null && col !== NUM_COL - 1 ? b + 1 : null;
    // neighbours in the same line
    // check left border
    const d = col !== 0 ? val - 1 : null;
    // check right border
    const e = col !== NUM_COL - 1 ? val + 1 : null;
    //  neighbours in a line bellow
    // check overflow
    const g = row !== NUM_ROW - 1 ? val + NUM_COL : null;
    // check over flow and left border
    const f = g !== null && col !== 0 ? g - 1 : null;
    // check overflow and right border
    const h = g !== null && col !== NUM_COL - 1 ? g + 1 : null;

    return { a, b, c, d, e, f, g, h };
  };

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < NUM_ROW; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COL; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  //   add bfs
  const bfs = () => {};

  console.log(grid);
  return (
    <div>
      <h1>Path Finding</h1>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map(node => {
                const { row, col, isStart, isFinish, val, adjList } = node;
                return (
                  <Node
                    key={val}
                    val={val}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
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
