import React, { useState } from "react";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import a from "../algorithms/a";
import styles from "../styles/NavStyles";
import WeightedButtonProps from "./types/WeightedButtonTypes";

function WeightedButton(props: WeightedButtonProps) {
  const [alpha, setAlpha] = useState(0.57);
  const [fName, setFName] = useState("A*");
  const { grid, disable, btn, handleClick, setOpenDrawer } = props;
  const classes = styles();

  const changeAlpha = (alpha: number) => setAlpha(alpha);

  const hanldeSliderChange = () => {
    if (alpha !== 0 && alpha !== 1) setFName("A*");
    else {
      if (alpha === 0) setFName("Best Fisrt Search");
      if (alpha === 1) setFName("Dijkstra");
    }
  };

  const MySlider = (
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
  );

  const WButton = (
    <div>
      {MySlider}
      <span className={classes.text}>Alpha: {alpha}</span>
      <Button
        className={classes.button}
        onClick={() => handleClick(a(grid, alpha))}
        disabled={disable}
      >
        {fName}
      </Button>
    </div>
  );

  const WListItem = (
    <List disablePadding>
      <ListItem divider>{MySlider}</ListItem>
      <ListItem divider className={classes.button}>
        <ListItemText className={classes.listItemText}>
          Alpha: {alpha}
        </ListItemText>
      </ListItem>
      <ListItem
        onClick={() => {
          setOpenDrawer(false);
          handleClick(a(grid, alpha));
        }}
        divider
        button
        className={classes.button}
        disabled={disable}
      >
        <ListItemText className={classes.listItemText}>{fName}</ListItemText>
      </ListItem>
    </List>
  );

  return btn ? WButton : WListItem;
}

export default WeightedButton;
