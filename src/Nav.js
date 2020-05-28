import React from "react";
import bfs from "./algorithms/bfs";
import dfs from "./algorithms/dfs";
import { clearAnimation } from "./animations";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styles from "./NavStyles";
import { getInitialGrid, valToIndx, getNewMazedGrid } from "./helpers";

function Nav(props) {
  const { classes, grid, disable, start, end, setGrid, setDisable } = props;

  const clear = () => {
    clearAnimation(grid, start, end);
    const n = getInitialGrid(start, end);
    setGrid(n);
  };

  const newMaze = async () => {
    const newGrid = await getNewMazedGrid(grid, 0.33);
    setGrid(newGrid);
  };

  const handleClick = async (alg) => {
    setDisable(true);
    await alg;
    setDisable(false);
  };
  const [rowEnd, colEnd] = valToIndx(end);
  const [rowStart, colStart] = valToIndx(start);

  return (
    <AppBar position="static" color="inherit" className={classes.Navbar}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit">
          Pathfinding Visualizer
        </Typography>
        <div className={classes.button}>
          <button
            className={classes.button}
            onClick={() => clear()}
            disabled={disable}
          >
            Clear
          </button>
          <button
            className={classes.button}
            onClick={() => handleClick(newMaze())}
            disabled={disable}
          >
            Maze
          </button>
          <button
            className={classes.button}
            onClick={() =>
              handleClick(
                bfs(grid, grid[rowStart][colStart], grid[rowEnd][colEnd])
              )
            }
            disabled={disable}
          >
            BFS
          </button>
          <button
            className={classes.button}
            onClick={() =>
              handleClick(
                dfs(grid, grid[rowStart][colStart], grid[rowEnd][colEnd])
              )
            }
            disabled={disable}
          >
            DFS
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Nav);
