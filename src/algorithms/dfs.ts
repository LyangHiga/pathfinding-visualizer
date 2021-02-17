import Grid from "../models/Grid";
import Node from "../models/Node";
import Stack from "../structures/stack";
import { valToIndx } from "../helpers/gridHelper";
import { visitedAnimation } from "../helpers/animations";

const dfs = async (g: Grid, start: Node, end: Node, test = false) => {
  const { grid, nCols } = g;
  // stack pop order
  const result: number[] = [];
  const visited = new Map<number, boolean>();
  const stack = new Stack<Node>();
  // add start node to the stack
  stack.push(start);
  // start node is already visited
  visited.set(start.val, true);
  let v;
  while (stack.size !== 0) {
    // take node v from the top of the stack
    v = stack.pop()!.key!;
    result.push(v.val);
    if (v.val === end.val) {
      //   we find the target
      break;
    }
    // mark v as visited
    visited.set(v.val, true);
    if (!test) await visitedAnimation(v.val, start.val, end.val);
    // for every edge of v
    for (const key in v.adjList) {
      const w = v.adjList[key];
      if (w != null) {
        const [row, col] = valToIndx(w, nCols);
        //   wnode has all properties while w is wVeterx.val
        const wNode = grid[row][col];
        //   check w is visited, is not null or wall
        if (visited.get(w) !== true && !wNode.isWall) {
          //   push w node
          stack.push(wNode);
          if (w === end.val) {
            //   we find the target
            break;
          }
        }
      }
    }
  }
  return visited;
};

export default dfs;
