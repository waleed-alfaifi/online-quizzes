import React, { useState, useEffect } from "react";
import {
  Paper,
  Container,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  List,
} from "@material-ui/core";
import Question from "./Question";
import ScorePage from "./ScorePage";
import {
  setItemSession,
  getItemSession,
  setItem,
  getItem,
} from "../helpers/storage";
import { constants } from "../config/constants";
import { useStyles } from "./QuizContent.styles";

function OverviewPage({ startQuiz, overview }) {
  const classes = useStyles();

  return (
    <>
      <CardContent className={classes.quizOverview}>{overview}</CardContent>
      <CardActions>
        <Button color="primary" size="large" onClick={startQuiz}>
          Start
        </Button>
      </CardActions>
    </>
  );
}

function Navigation({ prevPage, nextPage, submitQuiz }) {
  const classes = useStyles();
  return (
    <CardActions className={classes.navigationButtons}>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={prevPage}
        disabled={!prevPage}
      >
        Previous
      </Button>
      {!nextPage ? (
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          onClick={submitQuiz}
        >
          Submit
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={nextPage}
        >
          Next
        </Button>
      )}
    </CardActions>
  );
}
/**
 * @typedef {Partial<{
    id: number;
    title: string;
    overview: string;
    questions: {
        question_id: number;
        title: string;
        choices: {
            choice_id: string;
            value: string;
        }[];
        answer: string;
    }[];
  }>} Quiz
 * @param {object} param0 
 * @param {Quiz} param0.currentQuiz
 * @returns 
 */
const QuizContent = ({ currentQuiz }) => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({ value: 0, points: 10, from: 100 });
  const classes = useStyles();
  const numberOfQuestions = currentQuiz.questions?.length ?? 0;

  // Only when the component mounts, look for existing session data
  useEffect(() => {
    const currentPage = getItemSession(constants.CURRENT_PAGE);
    if (currentPage) {
      const savedPage = currentPage[currentQuiz.id];
      if (savedPage) {
        setPage(savedPage);
      }
    }

    const answers = getItemSession(constants.ANSWERS);
    if (answers) {
      const savedAnswers = answers[currentQuiz.id];
      if (savedAnswers) {
        setAnswers(savedAnswers);
      }
    }
  }, [currentQuiz.id]);

  useEffect(() => {
    if (currentQuiz.questions) {
      const number = currentQuiz.questions.length;
      setScore((prevScore) => ({
        ...prevScore,
        from: number * prevScore.points,
      }));
    }
  }, [currentQuiz.questions]);

  useEffect(() => {
    const prevPageObject = getItemSession(constants.CURRENT_PAGE);

    if (page !== numberOfQuestions + 1) {
      setItemSession(constants.CURRENT_PAGE, {
        ...prevPageObject,
        [currentQuiz.id]: page,
      });
    } else {
      setAnswers([]);

      // To avoid storing score page in storage
      setItemSession(constants.CURRENT_PAGE, {
        ...prevPageObject,
        [currentQuiz.id]: 0,
      });
    }
  }, [page, currentQuiz.id, numberOfQuestions]);

  useEffect(() => {
    const prevAnswersObject = getItemSession(constants.ANSWERS);
    setItemSession(constants.ANSWERS, {
      ...prevAnswersObject,
      [currentQuiz.id]: answers,
    });
  }, [answers, currentQuiz.id]);

  // TODO: this should be inside a submit event listener
  useEffect(() => {
    if (page === numberOfQuestions + 1) {
      // Save result in local storage
      const result = {
        quiz: currentQuiz.title,
        value: score.value,
        date: Date.now(),
      };

      const storedResults = getItem(constants.RESULTS);
      if (storedResults) {
        setItem(constants.RESULTS, [...storedResults, result]);
      } else {
        setItem(constants.RESULTS, [result]);
      }
    }
  }, [page, numberOfQuestions, score, currentQuiz.title]);

  const selectAnswer = (questionId, answerId) => {
    const newAnswer = {
      questionId,
      answerId,
    };

    // Get all answers except those for the current question (if any)
    const newAnswersArray = answers.filter(
      (answer) => answer.questionId !== questionId
    );

    // Add the new answer and update the state
    newAnswersArray.push(newAnswer);
    setAnswers(newAnswersArray);
  };

  const startQuiz = () => setPage(1);

  const submitQuiz = () => {
    const correctAnswers = currentQuiz.questions.map((question) => ({
      questionId: question.question_id,
      correctAnswer: question.answer,
    }));

    answers.forEach((answer) => {
      const correspondingCorrectAns = correctAnswers.filter(
        (correctAns) => correctAns.questionId === answer.questionId
      )[0];

      if (answer.answerId === correspondingCorrectAns.correctAnswer) {
        setScore((prevScore) => ({
          ...prevScore,
          value: prevScore.value + score.points,
        }));
      }
    });

    // Move to the score page
    setPage(numberOfQuestions + 1);
  };

  const retakeQuiz = () => {
    setPage(0);
    setAnswers([]);
    setScore((prevScore) => ({ ...prevScore, value: 0 }));
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const isOverviewPage = page === 0;
  const isFirstPage = page === 1;
  const isLastPage = page === numberOfQuestions;
  const isScorePage = page === numberOfQuestions + 1;
  const doRenderNavigation = !isOverviewPage && !isScorePage;

  // Render the current page
  const renderPage = () => {
    // The overview page
    if (isOverviewPage)
      return (
        <OverviewPage overview={currentQuiz.overview} startQuiz={startQuiz} />
      );

    if (isScorePage)
      return (
        <ScorePage
          score={{ value: score.value, from: score.from }}
          title={`Congratulations, you just finished the ${currentQuiz.title} quiz.`}
          retakeQuiz={retakeQuiz}
        />
      );

    // The question page (based on the question index number)
    const { questions } = currentQuiz;
    const currentQuestion = questions?.find((_, index) => index + 1 === page);
    const currentQuestionAnswer = answers.filter(
      (a) => a.questionId === currentQuestion.question_id
    )[0];

    return (
      <Question
        question={currentQuestion}
        index={currentQuestion.question_id}
        selectAnswer={selectAnswer}
        answer={currentQuestionAnswer?.answerId}
      />
    );
  };

  return (
    <Paper className={classes.root} variant="outlined" square>
      <Container className={classes.container}>
        <Card square raised className={classes.card}>
          <CardHeader title={currentQuiz.title} />
          <CardContent className={classes.cardContent}>
            <List>
              <Card square>{renderPage()}</Card>
            </List>
          </CardContent>
          {doRenderNavigation && (
            <Navigation
              prevPage={isFirstPage ? undefined : prevPage}
              nextPage={isLastPage ? undefined : nextPage}
              submitQuiz={submitQuiz}
            />
          )}
        </Card>
      </Container>
    </Paper>
  );
};

export default QuizContent;
