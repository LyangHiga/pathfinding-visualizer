import Grid from "../../models/Grid";

export interface NavProps {
  grid: Grid;
  disable: boolean;
  setGrid(grid: Grid): void;
  setDisable(isDisabled: boolean): void;
  isWeighted: boolean;
  setIsWeighted(isWeighted: boolean): void;
  toggleIsweighted(): void;
  isNegative: boolean;
  toggleIsNegative(): void;
  handleChangeStart(): void;
  handleChangeTarget(): void;
}

export type FunctionHandled =
  | Promise<void>
  | Promise<
      | {
          path: number[];
          parents: Map<number, number | null>;
          visited: Map<number, boolean>;
        }
      | {
          path: null;
          parents: Map<number, number | null>;
          visited: Map<number, boolean>;
        }
    >
  | Promise<
      | {
          parents: Map<number, number | null>;
          path: null;
        }
      | {
          parents: Map<number, number | null>;
          path: number[];
        }
    >;
