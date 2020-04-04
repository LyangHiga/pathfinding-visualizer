import React, { useState, useEffect } from 'react';
import Node from './Node';
import { getInitialGrid } from './helpers';
import bfs from './algorithms/bfs';
import { clear } from './animations';
import './PathFindingVisualizer.css';

export default function PathFindingVisualizer() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const n = getInitialGrid();
    setGrid(n);
  }, []);

  console.log(grid);

  return (
    <div>
      <div className="nav">
        <h1>Path Finding</h1>
        <button onClick={() => bfs(grid)}>bfs</button>
        <button onClick={() => clear(grid)}>clear</button>
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node) => {
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
