import Grid from "../models/Grid";
import Node from "../models/Node";
import Stack from "../structures/stack";
import { valToIndx, getPath } from "../helpers/gridHelper";
import { visitedAnimation, pathAnimation } from "../helpers/animations";

const dfs = async (g: Grid, test = false) => {
  const { grid, nCols, start, target } = g;
  // stack pop order
  const result: number[] = [];
  const visited = new Map<number, boolean>();
  const parents = new Map<number, number | null>();
  const stack = new Stack<Node>();
  const [startRow, startCol] = valToIndx(start, nCols);
  // add start node to the stack
  stack.push(grid[startRow][startCol]);
  // start node is already visited
  visited.set(start, true);
  parents.set(start, null);
  let v;
  while (stack.size !== 0) {
    // take node v from the top of the stack
    v = stack.pop()!.key!;
    result.push(v.val);
    if (v.val === target) {
      //   we find the target
      break;
    }
    // mark v as visited
    visited.set(v.val, true);
    if (!test) await visitedAnimation(v.val, start, target);
    // for every edge of v
    for (const key in v.adjList) {
      const w = v.adjList[key];
      if (w != null) {
        const [row, col] = valToIndx(w, nCols);
        //   wnode has all properties while w is wNode.val
        const wNode = grid[row][col];
        //   check w is visited, is not null or wall
        if (!visited.get(w) && !wNode.isWall) {
          //   push w node
          stack.push(wNode);
          parents.set(w, v.val);
          if (w === target) {
            //   we find the target
            visited.set(w, true);
            break;
          }
        }
      }
    }
  }
  if (visited.get(target)) {
    const path = getPath(parents, start, target);
    if (!test) await pathAnimation(path);
    return { path, parents, visited };
  }
  return { path: null, parents, visited };
};

export default dfs;
