import AdjList from "./AdjList";

export default class Node {
  public readonly col: number;
  public readonly row: number;
  // converting row x col to a single vector
  // unique id
  public readonly val: number;
  public readonly weight: number;
  private _isStart: boolean;
  private _isTarget: boolean;
  private _isWall: boolean;
  public readonly adjList: AdjList;

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
    this._isStart = this.val === start;
    this._isTarget = this.val === target;
    this._isWall = false;
    this.adjList = adjList;
  }

  get isStart() {
    return this._isStart;
  }

  set isStart(val: boolean) {
    this._isStart = val;
  }

  get isTarget() {
    return this._isTarget;
  }

  set isTarget(val: boolean) {
    this._isTarget = val;
  }

  get isWall() {
    return this._isWall;
  }

  set isWall(val: boolean) {
    this._isWall = val;
  }
}
