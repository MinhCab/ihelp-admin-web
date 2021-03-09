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

class App extends Component {

  getCookie = (cname) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  render() {
    return (
      <ThemeProvider theme={theme} >
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <FullLayout>
              <Route path='/home/dashboard' component={Dashboard} />
              <Route path='/home/events' component={Events} />
              <Route path='/home/services' component={Services} />
              <Route path='/home/users' component={Users} />
            </FullLayout>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
