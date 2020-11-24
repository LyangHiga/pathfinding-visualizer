import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
  Navbar: {
    display: "flex",
    alignItems: "space-around",
    justifyContent: "center",
    height: "8vh",
    marginBottom: "10px",
  },
  title: {
    display: "block",
  },
  button: {
    margin: "0 6px",
    fontSize: "1rem",
    textTransform: "none",
  },
  slider: {
    width: "12vw",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    },
    "& .rc-slider-rail": {
      height: "8px",
    },
    "& .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus, .rc-slider-handle": {
      backgroundColor: "black",
      outline: "none",
      border: "2px solid black",
      boxShadow: "none",
      width: "13px",
      height: "13px",
      marginLeft: "-7px",
      marginTop: "-3px",
    },
  },
}));

export default styles;
