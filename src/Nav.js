// TODO: Refactoring Drawer and btns
import React, { Fragment, useState } from "react";
import "rc-slider/assets/index.css";
import bfs from "./algorithms/bfs";
import dfs from "./algorithms/dfs";
import a from "./algorithms/a";
import bellmanFord from "./algorithms/bellmanFord";
import { clearAnimation, clearPathAnimation } from "./helpers/animations";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Slider from "rc-slider";
import AppBar from "@material-ui/core/AppBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "./NavStyles";
// import { getNewMazedGrid } from "./helpers/gridPropertiesHelper";
import { valToIndx, getNewMazedGrid } from "./helpers/gridHelper";

import Grid from "./models/Grid";

const MIN = -5;

function Nav(props) {
  const {
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
    isNegative,
    toggleIsNegative,
    handleChangeStart,
    handleChangeFinish,
  } = props;

  const classes = styles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [rowEnd, colEnd] = valToIndx(end, nCols);
  const [rowStart, colStart] = valToIndx(start, nCols);
  const [alpha, setAlpha] = useState(0.57);
  const [fName, setFName] = useState("A*");
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const changeAlpha = (alpha) => setAlpha(alpha);

  const clear = () => {
    clearAnimation(grid.grid, start, end);
    const n = new Grid(start, end, nRows, nCols, wRange, MIN);
    setGrid(grid);
    setIsWeighted(false);
  };

  const newMaze = async () => {
    const newGrid = await getNewMazedGrid(grid, 0.33);
    setGrid(newGrid);
    // console.log(grid === newGrid)
  };

  const negativeWeight = () => {
    clearAnimation(grid, start, end);
    let n;
    if (!isNegative) {
      n = new Grid(start, end, nRows, nCols, wRange, MIN);
    } else {
      n = new Grid(start, end, nRows, nCols, wRange);
    }
    setGrid(n);
    setIsWeighted(true);
    toggleIsNegative();
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

  const btnOptList = [
    { name: "Clear", click: () => clear(), disabled: disable },
    {
      name: "Clear Path",
      click: () => clearPathAnimation(grid),
      disabled: disable,
    },
    { name: "Maze", click: () => handleClick(newMaze()), disabled: disable },
    {
      name: "Change Start",
      click: () => handleChangeStart(),
      disabled: disable,
    },
    {
      name: "Change Target",
      click: () => handleChangeFinish(),
      disabled: disable,
    },
    {
      name: isWeighted ? "Unweighted Grid" : "Weighted Grid",
      click: () => handleClick(toggleIsweighted()),
      disabled: disable,
    },
    {
      name: isNegative ? "Positive" : "Negative",
      click: negativeWeight,
      disabled: disable,
    },
  ];

  const unWBtnsList = [
    {
      name: "BFS",
      click: () => {
        console.log("bfs cliked");
        handleClick(
          bfs(
            grid,
            grid.grid[rowStart][colStart],
            grid.grid[rowEnd][colEnd],
            nCols
          )
        );
      },
      disabled: isWeighted ? true : disable,
    },
    {
      name: "DFS",
      click: () =>
        handleClick(
          dfs(grid, grid[rowStart][colStart], grid[rowEnd][colEnd], nCols)
        ),
      disabled: isWeighted ? true : disable,
    },
  ];

  const btnOpts = (
    <Fragment>
      {btnOptList.map((btn) =>
        btn.name === "Change Start" || btn.name === "Change Target" ? null : (
          <Button
            key={`btnOpt-${btn.name}`}
            className={classes.button}
            onClick={btn.click}
            disabled={btn.disabled}
          >
            {btn.name}
          </Button>
        )
      )}
    </Fragment>
  );

  const unWBtns = (
    <Fragment>
      {unWBtnsList.map((btn) => (
        <Button
          key={`unWBtn-${btn.name}`}
          className={classes.button}
          onClick={btn.click}
          disabled={btn.disabled}
        >
          <Typography className={classes.text}>{btn.name}</Typography>
        </Button>
      ))}
    </Fragment>
  );

  const wBtns = (
    <Fragment>
      <div className={classes.slider}>
        <Slider
          defaultValue={alpha}
          min={0}
          max={1}
          onAfterChange={hanldeSliderChange}
          onChange={changeAlpha}
          step={0.01}
          disabled={disable}
        />
      </div>
      <span className={classes.text}>Alpha: {alpha}</span>
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
        disabled={disable}
      >
        {fName}
      </Button>
    </Fragment>
  );

  const negBtns = (
    <Fragment>
      <Button
        onClick={handleClickOpenAlert}
        disabled={disable}
        className={classes.button}
      >
        <Typography className={classes.text}>Bellman-Ford</Typography>
      </Button>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          How to run Bellman-Ford?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            * Recommended Mode: Will Clear Grid, add to layers of walls and then
            run Bellman-Ford. PS: Put both start and finsih node in the same
            connected component is necessary for search min Path.
          </DialogContentText>
          <DialogContentText>
            * Free-Style: Won't change any grid property and you can run as you
            want.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              handleCloseAlert();
              clear();
              await newMaze();
              await newMaze();
              setIsWeighted(true);
              handleClick(
                bellmanFord(
                  grid,
                  grid[rowStart][colStart],
                  grid[rowEnd][colEnd],
                  nCols
                )
              );
            }}
            color="primary"
          >
            Recommended
          </Button>
          <Button
            onClick={async () => {
              handleCloseAlert();
              handleClick(
                bellmanFord(
                  grid,
                  grid[rowStart][colStart],
                  grid[rowEnd][colEnd],
                  nCols
                )
              );
            }}
            color="primary"
            autoFocus
          >
            Free-Style
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );

  const btns = (
    <Fragment>
      <div className={classes.btnOpt}> {btnOpts}</div>
      <div>{isWeighted ? null : unWBtns}</div>
      <div>{!isWeighted ? null : isNegative ? negBtns : wBtns}</div>
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
    </Fragment>
  );

  const drawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <List disablePadding>
          {btnOptList.map((btn) => (
            <ListItem
              key={`list-${btn.name}`}
              onClick={() => {
                setOpenDrawer(false);
                btn.click();
              }}
              divider
              button
              className={classes.button}
              disabled={disable}
            >
              <ListItemText>{btn.name}</ListItemText>
            </ListItem>
          ))}
        </List>
        {isWeighted ? (
          !isNegative ? (
            <List disablePadding>
              <ListItem divider>
                <Slider
                  defaultValue={alpha}
                  min={0}
                  max={1}
                  onAfterChange={hanldeSliderChange}
                  onChange={changeAlpha}
                  step={0.01}
                  disabled={disable}
                  className={classes.slider}
                />
              </ListItem>
              <ListItem divider className={classes.button}>
                <ListItemText>Alpha: {alpha}</ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  handleClick(
                    a(
                      grid,
                      grid[rowStart][colStart],
                      grid[rowEnd][colEnd],
                      nCols,
                      wRange,
                      alpha
                    )
                  );
                }}
                divider
                button
                className={classes.button}
                disabled={disable}
              >
                <ListItemText>{fName}</ListItemText>
              </ListItem>
            </List>
          ) : (
            <List disablePadding>
              <ListItem
                onClick={handleClickOpenAlert}
                divider
                button
                className={classes.button}
                disabled={disable}
              >
                <ListItemText>Bellman-Ford</ListItemText>
              </ListItem>
              <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  How to run Bellman-Ford?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    * Recommended Mode: Will Clear Grid, add to layers of walls
                    and then run Bellman-Ford. PS: Put both start and finsih
                    node in the same connected component is necessary for search
                    min Path.
                  </DialogContentText>
                  <DialogContentText>
                    * Free-Style: Won't change any grid property and you can run
                    as you want.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={async () => {
                      setOpenDrawer(false);
                      handleCloseAlert();
                      clear();
                      await newMaze();
                      await newMaze();
                      setIsWeighted(true);
                      handleClick(
                        bellmanFord(
                          grid,
                          grid[rowStart][colStart],
                          grid[rowEnd][colEnd],
                          nCols
                        )
                      );
                    }}
                    color="primary"
                  >
                    Recommended
                  </Button>
                  <Button
                    onClick={async () => {
                      setOpenDrawer(false);
                      handleCloseAlert();
                      handleClick(
                        bellmanFord(
                          grid,
                          grid[rowStart][colStart],
                          grid[rowEnd][colEnd],
                          nCols
                        )
                      );
                    }}
                    color="primary"
                    autoFocus
                  >
                    Free-Style
                  </Button>
                </DialogActions>
              </Dialog>
            </List>
          )
        ) : (
          <List disablePadding>
            {unWBtnsList.map((btn) => (
              <ListItem
                key={`list-${btn.name}`}
                onClick={() => {
                  setOpenDrawer(false);
                  btn.click();
                }}
                divider
                button
                className={classes.button}
                disabled={disable}
              >
                <ListItemText>{btn.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        )}
        <List>
          <ListItem
            divider
            className={classes.button}
            onClick={() => {
              window.open(
                "https://github.com/LyangHiga/pathfinding-visualizer#instructions",
                "_blank"
              );
            }}
          >
            <ListItemText>Instructions</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon></MenuIcon>
      </IconButton>
    </Fragment>
  );

  return (
    <AppBar position="static" color="inherit" className={classes.Navbar}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit">
          Pathfinding Visualizer
        </Typography>
        {matchesSM ? drawer : btns}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
