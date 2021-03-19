import React, { useState } from 'react';
import { Avatar, Box, Typography, makeStyles, Menu, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import uimage from '../../../assets/images/avatar/IMG_2478-2.jpg';
import bgprofile from '../../../assets/images/avatar/user-info.png';

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
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box className={classes.profileBg} color="white">
            <Box p={3}>
                <Avatar className={classes.piclarge} src={uimage} />
            </Box>
            <Typography variant="h6" className={classes.profileTextBg} onClick={handleClick}>
                {props.fullname}
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