import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import {
  Menu,
  Dashboard,
  Delete,
  ChevronLeft,
  Home,
  Launch,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { removeItem } from "../helpers/storage";
import { constants } from "../config/constants";

// Custom styles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    marginBottom: theme.spacing(3),
  },
  appTitleHeading: {
    margin: "auto",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0.5, 0),
  },
  drawerList: {
    display: "flex",
    flexDirection: "column",
    width: 250,
    paddingTop: 0,
  },
  resetData: {
    color: theme.palette.error.main,
  },
  deleteData: {
    color: theme.palette.error.main,
  },
}));

const Header = ({ history }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const classes = useStyles();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const deleteData = () => {
    removeItem(constants.RESULTS);
    history.push("/");
    setDialogOpen(false);
    setDrawerOpen(false);
  };

  // Drawer Side List Component
  const DrawerList = () => (
    <React.Fragment>
      <List className={classes.drawerList}>
        <Divider />
        <Link to="/" onClick={toggleDrawer}>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/dashboard" onClick={toggleDrawer}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <ListItem button onClick={toggleDialog}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Reset Data" className={classes.resetData} />
        </ListItem>
        <Divider />
        <a
          href="https://www.indiabix.com/general-knowledge/questions-and-answers/"
          target="blank"
        >
          <ListItem button>
            <ListItemIcon>
              <Launch />
            </ListItemIcon>
            <ListItemText primary="Quizzes Source" />
          </ListItem>
        </a>
      </List>
      <Divider />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar variant="dense" component="nav" disableGutters>
          <Button color="inherit" onClick={toggleDrawer}>
            <Menu />
          </Button>
          <Typography variant="h6" className={classes.appTitleHeading}>
            Online Quizzes System
          </Typography>
        </Toolbar>

        <Dialog
          open={dialogOpen}
          onClose={toggleDialog}
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will delete all of your results data from your browser
              storage.
            </DialogContentText>
            <DialogActions>
              <Button
                // variant="contained"
                color="primary"
                onClick={toggleDialog}
              >
                Cancel
              </Button>
              <Button
                // variant="contained"
                className={classes.deleteData}
                onClick={deleteData}
              >
                Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <Drawer
          open={drawerOpen}
          anchor="left"
          onClose={toggleDrawer}
          variant="temporary"
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </div>
          <DrawerList />
        </Drawer>
      </AppBar>
    </React.Fragment>
  );
};

export default withRouter(Header);
