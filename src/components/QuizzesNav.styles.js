import { Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: `${theme.spacing(2)}px`,
    marginTop: theme.spacing(2),

    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
  },
  welcomeAlert: {
    borderRadius: 0,
  },
}));

// Cuatom Button
export const CustomButton = withStyles(() => ({
  root: {
    textTransform: "none",
    textAlign: "left",
  },
}))(Button);
