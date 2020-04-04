import {
  START_NODE_COL,
  FINISH_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW,
} from '../consts';
import Stack from '../structures/stack';

import { valToIndx } from '../helpers';
import { pathAnimation, visitedAnimation } from '../animations';

// dfs iterative
async function dfs(grid) {
  const start = grid[START_NODE_ROW][START_NODE_COL];
  const end = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  let result = [];
  let visited = {};
  let parents = {};
  let path = [];
  let dist = {};
  let stack = new Stack();
  // add start vertex to the stack
  stack.push(start);
  // start vertex is already visited
  visited[start.val] = true;
  dist[start.val] = 0;
  //   parents[start.val] = null;
  let v;
  let i = 0;
  while (stack.size !== 0) {
    // take vertex v from the top of the stack
    v = stack.pop().val;
    result.push(v.val);
    // add parent of v wich is the last one poped
    if (i === 0) {
      parents[v.val] = null;
    } else {
      parents[v.val] = result[i - 1];
      dist[v.val] = dist[parents[v.val]] + 1;
    }
    if (v.val === end.val) {
      //   we find the target
      break;
    }
    i++;
    // mark w as visited
    visited[v.val] = true;
    await visitedAnimation(v.val, start.val, end.val);
    // for every edge of v
    for (const key in v.adjList) {
      const w = v.adjList[key];
      const { row, col } = valToIndx(w);
      //   check w is visited
      if (visited[w] !== true && w !== null) {
        stack.push(grid[row][col]);
        if (w === end.val) {
          //   we find the target
          break;
        }
      }
    }
  }
  //   building path
  let a = parents[end.val];
  for (let i = 0; i < dist[end.val] - 1; i++) {
    path.push(a);
    a = parents[a];
  }
  path = path.reverse();
  pathAnimation(path, start.val);
}

export default dfs;
