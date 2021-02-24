import Grid from "../../models/Grid";
import { FunctionHandled } from "./NavTypes";

export default interface WeightedButtonProps {
  grid: Grid;
  disable: boolean;
  btn: boolean;
  handleClick: (alg: FunctionHandled) => Promise<void>;
  setOpenDrawer(open: boolean): void;
}
