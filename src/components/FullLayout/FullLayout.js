import React, { Suspense, useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { SidebarWidth } from '../../assets/jss/Theme-variable.js'
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';
import axios from '../../api/axios'
import PrivateRoute from '../../routes/PrivateRoute/PrivateRoute';

import Dashboard from '../ContentComponents/Dashboard/Dashboard'
import Events from '../ContentComponents/Events/Events'
import Services from '../ContentComponents/Services/DashboardServices/DashboardServices'
import Users from '../ContentComponents/Users/DashboardAdmins/DashboardAdmins'
import EventDetail from '../ContentComponents/Events/EventDetails/EventDetail';
import ServiceDetail from '../ContentComponents/Services/ServiceDetail/ServiceDetail';
import CreateEvent from '../ContentComponents/Events/CreateEvent/CreateEvent';


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

const FullLayout = (props) => {
  const { children } = props
  const { url } = useRouteMatch()
  // const setAlert = useAlert()
  const history = useHistory()
  const classes = useStyles();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null)
  // const [openAlert, setOpenAlert] = useState(false)

  React.useEffect(() => {
    const userEmail = getCookie('userEmail')
    axios.get('/accounts/' + userEmail, {
    }).then(res => {
      setUserProfile(res.data.fullname)
      console.log(res)
    }).catch(err => {
      console.log(err.message)
    })
  }, [])

  const logoutHandler = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    console.log('logout token: ' + getCookie('accessToken'))
    history.replace('/login')
  }

  // const handleCloseAlert = (event, reason) => {
  //   if (reason === 'clickaway') {
  //       return;
  //   }
  //   setOpenAlert(false);
  // };

  React.useEffect(() => {
    const token = getCookie('accessToken')
    if (token === ' ' || token === null) {
      history.replace('/login')
    }
  }, [])

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

  // // let showAlert = null
  // const alert = setAlert.message
  // setOpenAlert(alert.isOpen)

  //   if (alert.isOpen) {
  //       showAlert = <AlertSnackbar
  //           alertInfo={alert}
  //           close={handleCloseAlert}
  //       />
  //   }
console.log(url)
  return (

    <div className={classes.root}>
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        clicked={logoutHandler}
        userProfile={userProfile}
      />
      <div className={isSidebarOpen ? classes.wrapper + ' ' + classes.hideFullSidebar : classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {/* <Suspense fallback={<div>Loading...</div>}>
                {children}
              </Suspense> */}
            <Switch>
              <PrivateRoute exact path={`${url}/dashboard`} component={() => <Dashboard />} />
              <PrivateRoute exact path={`${url}/events`} component={() => <Events />} />
              <PrivateRoute exact path={`${url}/events/create`} component={() => <CreateEvent />} />
              <PrivateRoute exact path={`${url}/events/details/:id`} component={() => <EventDetail />} />
              <PrivateRoute exact path={`${url}/services`} component={() => <Services />} />
              <PrivateRoute exact path={`${url}/services/:id`} component={() => <ServiceDetail />} />
              <PrivateRoute exact path={`${url}/users`} component={() => <Users />} />
            </Switch> 
          </div>
        </div>
      </div>
      {/* {showAlert} */}
    </div>
  );
}

export default FullLayout;