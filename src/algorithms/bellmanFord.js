import { valToIndx, getPath } from "../helpers/gridHelper";
import {
  pathAnimation,
  visitedAnimation,
  clearPathAnimation,
} from "../helpers/animations";

// Returns the distance from s to each vertex and their parents O(mn)
// negative costs are allowed
// SSSP (Single Source Shortest Problem)
// detect negative cycles: boolean output (cycle)
// use parents (predecessor pointers) to traverse the path
// const bellmanFord = async (grid, start, end, nCols) => {
const bellmanFord = async (g, start, end) => {
  const { grid, nCols } = g;
  // O(m) space => to reconstruct path from s to (any) v
  // parents  (predecessor pointers)
  const distances = Array(grid.length * nCols).fill(Infinity);
  const parents = Array(grid.length * nCols).fill(null);
  // to stop earlier
  let stop = true;
  // i: number of edges allowed
  // for i =0, all dist from s to vertex are infinity
  // dist s to s
  distances[start.val] = 0;
  // i edges allowed, (n-1) at most => O(n)
  // try for n edges to check for negative cycles
  // if costs get smaller indefinitely (OPT(n,v) !== OPT(n-1,v))
  // There is a negative cycle
  for (let i = 1; i < grid.length * nCols; i++) {
    clearPathAnimation(grid);
    // if any distance get smaller, we can stop early
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
          //   neighbour as a vertex
          let nextVertex = grid[row][col];
          if (!nextVertex.isWall) {
            let d = distances[val] + nextVertex.weight;
            // vertex checked
            await visitedAnimation(neighbour, start.val, end.val, "#c5c9ca");
            //   to check if is not wall
            if (d < distances[neighbour]) {
              distances[neighbour] = d;
              parents[neighbour] = val;
              // still getting costs update => dont stop!
              stop = false;
              // vertex with cost decreased
              await visitedAnimation(neighbour, start.val, end.val);
            }
          }
        }
      }
    }
    if (stop) break;
  }
  if (!stop) {
    alert("Negative Cycle was found!");
  }

  console.log(`cycle: ${!stop}`);
  if (parents[end.val] && stop) {
    const path = getPath(parents, start.val, end.val);
    await pathAnimation(path, start.val);
  }
};

export default bellmanFord;
