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
import { SnackbarProvider, useSnackbar } from 'notistack'

import AdminRoute from '../../routes/AdminRoute/AdminRoute';
import axios from '../../api/axios';
import AlertSnackbar from './UI/AlertSnackbar/AlertSnackbar';
import BannedUsers from '../ContentComponents/Users/BannedUsers/BannedUsers';

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

  const [totalNotiPages, setTotalNotiPages] = useState(0)
  const [notiList, setNotiList] = useState([])
  const [notiPage, setNotiPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const [openAlertSnackbar, setOpenAlertSnackbar] = useState(false)
  const [message, setMessage] = useState('')
  const [alertType, setAlertType] = useState('')
 
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/home";
    }
}

  const logoutHandler = () => {
    const deviceTokenInfo = {
      deviceToken: fcmToken,
      email: user.email,
    };
    console.log('before delete: '+ JSON.stringify(deviceTokenInfo))
    axios.put('/signout', deviceTokenInfo)
    .then(res => {
      deleteAllCookies()
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
      enqueueSnackbar(payload.notification.title, { variant: 'info'})
    });
  }

  const showMoreHandler = () => {
    setNotiPage(notiPage + 1)
  }

  const addToNotiList = (listing) => {
    let newList = []
    newList = notiList
    newList.push(...listing)
    setNotiList(newList)
  } 

  const getCookie = (cname) => {
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

  const resetNotiList = () => {
    setTotalNotiPages(0)
    setNotiPage(0)
    setNotiList([])
    setLoading(false)
  }

  const loadNotification = () => {
    axios.get('/notifications/' + getCookie('userEmail') + '?page=' + notiPage)
    .then(res => {
      console.log(res)
      setTotalNotiPages(res.data.totalPages)
      addToNotiList(res.data.notifications)
      setLoading(false)
    }).catch(err => {
      console.log(err.message)
      setLoading(false)
    })
  }

  const handleCloseAlertSnackbar = () => {
    setOpenAlertSnackbar(false)
  }

  useEffect(() => {
    if(!loading) {
      setLoading(true)
      loadInfo()
      loadNotification()
    }
  }, [notiPage])

  useEffect(() => {
    receiveForegroundNotification()
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
        <Header
          notiList={notiList}
          currPage={notiPage}
          totalNotiPages={totalNotiPages}
          notiPagingAction={showMoreHandler}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          isNotiLoading={loading}
        />
        {showSideBar}
        <div
          className={
            isSidebarOpen
              ? classes.wrapper + " " + classes.hideFullSidebar
              : classes.wrapper
          }
        >
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Switch>
                <PrivateRoute
                  exact
                  path={`${url}/dashboard`}
                  component={Dashboard}
                />

                <PrivateRoute exact path={`${url}/events`} component={Events} />
                <PrivateRoute
                  exact
                  path={`${url}/events/details/:id`}
                  component={EventDetail}
                />

                <PrivateRoute
                  exact
                  path={`${url}/services`}
                  component={Services}
                />
                <PrivateRoute
                  exact
                  path={`${url}/services/:id`}
                  component={ServiceDetail}
                />

                <PrivateRoute
                  exact
                  path={`${url}/users/:email`}
                  component={Profile}
                />
                <AdminRoute exact path={`${url}/users`} component={Users} />
                <AdminRoute
                  exact
                  path={`${url}/banned-users`}
                  component={BannedUsers}
                />

                <AdminRoute exact path={`${url}/reports`} component={Reports} />

                <Redirect from="/" to={`${url}/dashboard`} />
              </Switch>
            </div>
          </div>
        </div>
        {showAlertSnackbar}
      </div>
  );
}

export default FullLayout;