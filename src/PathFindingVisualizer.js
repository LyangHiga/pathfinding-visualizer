import React, { useState, useEffect } from 'react';
import Node from './Node';

const START_NODE_ROW = 5;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

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
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

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
                    key={`${rowIdx}-${nodeIdx}`}
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
