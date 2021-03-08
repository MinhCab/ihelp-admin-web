import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { theme } from '../assets/jss/Theme-variable'
import GlobalStyles from '../assets/jss/GlobalStyles'
import { ThemeProvider } from '@material-ui/core';
import Login from '../components/FullLayout/Login/Login'
import FullLayout from '../components/FullLayout/FullLayout'

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
    const token = this.getCookie('accessToken');
    console.log(token)
    let firstpage = <Redirect exact from="/" to="/login" />
    if (token !== '') {
      firstpage = <Redirect exact from="/" to="/home" />
    }
    return (
      <ThemeProvider theme={theme} >
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={FullLayout} />
            <Route path="/login" exact component={Login} />
            {firstpage}
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
