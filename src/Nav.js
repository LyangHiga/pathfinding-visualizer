import React from 'react';
import bfs from './algorithms/bfs';
import dfs from './algorithms/dfs';
import { clearAnimation } from './animations';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './NavStyles';
import { getInitialGrid, valToIndx } from './helpers';

function Nav(props) {
  const { classes } = props;

  const clear = () => {
    clearAnimation(props.grid);
    const n = getInitialGrid(props.start);
    props.setGrid(n);
  };

  async function handleClick(alg) {
    props.setDisable(true);
    await alg;
    props.setDisable(false);
  }

  const { row, col } = valToIndx(props.start);

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
            disabled={props.disable}
          >
            Clear
          </button>
          <button
            className={classes.button}
            onClick={() => handleClick(bfs(props.grid, props.grid[row][col]))}
            disabled={props.disable}
          >
            BFS
          </button>
          <button
            className={classes.button}
            onClick={() => handleClick(dfs(props.grid, props.grid[row][col]))}
            disabled={props.disable}
          >
            DFS
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Nav);
