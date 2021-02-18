import Grid from "../models/Grid";
import Node from "../models/Node";
import Queue from "../structures/queue";
import { valToIndx, getPath } from "../helpers/gridHelper";
import { pathAnimation, visitedAnimation } from "../helpers/animations";

const bfs = async (g: Grid, start: Node, target: Node, test = false) => {
  const { grid, nCols } = g;
  // maps node val to is viseted or not
  const visited = new Map<number, boolean>();
  // maps child val to parent val
  const parents = new Map<number, number | null>();
  // maps node val to distance from start node val
  const dist = new Map<number, number>();
  const q = new Queue<Node>();
  // add start node to the queue
  q.enQueue(start);
  // start node is already visited
  visited.set(start.val, true);
  // distance to itself
  dist.set(start.val, 0);
  // doesnt have parent
  parents.set(start.val, null);

  // node that will be deQueue
  let v: Node;
  while (q.size !== 0) {
    v = q.deQueue()!.key;
    // check if v is the end vertex
    if (v.val === target.val) {
      //   we find the target
      break;
    }
    // for every edge of v
    for (const key in v.adjList) {
      const w = v.adjList[key];
      // check if w is not null
      if (w !== null) {
        const [row, col] = valToIndx(w, nCols);
        //   wNode has all properties while w is wVeterx.val
        const wNode = grid[row][col];
        //   check w is visited or wall
        if (visited.get(w) !== true && !wNode.isWall) {
          //mark  w as visited
          visited.set(w, true);
          if (!test) await visitedAnimation(w, start.val, target.val);
          //   enQueue vertex w, update dist and parents
          q.enQueue(wNode);
          parents.set(w, v.val);
          dist.set(w, dist.get(v.val)! + 1);
        }
      }
    }
  }
  if (visited.get(target.val)) {
    const path = getPath(parents, start.val, target.val);
    if (!test) await pathAnimation(path);
    return { path, parents, visited };
  }
  return { path: null, parents, visited };
};

export default bfs;
