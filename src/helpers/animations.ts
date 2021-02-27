import { colors } from "./consts";
import Grid from "../models/Grid";
import Node from "../models/Node";

// set a timeout so we can see all animations
export const sleep = (m: number) => new Promise((r) => setTimeout(r, m));

// path is an array with all node, with val representation, from start to target.
// paint all node that belong to this path in yellow
export const pathAnimation = async (path: number[]) => {
  for (let i = 0; i < path.length; i++) {
    await sleep(12);
    changingPropAnimation(path[i], colors.yellow);
  }
};

// change the color of a node (val) to a new color when it is visited
// A node is visited when its distance from start it is the smallest among all still available nodes (nonegative weight)
// or when its distance from start node decrease (for negative weights)
export const visitedAnimation = async (
  val: number,
  startVal: number,
  targetVal: number,
  color = colors.blue
) => {
  if (val === targetVal || val === startVal) return;
  await sleep(0.1);
  changingPropAnimation(val, color);
};

// change all nodes to free nodes, remove path and visited node animations
// Only start and target nodes keep the same
export const clearAnimation = (
  g: Grid,
  startVal: number,
  targetVal: number
) => {
  const { grid } = g;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const v = grid[i][j];
      if (v.val !== startVal && v.val !== targetVal)
        changingPropAnimation(v.val, colors.white);
    }
  }
};

// changes the color of a node (val)
const changingPropAnimation = (val: number, color: string) => {
  const vertex = document.getElementById(`node-${val}`)!.style;
  vertex.backgroundColor = `${color}`;
};

// chnages the color of a new wall
export const wallAnimation = async (node: Node) => {
  // start and target node cant be walls
  if (node.isStart || node.isTarget) return;
  await sleep(1);
  changingPropAnimation(node.val, colors.black);
};

// changes the color of the start node (val)
export const startNodeAnimation = (startVal: number) => {
  changingPropAnimation(startVal, colors.green);
};

// changes the color of the target node (val)
export const finishNodeAnimation = (targetVal: number) => {
  changingPropAnimation(targetVal, colors.red);
};

// changes the color from a node node to white (free node)
export const clearNodeAnimation = (val: number) => {
  changingPropAnimation(val, colors.white);
};

// changes all visited nodes and path to free nodes (color white)
export const clearPathAnimation = (g: Grid) => {
  const { grid } = g;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const v = grid[i][j];
      if (!v.isStart && !v.isTarget && !v.isWall) {
        clearNodeAnimation(v.val);
      }
    }
  }
};
