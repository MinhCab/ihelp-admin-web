import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import FullLayout from '../components/FullLayout/FullLayout';

import { theme } from '../assets/jss/Theme-variable'
import GlobalStyles from '../assets/jss/GlobalStyles'
import { ThemeProvider } from '@material-ui/core';
// import Login from '../components/FullLayout/Login/Login';

class App extends Component {
  render() {
    return ( 
      <ThemeProvider theme={theme} >
        <GlobalStyles />
        <BrowserRouter >
          <FullLayout />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
