import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { SidebarWidth } from '../../assets/jss/Theme-variable.js'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute/PrivateRoute';

import Dashboard from '../ContentComponents/Dashboard/Dashboard'
import Events from '../ContentComponents/Events/Events'
import Services from '../ContentComponents/Services/Services'
import Users from '../ContentComponents/Users/Users'
import EventDetail from '../ContentComponents/Events/EventDetails/EventDetail';
import ServiceDetail from '../ContentComponents/Services/ServiceDetail/ServiceDetail';
import Profile from '../ContentComponents/Users/Profile/Profile'
import Reports from '../ContentComponents/Reports/Reports'
import { useAuth } from '../../hoc/StoringAuth/AuthContext';
import { messaging } from '../../api/Firebase/firebase-config'
import { useSnackbar } from 'notistack'

import AdminRoute from '../../routes/AdminRoute/AdminRoute';
import axios from '../../api/axios';
import AlertSnackbar from './UI/AlertSnackbar/AlertSnackbar';

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
  const classes = useStyles();
  const { url } = useRouteMatch()
  const { enqueueSnackbar } = useSnackbar();
  const { fcmToken, user, setUser, setAccessToken, setRole, setFcmToken, loadInfo } = useAuth()
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notiList, setNotiList] = useState([])

  const [openAlertSnackbar, setOpenAlertSnackbar] = useState(false)
  const [message, setMessage] = useState('')
  const [alertType, setAlertType] = useState('')

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/home;domain=localhost";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=localhost";
  }

  const logoutHandler = () => {
    const deviceTokenInfo = {
      deviceToken: fcmToken,
      email: user.email,
    };
    console.log('before delete: '+ JSON.stringify(deviceTokenInfo))
    axios.delete('/signout', { data: deviceTokenInfo } )
    .then(res => {
      setCookie("accessToken", "", 0);
      setCookie('userEmail', '', 0)
      setCookie('deviceToken', '', 0)
      setRole(null)
      setUser(null)
      setFcmToken(null)
      setAccessToken(null)
    }).catch(err => {
      console.log(err)
      setMessage(err.data.message)
      setAlertType('error')
      setOpenAlertSnackbar(true)
    })  
  }

  const receiveForegroundNotification = () => {
    messaging.onMessage((payload) => {
      enqueueSnackbar(payload.notification.title, { variant: 'info' })
    });
  }

  const loadNotification = () => {
    axios.get('/notifications/' + user.email)
    .then(res => {
      setNotiList(res.data)
    })
  }

  const handleCloseAlertSnackbar = () => {
    setOpenAlertSnackbar(false)
  }

  useEffect(() => {
    loadInfo()
    loadNotification()
    receiveForegroundNotification()
    console.log(fcmToken)
  }, [fcmToken])

  useEffect(() => {
    loadNotification()
  }, [enqueueSnackbar])

  let showSideBar = (
    <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        logoutClicked={logoutHandler}
      />
  )

  let showAlertSnackbar = null
  if(openAlertSnackbar) {
    showAlertSnackbar = (
      <AlertSnackbar
        isOpen={openAlertSnackbar}
        close={handleCloseAlertSnackbar}
        message={message}
        alertType={alertType}
      />
    )
  }

  return (

    <div className={classes.root}>
      <Header notiList={notiList} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
      {showSideBar}
      <div className={isSidebarOpen ? classes.wrapper + ' ' + classes.hideFullSidebar : classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <PrivateRoute exact path={`${url}/dashboard`} component={Dashboard} />

              <PrivateRoute exact path={`${url}/events`} component={Events} />
              <PrivateRoute exact path={`${url}/events/details/:id`} component={EventDetail} />

              <PrivateRoute exact path={`${url}/services`} component={Services} />
              <PrivateRoute exact path={`${url}/services/:id`} component={ServiceDetail} />

              <AdminRoute exact path={`${url}/users`} component={Users} />
              <PrivateRoute exact path={`${url}/users/:email`} component={Profile} />

              <AdminRoute exact path={`${url}/reports`} component={Reports} />
              
              <Redirect from='/' to={`${url}/dashboard`} />
            </Switch>
          </div>
        </div>
      </div>
      {showAlertSnackbar}
    </div>
  );
}

export default FullLayout;