import React from 'react';
import { Box, Button, Divider,  Drawer, Hidden, List,  makeStyles } from '@material-ui/core';

import Navitems from './NavItems';
import {SidebarWidth} from '../../../assets/jss/Theme-variable'
import Menuitems from './MenuItems';
import Profile from './Profile';
import { ExitToApp } from '@material-ui/icons';

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

    const SidebarContent = (
        <Box height="100%" display="flex" flexDirection="column" >

            <Profile/>

            <Divider />

            <Box p={2}>
                <List>
                    {Menuitems.map((item, index) => (
                        <Navitems
                            href={item.href}
                            key={index}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Button style={{margin: '10px'}} variant="contained" color="primary" startIcon={<ExitToApp/>}><strong>Logout</strong></Button>

            <Box flexGrow={1} />

        </Box>
    )
    
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
  