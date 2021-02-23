import Grid from "../../models/Grid";
import { FunctionHandled } from "./NavTypes";

export default interface NegButtonProps {
  grid: Grid;
  start: number;
  target: number;
  disable: boolean;
  btn: boolean;
  handleClick: (alg: FunctionHandled) => Promise<void>;
  setOpenDrawer(open: boolean): void;
  clear(): void;
  newMaze(): void;
  setIsWeighted(isWeighted: boolean): void;
}
