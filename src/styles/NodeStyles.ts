import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../helpers/consts";

const styles = makeStyles((theme) => ({
  node: {
    height: "25px",
    width: "25px",
    outline: `1px solid ${colors.light_blue}`,
    display: "inline-block",
    fontSize: "x-small",
    textAlign: "center",
    color: colors.black,
  },
}));

export default styles;
