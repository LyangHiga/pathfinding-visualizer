import Grid from "../../models/Grid";
export interface GridProps {
  grid: Grid;
  isWeighted: boolean;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
}
