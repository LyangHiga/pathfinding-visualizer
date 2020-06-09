import Heap from '../structures/heap';
import { valToIndx, getWeightedPath } from '../helpers/gridPropertiesHelper';
import { pathAnimation, visitedAnimation } from '../animations';

const bestFirstSearch = async (grid, start, end, nCols) => {
  const heap = new Heap();
  // Initialize distances and parents array with zeros
  // this time our distances array will be the manhattan distance to the target node
  const distances = Array(grid.length * nCols).fill(0);
  const parents = Array(grid.length * nCols).fill(0);
  const visited = Array(grid.length * nCols).fill(false);
  let smallestVal, notFound;
  //   build heap, adding all nodes
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const vertex = grid[i][j];
      if (vertex.isStart) {
        distances[vertex.val] = 0;
        heap.enqueue(vertex.val, 0);
        visited[vertex.val] = true;
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
          // calculate manhattan distance to the target node
          // |X(smallest) - X(target)| + |Y(smallest) - Y(target)|
          let d = Math.abs(r - end.row) + Math.abs(c - end.col);
          //   compare distance calculated with last distance storaged
          if (
            d < distances[nextVertex.val] &&
            !nextVertex.isWall &&
            !visited[nextVertex.val]
          ) {
            //   updating distances and parents
            distances[nextVertex.val] = d;
            parents[nextVertex.val] = smallest.val;
            visited[nextVertex.val] = true;
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
  console.log(
    `Real Distance = ${getPathDistance(path, grid, start, end, nCols)}`
  );
  await pathAnimation(path, start.val);
};

const getPathDistance = (path, grid, start, end, nCols) => {
  // start and finish nodes are not in the path (yelow animation)
  let d = start.w + end.w;
  console.log(`path = ${path}`);
  for (let i = 0; i < path.length; i++) {
    let [r, c] = valToIndx(path[i], nCols);
    console.log(path[i]);
    const node = grid[r][c];
    d += node.w;
  }
  return d;
};

export default bestFirstSearch;
