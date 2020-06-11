# [Pathfinding Visualizer](https://lyanghiga.github.io/pathfinding-visualizer/)

Project inspired by this [video](https://www.youtube.com/watch?v=msttfIHHkak). Some years ago I implemented all of these algorithms for a class at university, after watching this video I decided to do it in a way more visual and not something only in the command line.

In this way, I could see all algorithms working (it is beautiful haha), remember how they work, and have some fun with React as well.

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
- Maze: To get a random Maze, Each node has a 0.3 chance to become a wall (start and target nodes not included).
- Un/Weighted: Toggle between Unweighted and Weighted mode.

### Keyboard Commands

Just press one of the keys bellow and click in some node to change something.

- S: Press 'S' and click in a free node to change start Node.
- F: Press 'F' and click in a free node to change final/ target Node.
- W: Press 'W' and click and click in free nodes to create as many walls you like.

### Algorithms And Data Structures

All algorithms and data structures are implemented as they used to be taught [1][2], all code is available in this repo. I think the main observations are in Best-first Search and A*, I use Manhattan Distance as heuristic, in A* to scale the g = edge costs and h= Manhattan Distance I use: f = Alpha _ g + (1 - Alpha) _ h. [3]

After any algorithm runs you can check the distance of the chosen path (yellow) and how many nodes have been inspected in the browser's console.

### References

[1]: [Algorithms Specialization](https://www.coursera.org/specializations/algorithms) by Tim Roughgarden.
[2]: [JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/) by Colt Steele.
[3]: [Introduction to A\* from Amit’s Thoughts on Pathfinding](http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html) by Amit Patel.
