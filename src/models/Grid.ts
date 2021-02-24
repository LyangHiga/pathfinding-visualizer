import Node from "./Node";
import { createAdjList, getVal } from "../helpers/gridHelper";

export default class Grid {
  public grid: Node[][];
  public start: number;
  public target: number;
  public readonly nRows: number;
  public readonly nCols: number;
  // min and max weight allowed
  public readonly min: number;
  public readonly max: number;
  constructor(
    start: number,
    target: number,
    nRows: number,
    nCols: number,
    // min and max weight
    max = 1,
    min = 1
  ) {
    this.grid = [];
    this.start = start;
    this.target = target;
    this.nCols = nCols;
    this.nRows = nRows;
    this.min = min;
    this.max = max;
    for (let row = 0; row < nRows; row++) {
      const currentRow: Node[] = [];
      for (let col = 0; col < nCols; col++) {
        // get random weight for all edges of this node
        const weight = Math.floor(Math.random() * (max - min) + min);
        const val = getVal(row, nCols, col);
        const AdjList = createAdjList(val, col, row, nRows, nCols);
        const newNode = new Node(col, row, val, start, target, AdjList, weight);
        currentRow.push(newNode);
      }
      this.grid.push(currentRow);
    }
  }
}
