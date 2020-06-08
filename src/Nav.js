import React from 'react';
import bfs from './algorithms/bfs';
import dfs from './algorithms/dfs';
import dijkstra from './algorithms/dijkstra';
import { clearAnimation, clearPathAnimation } from './animations';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './NavStyles';
import { valToIndx, getNewMazedGrid } from './helpers/gridPropertiesHelper';
import { getInitialGrid } from './helpers/initialGridHelper';

function Nav(props) {
  const {
    classes,
    grid,
    disable,
    start,
    end,
    setGrid,
    setDisable,
    nRows,
    nCols,
    isWeighted,
    setIsWeighted,
    toggleIsweighted,
  } = props;

  const clear = () => {
    clearAnimation(grid, start, end);
    const n = getInitialGrid(start, end, nRows, nCols, 50);
    setGrid(n);
    setIsWeighted(false);
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
  const [rowEnd, colEnd] = valToIndx(end, nCols);
  const [rowStart, colStart] = valToIndx(start, nCols);

  return (
    <AppBar position='static' color='inherit' className={classes.Navbar}>
      <Toolbar>
        <Typography className={classes.title} variant='h6' color='inherit'>
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
            onClick={() => clearPathAnimation(grid)}
            disabled={disable}
          >
            Clear Path
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
            onClick={() => handleClick(toggleIsweighted())}
            disabled={disable}
          >
            Un/Weighted Grid
          </button>
          <button
            className={classes.button}
            onClick={() =>
              handleClick(
                bfs(grid, grid[rowStart][colStart], grid[rowEnd][colEnd], nCols)
              )
            }
            disabled={isWeighted ? true : disable}
          >
            BFS
          </button>
          <button
            className={classes.button}
            onClick={() =>
              handleClick(
                dfs(grid, grid[rowStart][colStart], grid[rowEnd][colEnd], nCols)
              )
            }
            disabled={isWeighted ? true : disable}
          >
            DFS
          </button>
          <button
            className={classes.button}
            onClick={() =>
              handleClick(
                dijkstra(
                  grid,
                  grid[rowStart][colStart],
                  grid[rowEnd][colEnd],
                  nCols
                )
              )
            }
            disabled={!isWeighted ? true : disable}
          >
            dijkstra
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Nav);
