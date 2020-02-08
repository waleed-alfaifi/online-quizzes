import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header';
import Quiz from './components/layout/Quiz';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#5d99c6',
      },
      secondary: {
        main: '#43a047',
      },
      background: {
        default: '#fff',
      },
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="md">
          {/* <Welcome /> */}
          <Quiz />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
