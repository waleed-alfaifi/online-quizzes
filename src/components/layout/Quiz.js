import React, { useState } from "react";
import QuizzesNav from "../QuizzesNav";
import QuizContent from "../QuizContent";
const data = require("../../quizzes-data.json");

// https://www.indiabix.com/general-knowledge/questions-and-answers/
const quizzes = data;

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState({});

  /**
   *
   * @param {number} quizId
   */
  const handleChoosingQuiz = (quizId) => {
    const chosenQuiz = quizzes.filter((quiz) => quiz.id === quizId)[0];

    setCurrentQuiz((current) =>
      current.id === chosenQuiz.id ? {} : chosenQuiz
    );
  };

  return (
    <>
      <QuizzesNav
        quizzes={quizzes}
        currentQuiz={currentQuiz}
        handleChoosingQuiz={handleChoosingQuiz}
      />
      {currentQuiz.id && (
        <QuizContent key={currentQuiz.id} currentQuiz={currentQuiz} />
      )}
    </>
  );
};

export default Quiz;
