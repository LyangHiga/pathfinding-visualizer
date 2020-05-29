import Stack from '../structures/stack';
import { valToIndx } from '../helpers/gridPropertiesHelper';
import { visitedAnimation } from '../animations';

const dfs = async (grid, start, end) => {
  //   const end = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  //   stack pop order
  let result = [];
  let visited = {};
  let stack = new Stack();
  // add start vertex to the stack
  stack.push(start);
  // start vertex is already visited
  visited[start.val] = true;
  let v;
  while (stack.size !== 0) {
    // take vertex v from the top of the stack
    v = stack.pop().val;
    result.push(v.val);
    if (v.val === end.val) {
      //   we find the target
      break;
    }
    // mark w as visited
    visited[v.val] = true;
    await visitedAnimation(v.val, start.val, end.val);
    // for every edge of v
    for (const key in v.adjList) {
      const w = v.adjList[key];
      const [row, col] = valToIndx(w);
      //   wVertex has all properties while w is wVeterx.val
      const wVertex = grid[row][col];
      //   check w is visited, is not null or wall
      if (visited[w] !== true && w !== null && !wVertex.isWall) {
        //   push w vertex
        stack.push(wVertex);
        if (w === end.val) {
          //   we find the target
          break;
        }
      }
    }
  }
};

export default dfs;
