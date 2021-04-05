import React, { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { SidebarWidth } from '../../assets/jss/Theme-variable.js'
import { Redirect, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute/PrivateRoute';

import Dashboard from '../ContentComponents/Dashboard/Dashboard'
import Events from '../ContentComponents/Events/Events'
import Services from '../ContentComponents/Services/Services'
import Users from '../ContentComponents/Users/Users'
import EventDetail from '../ContentComponents/Events/EventDetails/EventDetail';
import ServiceDetail from '../ContentComponents/Services/ServiceDetail/ServiceDetail';
import CreateService from '../ContentComponents/Services/CreateService/CreateService';
import Profile from '../ContentComponents/Users/Profile/Profile'
import Reports from '../ContentComponents/Reports/Reports'
import { useAuth } from '../../hoc/StoringAuth/AuthContext';
import CreateUser from '../ContentComponents/Users/CreateUser/CreateUser';
import axios from '../../api/axios'
import AdminRoute from '../../routes/AdminRoute/AdminRoute';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },

  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
  },

  hideFullSidebar: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: SidebarWidth
    }
  },

  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    padding: 30,
    height: '100%',
    overflow: 'auto',
  }
}));

const FullLayout = () => {
  const { setUser, setAccessToken, setRole } = useAuth()
  const { url } = useRouteMatch()
  const classes = useStyles();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const getCookie = (cname) => {
    let name = cname + "=";
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
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/home;domain=localhost";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=localhost";
  }

  const logoutHandler = () => {
    setCookie('accessToken', '', 0)
    setCookie('userEmail', '', 0)
    setRole(null)
    setUser(null)
    setAccessToken(null)
    console.log('logout token: ' + getCookie('accessToken'))
  }

  let showSideBar = (
    <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        logoutClicked={logoutHandler}
      />
  )

  return (

    <div className={classes.root}>
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
      {showSideBar}
      <div className={isSidebarOpen ? classes.wrapper + ' ' + classes.hideFullSidebar : classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <PrivateRoute exact path={`${url}/dashboard`} component={Dashboard} />

              <PrivateRoute exact path={`${url}/events`} component={Events} />
              <PrivateRoute exact path={`${url}/events/details/:id`} component={EventDetail} />

              <PrivateRoute exact path={`${url}/services`} component={Services} />
              <PrivateRoute exact path={`${url}/services/create`} component={CreateService} />
              <PrivateRoute exact path={`${url}/services/:id`} component={ServiceDetail} />


              <AdminRoute exact path={`${url}/users`} component={Users} />
              <AdminRoute exact path={`${url}/users/create`} component={CreateUser} />
              <AdminRoute exact path={`${url}/users/:email`} component={Profile} />

              <AdminRoute exact path={`${url}/reports`} component={Reports} />
              
              <Redirect from='/' to={`${url}/dashboard`} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullLayout;