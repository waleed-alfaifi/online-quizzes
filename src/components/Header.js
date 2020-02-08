import React from 'react';
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
} from '@material-ui/core';
import {
  Menu,
  AccountCircle,
  ExitToApp,
  ChevronLeft,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// Custom styles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    marginBottom: theme.spacing(3),
  },
  appTitleHeading: {
    margin: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0.5, 0),
  },
  drawerList: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    paddingTop: 0,
  },
}));

const Header = () => {
  const [state, setState] = React.useState({
    open: false,
  });
  const classes = useStyles();

  const toggleDrawer = e => {
    setState({ ...state, open: !state.open });
  };

  // Drawer Side List Component
  const DrawerList = () => (
    <React.Fragment>
      <List className={classes.drawerList}>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Waleed" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
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

        <Drawer
          open={state.open}
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

export default Header;
