import React, { useState, useEffect } from 'react';
import Node from './Node';
import Queue from './structures/queue';
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
  //   const [startNode, setStartNode] = useState();
  //   const [targetNode, setTargetNode] = useState();

  useEffect(() => {
    const n = getInitialGrid();
    setGrid(n);
    // console.log(grid);
    // setStartNode(grid[START_NODE_ROW][START_NODE_COL]);
    // setTargetNode(grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
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

  //         A
  //    B   VAL  D
  //         C
  // return all neighbours of VAL
  const createAdjList = (val, col, row) => {
    //   neighbours in a line above
    // negative numbers arent a node
    const a = row !== 0 ? val - NUM_COL : null;
    // neighbours in the same line
    // check left border
    const b = col !== 0 ? val - 1 : null;
    // check right border
    const d = col !== NUM_COL - 1 ? val + 1 : null;
    //  neighbours in a line bellow
    // check overflow
    const c = row !== NUM_ROW - 1 ? val + NUM_COL : null;

    return { a, b, c, d };
  };

  const valToIndx = val => {
    // const val = row * NUM_COL + col;
    const row = Math.floor(val / NUM_COL);
    const col = val - row * NUM_COL;
    // console.log(`row = ${row}, col = ${col}`);
    return { row, col };
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

  console.log();

  //   add bfs
  //   const bfs = (start, end) => {
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
    // console.log(a);
    for (let i = 0; i < dist[end.val] - 1; i++) {
      path.push(a);
      a = parents[a];
      //   console.log(a);
    }
    path = path.reverse();
    console.log(path);
    // console.log(dist[end.val]);
    // console.log(parents[end.val]);
    return { dist, parents };
  };

  return (
    <div>
      <h1>Path Finding</h1>
      <button onClick={() => bfs()}>bfs</button>
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
