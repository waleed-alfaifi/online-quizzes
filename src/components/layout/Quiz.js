import React, { useState, useEffect } from 'react';
import QuizzesNav from '../QuizzesNav';
import QuizContent from '../QuizContent';
const data = require('../../quizzes-data.json');

const Quiz = () => {
  // https://www.indiabix.com/general-knowledge/questions-and-answers/

  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({});

  useEffect(() => {
    setQuizzes(data);
  }, []);

  const handleChoosingQuiz = quizId => {
    const chosenQuiz = quizzes.filter(quiz => quiz.id === quizId)[0];
    setCurrentQuiz(chosenQuiz);
  };

  // Render current quiz
  const renderCurrentQuiz = () => {
    return quizzes.map(quiz => {
      if (quiz.id === currentQuiz.id) {
        return (
          <React.Fragment key={quiz.id}>
            <QuizContent currentQuiz={currentQuiz} />
          </React.Fragment>
        );
      }

      // Return nothing if there is no selected quiz
      return '';
    });
  };

  return (
    <React.Fragment>
      <QuizzesNav
        quizzes={quizzes}
        currentQuiz={currentQuiz}
        handleChoosingQuiz={handleChoosingQuiz}
      />
      {renderCurrentQuiz()}
    </React.Fragment>
  );
};

export default Quiz;
