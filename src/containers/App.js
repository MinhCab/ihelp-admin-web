import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { theme } from '../assets/jss/Theme-variable'
import GlobalStyles from '../assets/jss/GlobalStyles'
import { ThemeProvider } from '@material-ui/core';
import Login from '../components/ContentComponents/Login/Login'
import FullLayout from '../components/FullLayout/FullLayout'
import PrivateRoute from '../routes/PrivateRoute/PrivateRoute';
import AuthProvider from '../hoc/StoringAuth/AuthContext';

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme} >
        <GlobalStyles />
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/home" component={() => (
                <FullLayout />
              )} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}

export default App;
