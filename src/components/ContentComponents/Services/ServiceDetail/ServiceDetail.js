import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, makeStyles, Paper, Popover, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel';

import axios from "../../../../api/axios"
import { MoreVert } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: '1 1 auto',
        maxWidth: '650px',
        padding: '25px'
    },

    media: {
        width: '600px',
        height: '400px',
    },

    Typography: {
        paddingBottom: '10px',

    },

    chips: {
        margin: theme.spacing(0.5),
    },

    settings: {
        width: '97%',
        margin: 2
    }
}))



const ServiceDetail = (props) => {

    const classes = useStyles();
    const [details, setDetails] = React.useState({})
    const [serviceType, setserviceType] = React.useState({})
    const [status, setStatus] = React.useState({})
    const [anchorEl, setAnchorEl] = React.useState(null);

    React.useEffect(() => {
        axios.get("/api/services/" + props.match.params.id)
            .then(res => {
                setDetails(res.data)
                setserviceType(res.data.serviceType)
                setStatus(res.data.status)
                console.log(res.data)
            }).catch(error => {
                console.log(error.message)
            })
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const username = getCookie('userEmail')

    let approveBtn = <Button startIcon={<ThumbUpIcon />} color="primary" variant='contained'>Approve</Button>
    let rejectBtn = <Button startIcon={<ThumbDownIcon />} color="secondary" variant='contained'>Reject</Button>
    let finishBtn = <Button startIcon={<CheckCircleIcon />} color="primary" variant='contained'>Finish this service</Button>
    let disableBtn = <Button startIcon={<CancelIcon />} color="secondary" variant='contained'>Disable this service</Button>
    let showActionBtns = null

    if (status.name === 'Pending' && username !== details.accountEmail) {
        showActionBtns = (
            <div>
                <hr />
                <br />
                <CardActions>
                    {approveBtn}
                    {rejectBtn}
                </CardActions>
            </div>
        )
    } else if (status.name === 'Approved') {
        showActionBtns = (
            <div>
                <hr />
                <br />
                <CardActions>
                    {disableBtn}
                </CardActions>
            </div>
        )
    } else if (status.name === 'In progress') {
        showActionBtns = (
            <div>
                <hr />
                <br />
                <CardActions>
                    {finishBtn}
                </CardActions>
            </div>
        )
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography className={classes.Typography} variant="h1" color="textPrimary" component="h1">
                        {details.title}
                    </Typography>
                }
                subheader={
                    <Grid item container xs className={classes.Typography}>
                        <Grid item xs>
                            <Typography variant="body1" color="textSecondary" component="span">
                                <strong>Created on: </strong> {moment(details.createdDate).format('MMMM Do YYYY')}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary" component="span">
                                <strong>by: </strong> {details.accountEmail}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                action={
                    <IconButton onClick={handleClick}>
                        <MoreVert aria-label="settings" />
                    </IconButton>
                }
            />
            {/*Image will be updated after firebase injection */}
            <CardMedia
                className={classes.media}
                image="https://www.gstatic.com/webp/gallery/1.webp"
                title="Event image"
            />
            {/*Image will be updated after firebase injection */}

            <CardContent>
                <Grid container xs item spacing={2}>
                    <Grid item xs>
                        <Grid item container xs className={classes.Typography}>
                            <Grid item xs>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Events start from: </strong> {moment(details.startDate).format('MMMM Do YYYY')}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>to: </strong> {moment(details.endDate).format('MMMM Do YYYY')}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs className={classes.Typography}>
                            <Typography variant="body1" color="textPrimary" component="span">
                                <strong>Description: </strong> {details.description}
                            </Typography>
                        </Grid>
                        <Grid item container xs className={classes.Typography}>
                            <Typography variant="body1" color="textPrimary" component="span">
                                <strong>Location: </strong> {details.location}
                            </Typography>
                        </Grid>
                        <Grid item container xs className={classes.Typography}>
                            <Grid item xs>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Service Type: </strong>
                                    <Chip color='primary' label={serviceType.name} />
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Status: </strong>
                                    <Chip color='primary' variant='outlined' label={status.name} />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs className={classes.Typography}>
                            <Grid item xs>
                                <Typography variant="body1" color="primary" component="span">
                                    <strong>Points for this service: {details.point}</strong>
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Pending slots: </strong> {details.spot}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            {showActionBtns}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',   
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Paper style={{maxWidth: 'auto', textAlign: 'center'}}>
                    <Button className={classes.settings} color='primary' variant='outlined'>Edit</Button>
                    <Button className={classes.settings} color='secondary' variant='outlined'>Delete</Button>
                </Paper>
            </Popover>
        </Card>
    );
}

export default ServiceDetail