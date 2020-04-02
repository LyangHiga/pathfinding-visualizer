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
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL
    };
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

  console.log(grid);

  return (
    <div>
      <h1>Path Finding</h1>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isStart, isFinish } = node;
                return (
                  <Node
                    key={rowIdx * NUM_COL + nodeIdx}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
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
