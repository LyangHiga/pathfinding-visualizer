import AdjList from "./AdjList";

export default class Node {
  private col: number;
  private row: number;
  // converting row x col to a single vector
  // unique id
  public val: number;
  public weight: number;
  public isStart: boolean;
  public isTarget: boolean;
  public isWall: boolean;
  public adjList: AdjList;

  constructor(
    col: number,
    row: number,
    val: number,
    start: number,
    target: number,
    adjList: AdjList,
    weight = 1
  ) {
    this.col = col;
    this.row = row;
    this.val = val;
    this.weight = weight;
    this.isStart = this.val === start;
    this.isTarget = this.val === target;
    this.isWall = false;
    this.adjList = adjList;
  }
}
