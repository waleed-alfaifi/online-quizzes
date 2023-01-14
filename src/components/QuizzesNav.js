import React from "react";
import { Container, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Assignment } from "@material-ui/icons";
import { useStyles, CustomButton } from "./QuizzesNav.styles";

const QuizzesNav = (props) => {
  const classes = useStyles();
  const { quizzes, handleChoosingQuiz, currentQuiz } = props;

  return (
    <Paper variant="outlined" square className={classes.paper}>
      <Alert severity="info" className={classes.welcomeAlert}>
        Hi there! <br />
        Here you can challenge yourself with different quizzes in different
        areas. Your results will be saved in your browser storage. You can see a
        nice graphical representation of your results in your dashboard.
        <br />
        Go ahead and choose a quiz to get started!
      </Alert>
      <Container fixed className={classes.container}>
        {quizzes.map((quiz) => {
          const isSelected = currentQuiz?.id === quiz.id;

          return (
            <CustomButton
              key={quiz.id}
              size="medium"
              variant="contained"
              color={isSelected ? "secondary" : "primary"}
              startIcon={<Assignment />}
              onClick={() => handleChoosingQuiz(quiz.id)}
              disableRipple
            >
              {quiz.title}
            </CustomButton>
          );
        })}
      </Container>
    </Paper>
  );
};

export default QuizzesNav;
