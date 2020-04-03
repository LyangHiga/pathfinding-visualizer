import React, { useState, useEffect } from 'react';
import Node from './Node';
import Queue from './structures/queue';
import {
  START_NODE_COL,
  FINISH_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW
} from './consts';

import './PathFindingVisualizer.css';

import { valToIndx, getInitialGrid } from './helpers';

export default function PathFindingVisualizer() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const n = getInitialGrid();
    setGrid(n);
  }, []);

  const bfs = () => {
    const start = grid[START_NODE_ROW][START_NODE_COL];
    const end = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visited = {};
    let parents = {};
    let path = [];
    let dist = {};
    let q = new Queue();
    // add start vertex to the queue
    q.enQueue(start);
    // start vertex is already visited
    visited[start.val] = true;
    dist[start.val] = 0;
    parents[start.val] = null;
    // vertex that will be deQueue
    let v;
    while (q.size !== 0) {
      v = q.deQueue().val;
      // check if v is the end vertex
      if (v.val === end.val) {
        //   we find the target
        // parents[end.val] = v.val;
        // dist[end.val] = dist[v.val] + 1;
        break;
      }
      for (const key in v.adjList) {
        const w = v.adjList[key];
        const { row, col } = valToIndx(w);
        //   check w is visited
        if (visited[w] !== true) {
          // w visited
          visited[w] = true;
          //   enQueue w
          q.enQueue(grid[row][col]);
          parents[w] = v.val;
          dist[w] = dist[v.val] + 1;
        }
      }
    }
    let a = parents[end.val];
    for (let i = 0; i < dist[end.val] - 1; i++) {
      path.push(a);
      a = parents[a];
    }
    path = path.reverse();
    console.log(path);
    return { path };
  };

  return (
    <div>
      <div className="nav">
        <h1>Path Finding</h1>
        <button onClick={() => bfs()}>bfs</button>
      </div>
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
