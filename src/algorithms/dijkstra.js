import Heap from '../structures/heap';
import { valToIndx, getPathD } from '../helpers/gridPropertiesHelper';
import { pathAnimation, visitedAnimation } from '../animations';

const dijkstra = async (grid, start, end, nCols) => {
  const heap = new Heap();
  const distances = [];
  const parents = [];
  let smallestVal;
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
    // smallest = heap.dequeue().element.val;
    smallestVal = heap.dequeue().element.key;
    if (smallestVal === end.val) {
      break;
    }
    const [r, c] = valToIndx(smallestVal, nCols);
    const smallest = grid[r][c];
    // if there is any vertex in heap with distance !== infinity
    if (smallest || distances[smallest.val] !== Infinity) {
      for (let k in smallest.adjList) {
        //   neighbour is the val of this <smallest> node
        const neighbour = smallest.adjList[k];
        // check if is not null => grid border
        if (neighbour !== null) {
          const [row, col] = valToIndx(neighbour, nCols);
          //   neighbour as a vertex
          let nextVertex = grid[row][col];
          // calculate Dijkstra's  Greedy Criterium
          let d = distances[smallestVal] + nextVertex.w;
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
  const path = getPathD(parents, start.val, end.val);
  await pathAnimation(path, start.val);
};

export default dijkstra;
