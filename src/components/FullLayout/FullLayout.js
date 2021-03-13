import React, { Suspense, useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { SidebarWidth } from '../../assets/jss/Theme-variable.js'
import { useHistory } from 'react-router';

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
  const classes = useStyles();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const history = useHistory()

  const logoutHandler = () => {
    document.cookie = "accessToken= ; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log('logout token: ' + getCookie('accessToken'))
    history.replace('/login')
  }

  React.useEffect(() => {
    const token = getCookie('accessToken')
    if(token === ' ' || token === null) {
      history.replace('/login')
    }
  }, [])

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

  return (
    <div className={classes.root}>
      
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)} 
        clicked={logoutHandler}
      />

      <div className={isSidebarOpen ? classes.wrapper + ' ' + classes.hideFullSidebar : classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullLayout;