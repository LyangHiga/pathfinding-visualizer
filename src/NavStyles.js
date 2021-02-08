import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  Navbar: {
    height: "10vh",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "10vh",
    },
  },
  title: {
    [theme.breakpoints.up("md")]: {
      marginRight: "1vw",
      paddingRight: "2vw",
      borderRight: "1px solid black",
      padding: "0.5em",
    },
  },
  btnOpt: {
    marginRight: "1vw",
    paddingRight: "1vw",
    borderRight: "1px solid black",
    padding: "0.5em",
    [theme.breakpoints.down("md")]: {
      marginRight: "0.7vw",
      paddingRight: "1.6vw",
      borderRight: "1px solid black",
      padding: "0.3em",
    },
  },
  button: {
    margin: "0 6px",
    fontSize: "1rem",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      margin: "0 4px",
      fontSize: "0.8rem",
      textTransform: "none",
    },
  },
  slider: {
    width: "12vw",
    margin: "0 10px",
    [theme.breakpoints.down("md")]: {
      width: "8vw",
      margin: "0 6px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
    },
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
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  text: {
    fontSize: "1em",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },
}));

export default styles;
