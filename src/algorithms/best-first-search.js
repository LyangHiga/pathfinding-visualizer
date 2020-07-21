import Heap from '../structures/heap';
import {
  valToIndx,
  getWeightedPath,
  manhattan,
} from '../helpers/gridPropertiesHelper';
import { pathAnimation, visitedAnimation } from '../animations';

const bestFirstSearch = async (grid, start, end, nCols) => {
  const heap = new Heap();
  // Initialize parents array with null
  const parents = Array(grid.length * nCols).fill(null);
  //   the distance between start node and any given node
  const realDistance = Array(grid.length * nCols).fill(0);
  let smallestVal, found;
  let inspectedNodes = 0;
  let nDeq = 0;
  // this time our heap val will be the manhattan distance to the target node
  heap.enqueue(start.val, manhattan(start.row, end.row, start.col, end.col));

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
        //   check if nextVertex is a valid node => not a wall and not visited => realDistance ===0
        if (!nextVertex.isWall && realDistance[nextVertex.val] === 0) {
          // calculate manhattan distance from nextVertex to the target node
          let d = manhattan(row, end.row, col, end.col);
          //   updating distances and parents
          parents[nextVertex.val] = smallest.val;
          // calculate real distance until this node from start node
          realDistance[nextVertex.val] =
            realDistance[smallest.val] + smallest.w;
          let decrease = heap.decrease(nextVertex.val, d);
          if (!decrease) {
            // enqueue with new priority
            heap.enqueue(nextVertex.val, d);
          }
          inspectedNodes++;
          await visitedAnimation(nextVertex.val, start.val, end.val);
        }
      }
    }
  }
  if (!found) return;
  const path = getWeightedPath(parents, start.val, end.val);
  //   distance of this path (yellow)
  console.log(`bestFirstSearch Real Distance = ${realDistance[end.val]}`);
  console.log(`bestFirstSearch inspectedNodes = ${inspectedNodes}`);
  console.log(`bestFirstSearch dequeues = ${nDeq}`);
  await pathAnimation(path, start.val);
};

export default bestFirstSearch;
