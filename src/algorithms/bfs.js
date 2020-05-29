import Queue from '../structures/queue';
import { valToIndx, getPath } from '../helpers/gridPropertiesHelper';
import { pathAnimation, visitedAnimation } from '../animations';

const bfs = async (grid, start, end) => {
  //   const end = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  let visited = {};
  let parents = {};
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
    // for every edge of v
    for (const key in v.adjList) {
      const w = v.adjList[key];
      const [row, col] = valToIndx(w);
      //   wVertex has all properties while w is wVeterx.val
      const wVertex = grid[row][col];
      //   check w is visited, is not null or wall
      if (visited[w] !== true && w !== null && !wVertex.isWall) {
        //mark  w as visited
        visited[w] = true;
        await visitedAnimation(w, start.val, end.val);
        //   enQueue vertex w
        q.enQueue(wVertex);
        parents[w] = v.val;
        dist[w] = dist[v.val] + 1;
      }
    }
  }
  const path = getPath(parents, end.val, dist[end.val]);
  await pathAnimation(path, start.val);
};

export default bfs;
