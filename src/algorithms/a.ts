import Grid from "../models/Grid";
import Node from "../models/Node";
import Heap from "../structures/heap";
import { valToIndx, manhattan, getPath } from "../helpers/gridHelper";
import { pathAnimation, visitedAnimation } from "../helpers/animations";

const a = async (g: Grid, alpha: number, test = false) => {
  const { grid, nCols, max, start, target } = g;
  const [targetRow, targetCol] = valToIndx(target, nCols);
  const targetNode = grid[targetRow][targetCol];
  const heap = new Heap<number>();
  // expected value of a random (uniformily) weight :
  //  range:[1,max), rememebr sum of 1st 100 int = (100+1) * 50
  //  => (100+1)+ (99+2) + (98+3) ... this is (101) 50 times
  //    sum of all possible values <sum of N first terms of AP> / max value
  const SCALING_FACTOR = ((max - 1 + 1) * (max / 2)) / max;
  // Initialize distances(weight cost) with Infinity and parents array with null
  // Distance between any given node to the start node
  // maps node val to weight cost
  const distances = Array(grid.length * nCols).fill(Infinity);
  const parents = new Map<number, number | null>();
  let smallestVal;
  let inspectedNodes = 0;
  let decrease = false;
  // number of dequeues
  let nDeq = 0;
  distances[start] = 0;
  // distances[start.val] = 0;
  //   add the start node to the heap
  //   we will use f(n) = alpha * distance + ( 1 - alpha) * Manhattan distance
  // as val to be minimized in the heap
  //   f for the start node is zero anyway
  // heap.enqueue(start.val, f(0, start, target, alpha));
  heap.enqueue(start, 0);
  inspectedNodes++;

  //   while there are elements in this heap
  while (heap.values.length) {
    //   get the min value from the heap
    let s = heap.dequeue()!;
    nDeq++;
    smallestVal = s.key;
    // check if it is the target node
    if (smallestVal === target) {
      break;
    }
    // convert smallestVal to a Node
    const [r, c] = valToIndx(smallestVal, nCols);
    const smallest = grid[r][c];
    // for all neighbour of smallest
    for (let k in smallest.adjList) {
      // get the val of the neighbour
      const neighbour = smallest.adjList[k];
      // check if is not null => grid border
      if (neighbour) {
        const [row, col] = valToIndx(neighbour, nCols);
        // neighbour as a node
        let nextNode = grid[row][col];
        // calculate Dijkstra's  Greedy Criterium and manhattan distance
        let d = distances[smallestVal] + smallest.weight;
        let newF = f(d, nextNode, targetNode, alpha, SCALING_FACTOR);
        let oldF = f(
          distances[nextNode.val],
          nextNode,
          targetNode,
          alpha,
          SCALING_FACTOR
        );
        //   compare f(d,next,target) with f calculated with last distance storaged
        if (newF < oldF && !nextNode.isWall) {
          //   updating distances and parents
          distances[nextNode.val] = d;
          parents.set(nextNode.val, smallest.val);
          decrease = heap.decreaseKey(nextNode.val, newF)!;
          if (!decrease) {
            // enqueue with new priority
            heap.enqueue(nextNode.val, newF);
          }
          if (!test) await visitedAnimation(nextNode.val, start, target);
          inspectedNodes++;
        }
      }
    }
  }
  if (distances[target] === Infinity) {
    return { parents, path: null };
  }
  const path = getPath(parents, start, target);
  //   min distance g() found  by A*
  console.log(`A* with Alpha= ${alpha} Min Distance = ${distances[target]}`);
  //   distance of this path (yellow)
  console.log(
    `A* with Alpha= ${alpha} Distance Calculated = ${getPathDistance(
      path,
      g,
      start
    )}`
  );
  console.log(`A* with Alpha= ${alpha} inspectedNodes = ${inspectedNodes}`);
  console.log(`A* with Alpha= ${alpha} Dequeues = ${nDeq}`);
  console.log(`scaling factor: ${SCALING_FACTOR}`);
  if (!test) await pathAnimation(path);
  return { parents, path };
};

//   we will use f(n) = (alpha * distance + ( 1 - alpha) * Manhattan distance) * SCALING FACTOR
//      we use a scaling factor because we compare nodes' weights with distances
//      weight: [1, max] ; while Manhattan d. is calculated in '[nodes distance] units': 1 (for adj nodes)
// as val to be minimized in the heap
const f = (distance: number, a: Node, b: Node, alpha: number, sf: number) => {
  const g = distance;
  const h = manhattan(a.row, b.row, a.col, b.col) * sf;
  const w = g === Infinity && alpha === 0 ? Infinity : alpha * g;
  const z = (1 - alpha) * h;
  return w + z;
};

const getPathDistance = (path: number[], g: Grid, start: number) => {
  const { grid, nCols } = g;
  const [startRow, startCol] = valToIndx(start, nCols);
  // start and finish nodes are not in the path (yelow animation)
  let d = grid[startRow][startCol].weight;
  for (let i = 0; i < path.length; i++) {
    let [r, c] = valToIndx(path[i], nCols);
    const node = grid[r][c];
    d += node.weight;
  }
  return d;
};
export default a;
