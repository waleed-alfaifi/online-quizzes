import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Button,
  Fab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Assignment } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: theme.spacing(1.5),
  },
  cardActions: {
    justifyContent: 'center',
  },
}));

const Welcome = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {/* <CardHeader title="Welcome to Online Quizzes System" /> */}
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">Welcome to Online Quizzes System</Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Hello there!
          <br />
          Here you can take different quizzes and get your result and share it
          on many social media websites.
          <br />
          You can also create a new account to save your results as well as your
          porgress.
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {/* <Fab color="primary" variant="extended">
          <Assignment />
          Start
        </Fab> */}
      </CardActions>
    </Card>
  );
};

export default Welcome;
