import Heap from '../structures/heap';
import { valToIndx, getWeightedPath } from '../helpers/gridPropertiesHelper';
import { pathAnimation, visitedAnimation } from '../animations';

const dijkstra = async (grid, start, end, nCols) => {
  const heap = new Heap();
  // Initialize distances with Infinity and parents array with null
  // Distance between any given node to the start node
  const distances = Array(grid.length * nCols).fill(Infinity);
  const parents = Array(grid.length * nCols).fill(null);
  let smallestVal, found;
  let inspectedNodes = 0;
  let nDeq = 0;
  let decrease = false;
  distances[start.val] = 0;
  //   add the start node to the heap
  heap.enqueue(start.val, 0);

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
        // calculate Dijkstra's  Greedy Criterium
        //   distance to smallest (IS short path to it) + smallest to nextVertex edge (W*)
        // W* : weight of <smallest> edges, all edges from the same node have the same weight in this grid
        let d = distances[smallestVal] + smallest.w;
        //   compare distance calculated with last distance storaged
        if (d < distances[nextVertex.val] && !nextVertex.isWall) {
          //   updating distances and parents
          distances[nextVertex.val] = d;
          parents[nextVertex.val] = smallest.val;
          decrease = heap.decreaseKey(nextVertex.val, d);
          if (!decrease) {
            // enqueue with new priority
            heap.enqueue(nextVertex.val, d);
          }
          await visitedAnimation(nextVertex.val, start.val, end.val);
          inspectedNodes++;
        }
      }
    }
  }
  if (!found) return;
  const path = getWeightedPath(parents, start.val, end.val);
  console.log(`dijkstra Min Distance = ${distances[end.val]}`);
  console.log(`dijkstra inspectedNodes = ${inspectedNodes}`);
  console.log(`dijkstra dequeues = ${nDeq}`);
  await pathAnimation(path, start.val);
};

export default dijkstra;
