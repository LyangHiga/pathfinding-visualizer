import {
  START_NODE_COL,
  FINISH_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW,
} from '../consts';
import Stack from '../structures/stack';
import { valToIndx, getPath } from '../helpers';
import { pathAnimation, visitedAnimation } from '../animations';

async function dfs(grid) {
  const start = grid[START_NODE_ROW][START_NODE_COL];
  const end = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //   stack pop order
  let result = [];
  let visited = {};
  let parents = {};
  let dist = {};
  let stack = new Stack();
  // add start vertex to the stack
  stack.push(start);
  // start vertex is already visited
  visited[start.val] = true;
  dist[start.val] = 0;
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
      //   wVertex has all properties while w is wVeterx.val
      const wVertex = grid[row][col];
      //   check w is visited, is not null or wall
      if (visited[w] !== true && w !== null && !wVertex.isWall) {
        //   push w vertex
        stack.push(wVertex);
        if (w === end.val) {
          //   we find the target
          break;
        }
      }
    }
  }
  let path = getPath(parents, end.val, dist[end.val]);
  pathAnimation(path, start.val);
}

export default dfs;
