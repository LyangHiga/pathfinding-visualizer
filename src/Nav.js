import React, { useState } from "react";
import "rc-slider/assets/index.css";
import bfs from "./algorithms/bfs";
import dfs from "./algorithms/dfs";
import a from "./algorithms/a";
import { clearAnimation, clearPathAnimation } from "./animations";
import Slider from "rc-slider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styles from "./NavStyles";
import { valToIndx, getNewMazedGrid } from "./helpers/gridPropertiesHelper";
import { getInitialGrid } from "./helpers/initialGridHelper";

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
    wRange,
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

  const hanldeSliderChange = () => {
    if (alpha !== 0 && alpha !== 1) setFName("A*");
    else {
      if (alpha === 0) setFName("Best Fisrt Search");
      if (alpha === 1) setFName("Dijkstra");
    }
  };

  const [rowEnd, colEnd] = valToIndx(end, nCols);
  const [rowStart, colStart] = valToIndx(start, nCols);
  const [alpha, setAlpha] = useState(0.57);
  const [fName, setFName] = useState("A*");
  const changeAlpha = (alpha) => setAlpha(alpha);

  return (
    <AppBar position="static" color="inherit" className={classes.Navbar}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit">
          Pathfinding Visualizer
        </Typography>
        <div className={classes.button}>
          <Button
            className={classes.button}
            onClick={() => clear()}
            disabled={disable}
          >
            Clear
          </Button>
          <Button
            className={classes.button}
            onClick={() => clearPathAnimation(grid)}
            disabled={disable}
          >
            Clear Path
          </Button>
          <Button
            className={classes.button}
            onClick={() => handleClick(newMaze())}
            disabled={disable}
          >
            Maze
          </Button>
          <Button
            className={classes.button}
            onClick={() => handleClick(toggleIsweighted())}
            disabled={disable}
          >
            Un/Weighted Grid
          </Button>
          <Button
            className={classes.button}
            onClick={() =>
              handleClick(
                bfs(grid, grid[rowStart][colStart], grid[rowEnd][colEnd], nCols)
              )
            }
            disabled={isWeighted ? true : disable}
          >
            BFS
          </Button>
          <Button
            className={classes.button}
            onClick={() =>
              handleClick(
                dfs(grid, grid[rowStart][colStart], grid[rowEnd][colEnd], nCols)
              )
            }
            disabled={isWeighted ? true : disable}
          >
            DFS
          </Button>
          <div className={classes.slider}>
            <Slider
              defaultValue={alpha}
              min={0}
              max={1}
              onAfterChange={hanldeSliderChange}
              onChange={changeAlpha}
              step={0.01}
              disabled={!isWeighted ? true : disable}
            />
          </div>
          {!isWeighted ? true : <span>Alpha: {alpha}</span>}
          <Button
            className={classes.button}
            onClick={() =>
              handleClick(
                a(
                  grid,
                  grid[rowStart][colStart],
                  grid[rowEnd][colEnd],
                  nCols,
                  wRange,
                  alpha
                )
              )
            }
            disabled={!isWeighted ? true : disable}
          >
            {fName}
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              window.open(
                "https://github.com/LyangHiga/pathfinding-visualizer#instructions",
                "_blank"
              );
            }}
          >
            Instructions
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Nav);
