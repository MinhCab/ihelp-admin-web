import React, { useEffect, useState } from 'react';
import { Box, Button, Divider,  Drawer, Hidden, List,  makeStyles } from '@material-ui/core';

import Navitems from './NavItems';
import {SidebarWidth} from '../../../assets/jss/Theme-variable'
import Profile from './Profile';
import { ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useAuth } from '../../../hoc/StoringAuth/AuthContext';
import { MenuItemsForAdmin, MenuItemsForManager } from './MenuItems'

const useStyles = makeStyles((theme) => ({
    mobileSidebar: {
      width: SidebarWidth
    },
    desktopSidebar: {
      width: SidebarWidth,
      top: 64,
      borderRight:'0px',
      height: 'calc(100% - 64px)',
      boxShadow:'1px 0px 20px rgba(0, 0, 0, 0.08)'
    },
    
  }));

const Sidebar = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const { role } = useAuth()
    const [menuItems, setMenuItems] = useState([])

    const profileHandler = () => {
        history.push("/home/users/" + getCookie("userEmail"));
      }

      const getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    useEffect(() => {
      try {
        console.log('from sidebar: ' + (role.id === 'admin'))
        if(role.id === 'admin') {
          setMenuItems(MenuItemsForAdmin)
        } else if (role.id === 'manager') {
          setMenuItems(MenuItemsForManager)
        }
      } catch {
        window.location.reload()
      }
      
    }, [role])

    const SidebarContent = (
      <Box height="100%" display="flex" flexDirection="column">
        <Profile
          profileClicked={profileHandler}
          logoutClicked={props.logoutClicked}
        />

        <Divider />

        <Box p={2}>
          <List>
            {menuItems.map((item, index) => (
              <Navitems
                href={item.href}
                key={index}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="primary"
          startIcon={<ExitToApp />}
          onClick={props.logoutClicked}
        >
          <strong>Logout</strong>
        </Button>
        <Box flexGrow={1} />
      </Box>
    );

    return (
        <React.Fragment>
           <Hidden lgUp>
                <Drawer 
                    anchor="left" 
                    open={props.isMobileSidebarOpen}
                    onClose={props.onSidebarClose}
                    classes={{ paper: classes.mobileSidebar }} 
                    variant="temporary">
                    {SidebarContent}
                </Drawer>
            </Hidden>

            <Hidden mdDown>
                <Drawer
                anchor="left"
                classes={{ paper: classes.desktopSidebar }}
                open={props.isSidebarOpen}
                variant="persistent"
                >
                {SidebarContent}
                </Drawer>
            </Hidden> 
        </React.Fragment>
     );
}
 
export default Sidebar;  
  