import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.light,
  },
  container: {
    margin: theme.spacing(3, 0),
  },
  quizOverview: {
    fontSize: theme.typography.fontSize * 1.5,
    margin: theme.spacing(3, 0),
  },
  navigationButtons: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(2, 2),

    "& button": {
      borderRadius: 0,
      "&.MuiButton-containedPrimary": {
        backgroundColor: theme.palette.primary.dark,
        "&.Mui-disabled": {
          backgroundColor: theme.palette.action.disabledBackground,
        },
      },
    },
  },
}));
