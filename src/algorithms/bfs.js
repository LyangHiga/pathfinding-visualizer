import {
  START_NODE_COL,
  FINISH_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW,
} from '../consts';
import Queue from '../structures/queue';
import { valToIndx } from '../helpers';
import { pathAnimation, visitedAnimation } from '../animations';

// const bfs = (grid) => {
async function bfs(grid) {
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
      break;
    }
    for (const key in v.adjList) {
      const w = v.adjList[key];
      const { row, col } = valToIndx(w);
      //   check w is visited
      if (visited[w] !== true && w !== null) {
        // w visited
        visited[w] = true;
        await visitedAnimation(w, end);
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
  pathAnimation(path);
  return { path };
}

export default bfs;
