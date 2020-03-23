import React, { useState } from 'react';
import { Container, Typography, NativeSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getItem } from '../../helpers/storage';
import { strings } from '../../config/constants';

const useStyles = makeStyles(theme => ({
  instructions: {
    margin: theme.spacing(2, 0),
  },
  chartContainer: {
    marginTop: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [selectedQuiz, setSelectedQuiz] = useState(undefined);

  const formatDate = date => moment(date).format('D/MMM/YYYY');

  const handleChoosingQuiz = e => {
    const { value } = e.target;
    setSelectedQuiz(value);
  };

  const getQuizData = () => {
    const results = getItem(strings.RESULTS);
    if (results) {
      const quizResults = results.filter(
        result => result.quiz === selectedQuiz
      );

      // Get dates of results and format them to be used
      // later in rendering the chart
      let dateLabels = quizResults.map(result => {
        return formatDate(result.date);
      });

      // Remove duplicates
      dateLabels = [...new Set(dateLabels)];

      // This is where the data on the chart will be stored
      const data = [];

      // This is to determine how many chart bars there should be
      let maxNumberTrials = 0;

      // Iterate over all dates to find how many trials there are
      // for each date
      dateLabels.forEach(label => {
        const item = {
          name: label,
        };

        let counter = 1;

        quizResults.forEach(result => {
          if (formatDate(result.date) === label) {
            if (counter > maxNumberTrials) {
              maxNumberTrials = counter;
            }

            item[`Trial ${counter}`] = result.value;
            counter++;
          }
        });

        data.push(item);
      });

      const bars = [];

      for (let i = 1; i <= maxNumberTrials; i++) {
        // To make colors of even-numbered bars different from odd-numbered
        let color = i % 2 === 0 ? '#82ca9d' : '#8884d8';

        // Add to an array for rendering
        bars.push(<Bar key={i} dataKey={`Trial ${i}`} fill={color} />);
      }

      return {
        data,
        bars,
      };
    }
  };

  const renderSelectableQuizzes = () => {
    const results = getItem(strings.RESULTS);

    if (results) {
      // List that contains duplicates
      const initialList = results.map(result => result.quiz);

      // After removing duplicates (ready for rendering)
      const finalList = new Set(initialList);

      return [...finalList].map(quiz => <option key={quiz}>{quiz}</option>);
    }
  };

  const renderBarChart = () => {
    const { data, bars } = getQuizData();

    return (
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} onClick={e => console.log(e)}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {bars}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div>
      <Container fixed disableGutters className="text-center">
        <Typography variant="h4" align="center">
          Welcome to your dashboard
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={classes.instructions}
        >
          Please select a quiz to see your trials for that quiz
        </Typography>
        <NativeSelect
          defaultValue="Choose a quiz"
          value={selectedQuiz}
          onChange={handleChoosingQuiz}
          style={{ width: '50%' }}
        >
          <option disabled>Choose a quiz</option>
          {renderSelectableQuizzes()}
        </NativeSelect>
        {selectedQuiz && (
          <div className={classes.chartContainer}>
            <Typography variant="h5" align="center">
              {selectedQuiz}
            </Typography>
            {renderBarChart()}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
