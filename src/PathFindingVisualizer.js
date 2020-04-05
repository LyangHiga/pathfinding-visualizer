import React, { useState, useEffect } from 'react';
import Node from './Node';
import { getInitialGrid } from './helpers';
import Nav from './Nav';
import './PathFindingVisualizer.css';

export default function PathFindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const n = getInitialGrid();
    setGrid(n);
  }, []);

  return (
    <div>
      <Nav grid={grid} disable={disable} setDisable={setDisable} />
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
