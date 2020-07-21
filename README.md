# [Pathfinding Visualizer](https://lyanghiga.github.io/pathfinding-visualizer/)

Project inspired by this [video](https://www.youtube.com/watch?v=msttfIHHkak). Some years ago I implemented all of these algorithms for a class at UFRJ, after watching this video I decided to do it in a way more visual and not something only in the command line.

In this way, I could see all algorithms working (it is beautiful haha), remember how they work, and have some fun with React as well.

Check [here](https://lyanghiga.github.io/pathfinding-visualizer/)!

---

## Instructions

### Grid# [Pathfinding Visualizer](https://lyanghiga.github.io/pathfinding-visualizer/)

Project inspired by this [video](https://www.youtube.com/watch?v=msttfIHHkak). Some years ago I implemented all of these algorithms for a class at UFRJ, after watching this video I decided to do it in a way more visual and not something only in the command line.

In this way, I could see all algorithms working (it is beautiful haha), remember how they work, and have some fun with React as well.

Check [here](https://lyanghiga.github.io/pathfinding-visualizer/)!

---

## Instructions

### Grid

#### Nodes

There are 3 types of nodes: Start (green) , Target (red) , and Wall (black).

It's allowed only movements in 4 directions: N, E, S, and W.

#### Weighted Grid

Each node has weighted edges, all edges with the same cost, randomly chosen in [1, 50] range. The number inside each node represents the cost of each edge.

### Buttons

- Clear: Get a new Grid unweighted.
- Clear Path: Keep the same grid, same start, target and wall nodes, just to clear paths.
- Maze: Get a random Maze, Each node has a eps = 0.3 chance to become a wall (start and target nodes not included).
- Un/Weighted: Toggle between Unweighted and Weighted mode.

### Keyboard Commands

Just press one of the keys bellow and click in some node to change something.

- S: Press 'S' and click in a free node to change start Node.
- F: Press 'F' and click in a free node to change final/ target Node.
- W: Press 'W' and click and click in free nodes to create as many walls you like.

### Algorithms And Data Structures

All algorithms and data structures are implemented as they used to be taught [1][2], all code is available in this repo. I think the main observations are in Best-first Search and A*, I use Manhattan Distance as heuristic, in A* to scale the function f, which we want to minimize:

g: edge costs and h: Manhattan Distance

f = Alpha \* g + (1 - Alpha) \* h. [3]

I use Alpha = 0.1 as default value.

### Using Decrease Key instead of Reinsert

In this last commit I decided to use Decrease key when we found a new min distance to any node instead of reinserting the same node with its new distance, this means that we only make n dequeues because we insert each node just one time. [4]

To implement Decrease Key I use a hash table (javascript object) to map keys to indexes. [5]

PS: In my Heap implementation I changed 'keys' with 'values', how they are usually named, but it works as expected

### Browser Console

After any algorithm runs you can check the distance of the chosen path (yellow) and some other useful information are also available in the browser's console.

### References

[1]: [Algorithms Specialization](https://www.coursera.org/specializations/algorithms) by Tim Roughgarden.

[2]: [JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/) by Colt Steele.

[3]: [Introduction to A\* from Amit’s Thoughts on Pathfinding](http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html) by Amit Patel.

[4]: [Why does Dijkstra's algorithm use decrease-key? - Stack Overflow](https://stackoverflow.com/questions/9255620/why-does-dijkstras-algorithm-use-decrease-key)

[5]: [How to implement O(logn) decrease-key operation for min-heap based Priority Queue? - Stack Overflow
](https://stackoverflow.com/questions/17009056/how-to-implement-ologn-decrease-key-operation-for-min-heap-based-priority-queu)

Also check the [repo](https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial) from Clement's video.

#### Nodes

There are 3 types of nodes: Start (green) , Target (red) , and Wall (black).

It's allowed only movements in 4 directions: N, E, S, and W.

#### Weighted Grid

Each node has weighted edges, all edges with the same cost, randomly chosen in [1, 50] range. The number inside each node represents the cost of each edge.

### Buttons

- Clear: Get a new Grid unweighted.
- Clear Path: Keep the same grid, same start, target and wall nodes, just to clear paths.
- Maze: Get a random Maze, Each node has a eps = 0.3 chance to become a wall (start and target nodes not included).
- Un/Weighted: Toggle between Unweighted and Weighted mode.

### Keyboard Commands

Just press one of the keys bellow and click in some node to change something.

- S: Press 'S' and click in a free node to change start Node.
- F: Press 'F' and click in a free node to change final/ target Node.
- W: Press 'W' and click and click in free nodes to create as many walls you like.

### Algorithms And Data Structures

All algorithms and data structures are implemented as they used to be taught [1][2], all code is available in this repo. I think the main observations are in Best-first Search and A*, I use Manhattan Distance as heuristic, in A* to scale the function f which we want to minimize:

g: edge costs and h: Manhattan Distance

f = Alpha \* g + (1 - Alpha) \* h. [3]

I use Alpha = 0.1 as default value.

### Using Decrease Key instead of Reinsert

In this last commit I decided to use Decrease key when we found a new min distance to any node instead of reinserting the same node with its new distance, this means that we only make n dequeues because we insert each node just one time. [4]

To implement Decrease Key I use a hash table (javascript object) to map keys to indexes. [5]

PS: In my Heap implementation I changed 'keys' with 'values', how they are usually named, but it works as expected

### Browser Console

After any algorithm runs you can check the distance of the chosen path (yellow) and some other useful information are also available in the browser's console.

### References

[1]: [Algorithms Specialization](https://www.coursera.org/specializations/algorithms) by Tim Roughgarden.

[2]: [JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/) by Colt Steele.

[3]: [Introduction to A\* from Amit’s Thoughts on Pathfinding](http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html) by Amit Patel.

[4]: [Why does Dijkstra's algorithm use decrease-key? - Stack Overflow](https://stackoverflow.com/questions/9255620/why-does-dijkstras-algorithm-use-decrease-key)

[5]: [How to implement O(logn) decrease-key operation for min-heap based Priority Queue? - Stack Overflow
](https://stackoverflow.com/questions/17009056/how-to-implement-ologn-decrease-key-operation-for-min-heap-based-priority-queu)

Also check the [repo](https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial) from Clement's video.
