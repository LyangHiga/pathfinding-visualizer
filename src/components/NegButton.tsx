import React, { useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import bellmanFord from "../algorithms/bellmanFord";
import { valToIndx } from "../helpers/gridHelper";

import styles from "../styles/NavStyles";
import NegButtonProps from "./types/NegButtonTypes";

function NegButton(props: NegButtonProps) {
  const {
    grid,
    start,
    target,
    disable,
    btn,
    handleClick,
    setOpenDrawer,
    clear,
    newMaze,
    setIsWeighted,
  } = props;
  const classes = styles();
  const [rowStart, colStart] = valToIndx(start, grid.nCols);
  const [rowTarget, colTarget] = valToIndx(target, grid.nCols);

  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const bfDialog = (
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
            setOpenDrawer(false);
            handleCloseAlert();
            clear();
            await newMaze();
            await newMaze();
            setIsWeighted(true);
            handleClick(
              bellmanFord(
                grid,
                grid.grid[rowStart][colStart],
                grid.grid[rowTarget][colTarget]
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
                grid.grid[rowStart][colStart],
                grid.grid[rowTarget][colTarget]
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
  );

  const negBtn = (
    <div>
      <Button
        onClick={handleClickOpenAlert}
        disabled={disable}
        className={classes.button}
      >
        <Typography className={classes.text}>Bellman-Ford</Typography>
      </Button>
      {bfDialog}
    </div>
  );

  const negBtnList = (
    <List disablePadding>
      <ListItem
        onClick={handleClickOpenAlert}
        divider
        button
        className={classes.button}
        disabled={disable}
      >
        <ListItemText className={classes.listItemText}>
          Bellman-Ford
        </ListItemText>
      </ListItem>
      {bfDialog}
    </List>
  );

  return btn ? negBtn : negBtnList;
}

export default NegButton;
