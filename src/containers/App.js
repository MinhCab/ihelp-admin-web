import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { theme } from '../assets/jss/Theme-variable'
import GlobalStyles from '../assets/jss/GlobalStyles'
import { ThemeProvider } from '@material-ui/core';
import Login from '../components/FullLayout/Login/Login'
import FullLayout from '../components/FullLayout/FullLayout'
import Dashboard from '../components/ContentComponents/Dashboard/Dashboard'
// import Events from '../components/ContentComponents/Events/Events'
import Events from '../components/ContentComponents/Events/DashboardEvents/DashboardEvents'
import Services from '../components/ContentComponents/Services/DashboardServices'
import Users from '../components/ContentComponents/Users/DashboardAdmins'
import Logout from '../components/ContentComponents/Logout/Logout'
import EventDetail from '../components/ContentComponents/Events/EventDetails/EventDetail';

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme} >
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <FullLayout>
              <Route exact path='/home/dashboard' render={() => <Dashboard/>} />
              <Route exact path='/home/events' render={() => <Events />} />
              <Route path='/home/events/:id' exact component={EventDetail} />
              <Route exact path='/home/services' render={() => <Services />} />
              <Route exact path='/home/users' render={() => <Users />} />
              <Route exact path='/home/logout' component={Logout} />
            </FullLayout>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
