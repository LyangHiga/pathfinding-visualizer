import React, { useState, useEffect } from 'react';
import Node from './Node';

export default function PathFindingVisualizer() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    let n = [];
    for (let row = 0; row < 20; row++) {
      let currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push([]);
      }
      n.push(currentRow);
    }
    setGrid(n);
  }, []);

  console.log(grid);
  return (
    <div>
      <h1>Path Finding</h1>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col } = node;
                return (
                  <Node key={`${rowIdx}-${nodeIdx}`} col={col} row={row}></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
