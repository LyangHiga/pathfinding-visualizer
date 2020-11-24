import Heap from "../structures/heap";
import {
  valToIndx,
  getWeightedPath,
  manhattan,
} from "../helpers/gridPropertiesHelper";
import { pathAnimation, visitedAnimation } from "../animations";

const a = async (grid, start, end, nCols, wRange, alpha) => {
  const heap = new Heap();
  // expected value of a random (uniformily) weight :
  //    sum of all possible values <sum of N first terms of AP> / max value
  const SCALING_FACTOR = ((wRange + 1) * (wRange / 2)) / wRange;
  // Initialize distances with Infinity and parents array with null
  // Distance between any given node to the start node
  const distances = Array(grid.length * nCols).fill(Infinity);
  const parents = Array(grid.length * nCols).fill(null);
  let smallestVal, found;
  let inspectedNodes = 0;
  let decrease = false;
  let nDeq = 0;
  distances[start.val] = 0;
  //   add the start node to the heap
  //   we will use f(n) = alpha * distance + ( 1 - alpha) * Manhattan distance
  // as val to be minimized in the heap
  //   f for the start node
  heap.enqueue(start.val, f(0, start, end, alpha));
  inspectedNodes++;

  //   while there are elements in this heap
  while (heap.values.length) {
    //   get the min value from the heap
    let s = heap.dequeue().element;
    nDeq++;
    // get its vertex
    smallestVal = s.key;
    // check if we find the target node
    if (smallestVal === end.val) {
      found = true;
      break;
    }
    // convert smallestVal to a Vertex
    const [r, c] = valToIndx(smallestVal, nCols);
    const smallest = grid[r][c];
    // for all neighbour of smallest
    for (let k in smallest.adjList) {
      // get the val of the neighbour
      const neighbour = smallest.adjList[k];
      // check if is not null => grid border
      if (neighbour !== null) {
        const [row, col] = valToIndx(neighbour, nCols);
        //   neighbour as a vertex
        let nextVertex = grid[row][col];
        // calculate Dijkstra's  Greedy Criterium and manhattan distance
        let d = distances[smallestVal] + smallest.w;
        let newF = f(d, nextVertex, end, alpha, SCALING_FACTOR);
        let oldF = f(
          distances[nextVertex.val],
          nextVertex,
          end,
          alpha,
          SCALING_FACTOR
        );
        //   compare f(d,next,end) with f calculated with last distance storaged
        if (newF < oldF && !nextVertex.isWall) {
          //   updating distances and parents
          distances[nextVertex.val] = d;
          parents[nextVertex.val] = smallest.val;
          decrease = heap.decreaseKey(nextVertex.val, newF);
          if (!decrease) {
            // enqueue with new priority
            heap.enqueue(nextVertex.val, newF);
          }
          await visitedAnimation(nextVertex.val, start.val, end.val);
          inspectedNodes++;
        }
      }
    }
  }
  if (!found) return;
  const path = getWeightedPath(parents, start.val, end.val);
  //   min distance g() found  by A*
  console.log(`A* Min Distance = ${distances[end.val]}`);
  //   distance of this path (yellow)
  console.log(
    `A* Distance Calculated = ${getPathDistance(path, grid, start, nCols)}`
  );
  console.log(`A* inspectedNodes = ${inspectedNodes}`);
  console.log(`A* Dequeues = ${nDeq}`);
  console.log(`scaling factor: ${SCALING_FACTOR}`);
  await pathAnimation(path, start.val);
};

//   we will use f(n) = (alpha * distance + ( 1 - alpha) * Manhattan distance) * SCALING FACTOR
//      we use a scaling factor because we compare nodes' weights with distances
//      weight: [1, wRange] ; while Manhattan d. is calculated in '[nodes distance] units': 1 (for adj nodes)
// as val to be minimized in the heap
const f = (distance, a, b, alpha, sf) => {
  const g = distance;
  const h = manhattan(a.row, b.row, a.col, b.col) * sf;
  const w = g === Infinity && alpha === 0 ? Infinity : alpha * g;
  const z = (1 - alpha) * h;
  return w + z;
};

const getPathDistance = (path, grid, start, nCols) => {
  // start and finish nodes are not in the path (yelow animation)
  let d = start.w;
  for (let i = 0; i < path.length; i++) {
    let [r, c] = valToIndx(path[i], nCols);
    const node = grid[r][c];
    d += node.w;
  }
  return d;
};
export default a;
