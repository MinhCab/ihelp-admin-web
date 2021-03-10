import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsNoneIcon from '@material-ui/icons/Notifications';

import LogoIcon from '../Logo/LogoIcon';
import Notifications from './Notifications/Notifications';

const useStyles = makeStyles((theme) => ({
    root: {},
    Logo: {
        display: 'flex',
        alignItems: 'center',
    },
    logoText: {
        minWidth: 200,
        display: 'flex'
    },
    menuButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        color: 'white'
    }
}));

const Header = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    return (
        <AppBar>
            <Toolbar>
                <Hidden mdDown>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.toggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>

                <Hidden lgUp>
                    <IconButton color="inherit" aria-label="menu" onClick={props.toggleMobileSidebar}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                {/* ------------ Logo ------------- */}
                {/* <Link to="/" className={classes.Logo}> */}
                <LogoIcon />
                <Hidden mdDown><span className={classes.logoText} /></Hidden>
                {/* </Link> */}
                {/* ------------ End Logo ------------- */}
                {/* ------------ Menu icon ------------- */}

                {/* ------------ End Menu icon ------------- */}

                <Box flexGrow={1} />

                <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleClick}>
                    <Badge variant="dot" color="secondary">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>
                <Notifications showNoti={anchorEl} opening={open} closing={handleClose} />
            </Toolbar>
        </AppBar>
    );
}

export default Header;