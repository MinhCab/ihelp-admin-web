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
              {/* <FullLayout/> */}
              {/* <Route exact path='/home/dashboard' component={Dashboard}/>
                <Route exact path='/home/events' render={() => <Events />} />
                <Route exact path='/home/events/create' render={() => <CreateEvent />} />
                <Route exact path='/home/events/details/:id' component={EventDetail} />
                <Route exact path='/home/services' render={() => <Services />} />
                <Route exact path='/home/services/:id' component={ServiceDetail} />
                <Route exact path='/home/users' render={() => <Users />} /> */}
              {/* </FullLayout> */}
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}

export default App;
