import React from "react";
import { Card, CardContent, Typography, ListItemText } from "@material-ui/core";
import AnswerListItem from "./AnswerListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  questionContent: {
    color: theme.palette.primary.main,
  },
}));

const Question = ({ question, index, selectAnswer, answer }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6">Question {index}:</Typography>
        <Typography variant="h6" className={classes.questionContent}>
          {question.title}
        </Typography>
      </CardContent>

      <Card square>
        {question.choices.map((choice) => {
          return (
            <AnswerListItem
              disableRipple
              button
              key={choice.choice_id}
              selected={answer === choice.choice_id ? true : false}
              onClick={() =>
                selectAnswer(question.question_id, choice.choice_id)
              }
            >
              <ListItemText primary={choice.value} />
            </AnswerListItem>
          );
        })}
      </Card>
    </React.Fragment>
  );
};

export default Question;
