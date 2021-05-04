import React, { useState } from 'react';
import { Avatar, Box, Typography, makeStyles, Menu, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import bgprofile from '../../../assets/images/avatar/profile_background.png';
import { useAuth } from '../../../hoc/StoringAuth/AuthContext';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    piclarge: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    profileBg: {
        backgroundImage: `url(${bgprofile})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    profileTextBg: {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0,0.5)',
        padding: '5px 10px',
        display: 'flex'
    },
    pwidth: {
        width: 200
    }
}));


const Profile = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const { user } = useAuth('')

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

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

    const handleClose = () => {
        setAnchorEl(null);
    };

    const profileClicked = () => {
        history.push("/home/users/" + getCookie("userEmail"));
        setAnchorEl(null)
    }
    
    let showAva
    if(user.imageUrl !== null) {
        showAva = user.imageUrl
    } 

    return (
        <Box className={classes.profileBg} color="white">
            <Box p={3}>
                <Avatar className={classes.piclarge} src={showAva} />
            </Box>
            <Typography variant="h6" className={classes.profileTextBg} onClick={handleClick}>
                {user.fullName}
                <Box flexGrow={1} />
                <ExpandMoreIcon fontSize="small" />
            </Typography>
            <Menu

                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}

                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={profileClicked}>My Profile</MenuItem>
                <MenuItem onClick={props.logoutClicked}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}

export default Profile;