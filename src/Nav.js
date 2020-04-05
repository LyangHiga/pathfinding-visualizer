import React from 'react';
import bfs from './algorithms/bfs';
import dfs from './algorithms/dfs';
import { clear } from './animations';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './NavStyles';

function Nav(props) {
  const { classes } = props;

  async function handleClick(alg) {
    props.setDisable(true);
    await alg;
    props.setDisable(false);
  }

  return (
    <AppBar position="static" color="inherit" className={classes.Navbar}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit">
          Pathfinding Visualizer
        </Typography>
        <div className={classes.button}>
          <button
            className={classes.button}
            onClick={() => clear(props.grid)}
            disabled={props.disable}
          >
            Clear
          </button>
          <button
            className={classes.button}
            onClick={() => handleClick(bfs(props.grid))}
            disabled={props.disable}
          >
            {' '}
            BFS
          </button>
          <button
            className={classes.button}
            onClick={() => handleClick(dfs(props.grid))}
            disabled={props.disable}
          >
            {' '}
            DFS
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Nav);
