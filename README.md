# [Pathfinding Visualizer](https://lyanghiga.github.io/pathfinding-visualizer/)

Project inspired by this [video](https://www.youtube.com/watch?v=msttfIHHkak). Some years ago I implemented all of these algorithms for a class at UFRJ, after watching this video I decided to do it in a way more visual and not something only in the command line.

In this way, I could see all algorithms working (it is beautiful haha), remember how they work, and have some fun with React as well.

Check [here](https://lyanghiga.github.io/pathfinding-visualizer/)!

---

## Instructions

### Grid

#### Nodes

There are 3 types of nodes: Start (green), Target (red), and Wall (black).

It's allowed only movements in 4 directions: N, E, S, and W.

#### Weighted Grid

Each node has weighted edges, all edges with the same cost, randomly chosen in [1, 200] range for "positive" and [-5,200] range for negative option. The number inside each node represents the cost of each edge.

### Buttons

- Clear: Get a new Grid unweighted.
- Clear Path: Keep the same grid, same start, target and wall nodes, just to clear paths.
- Maze: Get a random Maze, Each node has a eps = 0.3 chance to become a wall (start and target nodes not included).
- Un/Weighted: Toggle between Unweighted and Weighted mode.
- Negative/ Positive: Toggle between Negative and Positive Weigth.
- Change start/ target: Available only in mobile version. Just click in a free node to change start or target node.
- Slider to change Alpha Value
  - Alpha == 0 : Best First Search
  - 0 < Alpha < 1 : A\*
  - Alpha == 1 : Dijkstra
- Bellman-Ford:
  - Animation: Nodes in Gray were visited but their cost was not decreased, nodes in blue were visited and their cost was reduced.
  - If a negative Cycle exists a message will be printed in console browser, besides that no path will be found.
  - It's available only for negative weight grid.

### Keyboard Commands

Just press one of the keys below and click on some node to change something.

- S: Press 'S' and click in a free node to change the start Node.
- T: Press 'T' and click in a free node to change the target Node.
- W: Press 'W' and click and click in free nodes to create as many walls as you like.

### Algorithms And Data Structures

All algorithms and data structures are implemented as they used to be taught [1][2][6][7], all code is available in this repo. I think the main observations are in Best-first Search and A*, I use Manhattan Distance as a heuristic, in A* to scale the function f, which we want to minimize:

g: edge costs and h: Manhattan Distance

f = Alpha \* g + (1 - Alpha) \* h \* sf . [3]

sf: Scaling Factor
g is measured in 'edge costs' and its value can be in the range [1, maxWeight*] while h is measured in 'node distances' given by Manhattan Norm.
To scale I used the expected value of the random variable of the weights, given by:
sum / maxWeight ; where sum is of the N terms from 1 to maxWeight, thus:
sum = (maxWeight + 1) \* (maxWeight/2)

\*maxWeight is a const defined equals to 200. But we can use any maxWeight > 1.
I use Alpha = 0.57 as default value.
If Alpha == 0 => To use only h (Best First Search)
If Alpha == 1 => to use only g (Dijkstra)

### Using Decrease Key instead of Reinsert

I decided to use Decrease key, for algorithms that use min-heap, when we found a new min distance to any node instead of reinserting the same node with its new distance, this means that we only make n dequeues because we insert each node just one time, in the worst case. [4]

To implement Decrease Key I use a hash table ([Map object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)) to map Vals to indexes. [5]

### Browser Console

After any algorithm runs you can check the distance of the chosen path (yellow) and some other useful information are also available in the browser's console.

### Test

I use Jest and Enzyme to implement Unit Tests. It was the first time I use Unit Test for testing React Components. It was extremely helpful especially for refactoring and migrating from JS to TS.

We just have to make some basic configurations to start testing, it's totally worth it. I recommend these two references [8][9] to start testing React Component.

### References

[1]: [Algorithms Specialization](https://www.coursera.org/specializations/algorithms) by Tim Roughgarden.

[2]: [JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/) by Colt Steele.

[3]: [Introduction to A\* from Amit’s Thoughts on Pathfinding](http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html) by Amit Patel.

[4]: [Why does Dijkstra's algorithm use decrease-key? - Stack Overflow](https://stackoverflow.com/questions/9255620/why-does-dijkstras-algorithm-use-decrease-key)

[5]: [How to implement O(logn) decrease-key operation for min-heap based Priority Queue? - Stack Overflow
](https://stackoverflow.com/questions/17009056/how-to-implement-ologn-decrease-key-operation-for-min-heap-based-priority-queu)

[6]: [Algorithm Design 1st Edition](https://www.amazon.com/Algorithm-Design-Jon-Kleinberg/dp/0321295358)

[7]: [Introduction to Algorithms, 3rd Edition](https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844)

[8]: [Create react app typescript: testing with jest and enzyme](https://feralamillo.medium.com/create-react-app-typescript-testing-with-jest-and-enzyme-869fdba1bd3)

[9]: [Testing React Components with Jest](https://medium.com/opendoor-labs/testing-react-components-with-jest-a7e8e4d312d8)

Also check the [repo](https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial) from Clement's video.

For more algorithms and data structures implementations check my other repo [TypeScript-Algorithms-and-Data-Structures](https://github.com/LyangHiga/typescript-algorithms-data-structures).
