import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Typography, makeStyles, Menu, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import uimage from '../../../assets/images/avatar/IMG_2478-2.jpg';
import bgprofile from '../../../assets/images/avatar/user-info.png';
// import axios from '../../../api/axios'


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

const userProfile = {
    avatar: uimage,
    jobTitle: 'Senior Developer',
    name: 'Minh nè',
    href:"/"
}; 


const Profile = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    // const [userProfile, setUserProfile] = useState(null);

    // React.useEffect(() => {
    //     const userEmail = getCookie('userEmail')
    //     axios.get('/accounts/' + userEmail, {
    //         headers: {
    //             Authorization: document.cookie,
    //         }
    //     }).then(res => {
    //         console.log(res)
    //     }).catch(err => {
    //         console.log(err.message)
    //     })
    // }, [])

    // const getCookie = (cname) => {
    //     let name = cname + '=';
    //     let decodedCookie = decodeURIComponent(document.cookie);
    //     let ca = decodedCookie.split(';');
    //     for (let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) === ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) === 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return '';
    // }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <Box className={classes.profileBg} color="white">
            <Box p={3}>
                <Avatar component={NavLink} className={classes.piclarge} src={userProfile.avatar} to={userProfile.href} />
            </Box>
            <Typography variant="h6" className={classes.profileTextBg} onClick={handleClick}>
                {userProfile.name}
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
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={props.logoutClicked}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}

export default Profile;