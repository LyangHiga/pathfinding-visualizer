import Grid from "../models/Grid";
import { valToIndx, getPath } from "../helpers/gridHelper";
import {
  pathAnimation,
  visitedAnimation,
  clearPathAnimation,
} from "../helpers/animations";
import { colors } from "../helpers/consts";

// Returns the distance from s to each node and their parents O(mn)
// negative costs are allowed
// SSSP (Single Source Shortest Problem)
// detect negative cycles: boolean output (cycle)
// use parents (predecessor pointers) to traverse the path
// const bellmanFord = async (grid, start, end, nCols) => {
const bellmanFord = async (g: Grid, test = false) => {
  const { grid, nCols, start, target } = g;
  // O(m) space => to reconstruct path from s to (any) v
  // parents  (predecessor pointers)
  const distances = Array(grid.length * nCols).fill(Infinity);
  // const parents = Array(grid.length * nCols).fill(null);
  const parents = new Map<number, number | null>();
  // to stop earlier
  let stop = true;
  // i: number of edges allowed
  // for i =0, all dist from s to node are infinity
  // dist s to s
  distances[start] = 0;
  // i edges allowed, (n-1) at most => O(n)
  // try for n edges to check for negative cycles
  // if costs get smaller indefinitely (OPT(n,v) !== OPT(n-1,v))
  // There is a negative cycle
  for (let i = 1; i < grid.length * nCols; i++) {
    if (!test) clearPathAnimation(g);
    // if no distance get smaller, we can stop early
    // if after n-1 steps: the costs still get smaller (with n edges allowed)
    // negative cycle detected!
    stop = true;
    // try a min path for each edge => O(m)
    for (let val = 0; val < grid.length * nCols; val++) {
      const [r, c] = valToIndx(val, nCols);
      const v = grid[r][c];
      // only try for distances that can be decreased
      if (distances[val] === Infinity || v.isWall) {
        continue;
      }
      for (let k in v.adjList) {
        const neighbour = v.adjList[k];
        // check if is not null => grid border
        if (neighbour !== null) {
          const [row, col] = valToIndx(neighbour, nCols);
          //   neighbour as a node
          let nextNode = grid[row][col];
          if (!nextNode.isWall) {
            let d = distances[val] + nextNode.weight;
            // node checked
            if (!test) {
              await visitedAnimation(
                neighbour,
                start,
                target,
                colors.light_gray
              );
            }

            //   to check if is not wall
            if (d < distances[neighbour]) {
              distances[neighbour] = d;
              // parents[neighbour] = val;
              parents.set(neighbour, val);
              // still getting costs update => dont stop!
              stop = false;
              // node with cost decreased
              if (!test) {
                await visitedAnimation(neighbour, start, target);
              }
            }
          }
        }
      }
    }
    if (stop) break;
  }
  if (!stop && !test) {
    alert("Negative Cycle was found!");
  }

  console.log(`cycle: ${!stop}`);
  if (parents.get(target) && stop) {
    const path = getPath(parents, start, target);
    if (!test) {
      await pathAnimation(path);
    }
    return { cycle: !stop, path, parents };
  }

  return { cycle: !stop, path: null, parents };
};

export default bellmanFord;
