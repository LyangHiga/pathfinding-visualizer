// TODO: Refactoring with context api, too much props
// TODO: Create tests
import React, { Fragment, useState } from "react";

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

import Grid from "../models/Grid";
import { clearAnimation } from "../helpers/animations";
import { getNewMazedGrid } from "../helpers/gridHelper";

import WeightedButton from "./WeightedButton";
import NegButton from "./NegButton";
import { createBtnOptList, createUnWBtnsList } from "./navHelper";
import { NavProps, FunctionHandled } from "./types/NavTypes";
import styles from "../styles/NavStyles";

function Nav(props: NavProps) {
  const {
    grid,
    disable,
    start,
    target,
    setGrid,
    setDisable,
    isWeighted,
    setIsWeighted,
    toggleIsweighted,
    isNegative,
    toggleIsNegative,
    handleChangeStart,
    handleChangeTarget,
  } = props;

  const { nCols, nRows, max, min } = grid;

  const classes = styles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const clear = () => {
    clearAnimation(grid, start, target);
    const n = new Grid(start, target, nRows, nCols, max, min);
    setGrid(n);
    setIsWeighted(false);
  };

  const newMaze = async () => {
    const newGrid = await getNewMazedGrid(grid, 0.33);
    setGrid(newGrid);
    // console.log(grid === newGrid)
  };

  const negativeWeight = () => {
    clearAnimation(grid, start, target);
    let n;
    if (!isNegative) {
      n = new Grid(start, target, nRows, nCols, max, min);
    } else {
      n = new Grid(start, target, nRows, nCols, max);
    }
    setGrid(n);
    setIsWeighted(true);
    toggleIsNegative();
  };

  const handleClick = async (alg: FunctionHandled) => {
    setDisable(true);
    await alg;
    setDisable(false);
  };

  const btnOptList = createBtnOptList({
    grid,
    disable,
    isNegative,
    isWeighted,
    clear,
    newMaze,
    handleClick,
    handleChangeStart,
    handleChangeTarget,
    negativeWeight,
    toggleIsweighted,
  });

  const unWBtnsList = createUnWBtnsList({
    grid,
    start,
    target,
    isWeighted,
    disable,
    handleClick,
  });

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

  const btns = (
    <Fragment>
      <div className={classes.btnOpt}> {btnOpts}</div>
      <div>{isWeighted ? null : unWBtns}</div>
      <div>
        {!isWeighted ? null : isNegative ? (
          <NegButton
            grid={grid}
            start={start}
            target={target}
            disable={disable}
            btn={true}
            handleClick={handleClick}
            setOpenDrawer={setOpenDrawer}
            clear={clear}
            newMaze={newMaze}
            setIsWeighted={setIsWeighted}
          />
        ) : (
          <WeightedButton
            grid={grid}
            start={start}
            target={target}
            disable={disable}
            btn={true}
            handleClick={handleClick}
            setOpenDrawer={setOpenDrawer}
          />
        )}
      </div>
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
              <ListItemText className={classes.listItemText}>
                {btn.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        {isWeighted ? (
          !isNegative ? (
            <WeightedButton
              grid={grid}
              start={start}
              target={target}
              disable={disable}
              btn={false}
              handleClick={handleClick}
              setOpenDrawer={setOpenDrawer}
            />
          ) : (
            <NegButton
              grid={grid}
              start={start}
              target={target}
              disable={disable}
              btn={false}
              handleClick={handleClick}
              setOpenDrawer={setOpenDrawer}
              clear={clear}
              newMaze={newMaze}
              setIsWeighted={setIsWeighted}
            />
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
                <ListItemText className={classes.listItemText}>
                  {btn.name}
                </ListItemText>
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
            <ListItemText className={classes.listItemText}>
              Instructions
            </ListItemText>
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
