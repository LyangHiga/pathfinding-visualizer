import Grid from "../../models/Grid";
import { FunctionHandled } from "./NavTypes";

export interface BtnOptListParams {
  grid: Grid;
  disable: boolean;
  isNegative: boolean;
  isWeighted: boolean;
  clear(): void;
  newMaze(): Promise<void>;
  handleClick(alg: FunctionHandled): Promise<void>;
  handleChangeStart(): void;
  handleChangeTarget(): void;
  negativeWeight: () => void;
  toggleIsweighted: () => void;
}

export interface UnWBtnsListParams {
  grid: Grid;
  isWeighted: boolean;
  disable: boolean;
  handleClick(alg: FunctionHandled): Promise<void>;
}
