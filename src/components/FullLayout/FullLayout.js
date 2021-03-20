import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { SidebarWidth } from '../../assets/jss/Theme-variable.js'
import { Redirect, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute/PrivateRoute';

import Dashboard from '../ContentComponents/Dashboard/Dashboard'
import Events from '../ContentComponents/Events/Events'
import Services from '../ContentComponents/Services/DashboardServices/DashboardServices'
import Users from '../ContentComponents/Users/DashboardAdmins/DashboardAdmins'
import EventDetail from '../ContentComponents/Events/EventDetails/EventDetail';
import ServiceDetail from '../ContentComponents/Services/ServiceDetail/ServiceDetail';
import CreateEvent from '../ContentComponents/Events/CreateEvent/CreateEvent';
import { useAuth } from '../../hoc/StoringAuth/AuthContext';
import axios from '../../api/axios'

// import { useAlert } from '../../hoc/StoringAlertMessage/StoreAlertMessage'
// import AlertSnackbar from './UI/AlertSnackbar/AlertSnackbar';

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
  const { url } = useRouteMatch()
  // const setAlert = useAlert()
  const history = useHistory()
  const classes = useStyles();
  const {setUser, setAccessToken} = useAuth()
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userFullname, setUserFullname] = useState(null)
  // const [openAlert, setOpenAlert] = useState(false)

  React.useEffect(() => {
    axios.get('/accounts/' + getCookie('userEmail').trim())
      .then(res => {
        setUserFullname(res.data.fullname)
      }).catch(err => {
        console.log('Error from get account info - FullLayout.js: ' + err.message)
      })
  }, [])

  const logoutHandler = () => {
    setCookie('accessToken', '', 0)
    setCookie('userEmail', '', 0)
    setUser(null)
    setAccessToken(null)
    console.log('logout token: ' + getCookie('accessToken'))
    history.replace('/login')
  }

  // const handleCloseAlert = (event, reason) => {
  //   if (reason === 'clickaway') {
  //       return;
  //   }
  //   setOpenAlert(false);
  // };

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
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=localhost:3000/login";
  }

  // // let showAlert = null
  // const alert = setAlert.message
  // setOpenAlert(alert.isOpen)

  //   if (alert.isOpen) {
  //       showAlert = <AlertSnackbar
  //           alertInfo={alert}
  //           close={handleCloseAlert}
  //       />
  //   }

  return (

    <div className={classes.root}>
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        clicked={logoutHandler}
        fullname={userFullname}
      />
      <div className={isSidebarOpen ? classes.wrapper + ' ' + classes.hideFullSidebar : classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <PrivateRoute exact path={`${url}/dashboard`} component={Dashboard} />
              <PrivateRoute exact path={`${url}/events`} component={Events} />
              <PrivateRoute exact path={`${url}/events/create`} component={CreateEvent} />
              <PrivateRoute exact path={`${url}/events/details/:id`} component={EventDetail} />
              <PrivateRoute exact path={`${url}/services`} component={Services} />
              <PrivateRoute exact path={`${url}/services/:id`} component={ServiceDetail} />
              <PrivateRoute exact path={`${url}/users`} component={Users} />
              <Redirect from='/' to={`${url}/dashboard`} />
            </Switch>
          </div>
        </div>
      </div>
      {/* {showAlert} */}
    </div>
  );
}

export default FullLayout;