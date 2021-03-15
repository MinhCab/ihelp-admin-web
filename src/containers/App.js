import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { theme } from '../assets/jss/Theme-variable'
import GlobalStyles from '../assets/jss/GlobalStyles'
import { ThemeProvider } from '@material-ui/core';
import Login from '../components/FullLayout/Login/Login'
import FullLayout from '../components/FullLayout/FullLayout'
import Dashboard from '../components/ContentComponents/Dashboard/Dashboard'
import Events from '../components/ContentComponents/Events/Events'
import Services from '../components/ContentComponents/Services/DashboardServices/DashboardServices'
import Users from '../components/ContentComponents/Users/DashboardAdmins/DashboardAdmins'
import EventDetail from '../components/ContentComponents/Events/EventDetails/EventDetail';
import ServiceDetail from '../components/ContentComponents/Services/ServiceDetail/ServiceDetail';
import StoreProvider from '../hoc/StoringData/Store'
import CreateEvent from '../components/ContentComponents/Events/CreateEvent/CreateEvent';

class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme} >
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <StoreProvider>
              <FullLayout>
                <Route exact path='/home/dashboard' render={() => <Dashboard />} />
                <Route exact path='/home/events' render={() => <Events />} />
                <Route exact path='/home/events/create' render={() => <CreateEvent />} />
                <Route exact path='/home/events/details/:id' component={EventDetail} />
                <Route exact path='/home/services' render={() => <Services />} />
                <Route exact path='/home/services/:id' component={ServiceDetail} />
                <Route exact path='/home/users' render={() => <Users />} />
              </FullLayout>
            </StoreProvider>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
