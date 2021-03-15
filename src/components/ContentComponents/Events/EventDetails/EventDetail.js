import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, makeStyles, Paper, Popover, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import React from 'react'

import axios from "../../../../api/axios"

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

const EventDetail = (props) => {

    const classes = useStyles();
    const [details, setDetails] = React.useState({})
    const [category, setCategory] = React.useState({})
    const [status, setStatus] = React.useState({})
    const [onsite, setOnsite] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    React.useEffect(() => {
        axios.get("/api/events/" + props.match.params.id)
            .then(res => {
                setDetails(res.data)
                setCategory(res.data.category)
                setStatus(res.data.status)
                setOnsite(res.data.onsite)
                console.log(res.data)
            }).catch(error => {
                console.log(error.message)
            })
    }, [])

    const approveEventHandler = () => {
        console.log('Approve event clicked')
    }

    const rejectEventHandler = () => {
        console.log('Reject event clicked')
    }

    const disableEventHandler = () => {
        console.log('Disable event clicked')
    }

    const finishEventHandler = () => {
        console.log('Finish event clicked')
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const editHandler = () => {
        // const { eventDetails } = React.useContext(StoreContext) //cách lấy ra nhưng phải sử dụng reducer để thay đổi giá trị
        console.log('Edit event clicked')
    }

    const deleteHandler = () => {
        console.log('Delete event clicked')
        axios.delete('/api/events/' + props.match.params.id)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err.message)
            })
    }

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


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const username = getCookie('userEmail')

    let showOnsite = <Chip color='primary' label='Online' />
    let approveBtn = <Button startIcon={<ThumbUpIcon />} color="primary" variant='contained' onClick={approveEventHandler}>Approve</Button>
    let rejectBtn = <Button startIcon={<ThumbDownIcon />} color="secondary" variant='contained' onClick={rejectEventHandler}>Reject</Button>
    let finishBtn = <Button startIcon={<CheckCircleIcon />} color="primary" variant='contained' onClick={finishEventHandler}>Finish this event</Button>
    let disableBtn = <Button startIcon={<CancelIcon />} color="secondary" variant='contained' onClick={disableEventHandler}>Disable this event</Button>
    let showActionBtns = null
    let deleteBtn = null
    if (onsite === true) {
        showOnsite = <Chip color='secondary' label='On site' />
    }

    if (status.name === 'Pending') {

        deleteBtn = <Button className={classes.settings} color='secondary' variant='outlined' onClick={deleteHandler}>Delete</Button>

        if (username !== details.accountEmail) {
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
        }

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
                                    <strong>Category: </strong>
                                    <Chip color='primary' label={category.name} />
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
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Type: </strong>
                                    {showOnsite}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Pending slots: </strong> {details.spot}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs className={classes.Typography}>
                            <Grid item xs>
                                <Typography variant="body1" color="primary" component="span">
                                    <strong>Points for this event: {details.point}</strong>
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
                <Paper style={{ maxWidth: 'auto', textAlign: 'center' }}>
                    <Button className={classes.settings} color='primary' variant='outlined' onClick={editHandler}>Edit</Button>
                    {deleteBtn}
                </Paper>
            </Popover>
        </Card>

    );
}

export default EventDetail