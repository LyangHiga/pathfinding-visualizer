import Heap from '../structures/heap';
import { valToIndx, getWeightedPath } from '../helpers/gridPropertiesHelper';
import { pathAnimation, visitedAnimation } from '../animations';

const dijkstra = async (grid, start, end, nCols) => {
  const heap = new Heap();
  // Initialize distances and parents array with zeros
  const distances = Array(grid.length * nCols).fill(0);
  const parents = Array(grid.length * nCols).fill(0);
  let smallestVal, notFound;
  //   build heap, adding all nodes
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const vertex = grid[i][j];
      if (vertex.isStart) {
        distances[vertex.val] = 0;
        heap.enqueue(vertex.val, 0);
      } else {
        distances[vertex.val] = Infinity;
        heap.enqueue(vertex.val, Infinity);
      }
      parents[vertex.val] = null;
    }
  }
  // while we have nodes to visite:
  while (heap.values.length) {
    //   get the min value from the heap
    let s = heap.dequeue().element;
    // get its vertex
    smallestVal = s.key;
    // check if we find the target node or if we are lock in an unconnected component
    console.log(s.val);
    if (smallestVal === end.val) {
      break;
    }
    if (s.val === Infinity) {
      notFound = true;
      break;
    }
    // convert smallestVal to a Vertex
    const [r, c] = valToIndx(smallestVal, nCols);
    const smallest = grid[r][c];
    // if there is any vertex in heap with distance !== infinity
    if (smallest || distances[smallest.val] !== Infinity) {
      for (let k in smallest.adjList) {
        // get the val of the neighbour of the smallest node from its adj list
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
            // enqueue with new priority
            heap.enqueue(nextVertex.val, d);
            await visitedAnimation(nextVertex.val, start.val, end.val);
          }
        }
      }
    }
  }
  if (notFound) return;
  const path = getWeightedPath(parents, start.val, end.val);
  console.log(`Min Distance = ${distances[end.val]}`);
  await pathAnimation(path, start.val);
};

export default dijkstra;
