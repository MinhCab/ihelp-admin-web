import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, makeStyles, Paper, Popover, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import React from 'react'
import { useHistory } from 'react-router';

import axios from "../../../../api/axios"
import noImage from '../../../../assets/images/no-image.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        flex: '1 1 auto',
        width: '100%',
        padding: '25px'
    },

    media: {
        width: '600px',
        height: '400px',
    },

    Typography: {
        paddingBottom: '10px',
    },

    description: {
        paddingBottom: '10px',
        width: '100%',
        maxWidth: 1000
    },

    title: {
        paddingBottom: '10px'
    },

    side: {
        justifyContent: 'flex-end'
    },

    sidecontent: {
        paddingBottom: '30px',
        justifyContent: 'flex-end'
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
    const history = useHistory()
    const [details, setDetails] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [status, setStatus] = React.useState({})
    const [onsite, setOnsite] = React.useState(false)
    const [images, setImages] = React.useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);

    React.useEffect(() => {
        axios.get("/api/events/" + props.match.params.id)
            .then(res => {
                setDetails(res.data)
                setCategories(res.data.categories)
                setStatus(res.data.status)
                setOnsite(res.data.onsite)
                setImages(res.data.images)
                console.log(res.data)
            }).catch(error => {
                console.log(error.message)
            })
    }, [])

    const approveEventHandler = () => {
        console.log('Approve event clicked')
        axios.put('/api/events/' + props.match.params.id + '/3')
            .then(res => {
                window.location.reload();
            }).catch(error => {
                console.log(error.message)
            })
    }

    const rejectEventHandler = () => {
        console.log('Reject event clicked')
        axios.put('/api/events/' + props.match.params.id + '/6')
            .then(res => {
                window.location.reload()
            }).catch(error => {
                console.log(error.message)
            })
    }

    const disableEventHandler = () => {
        console.log('Disable event clicked')
        axios.put('/api/events/' + props.match.params.id + '/5')
            .then(res => {
                window.location.reload();
            }).catch(error => {
                console.log(error.message)
            })
    }

    const finishEventHandler = () => {
        console.log('Finish event clicked')
        axios.put('/api/events/' + props.match.params.id + '/4')
            .then(res => {
                window.location.reload();
            }).catch(error => {
                console.log(error.message)
            })
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
                history.goBack()
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

    let showOnsite = <Button color='primary' variant='contained'>Online</Button>
    let approveBtn = <Button startIcon={<ThumbUpIcon />} color="primary" variant='contained' onClick={approveEventHandler}>Approve</Button>
    let rejectBtn = <Button startIcon={<ThumbDownIcon />} color="secondary" variant='contained' onClick={rejectEventHandler}>Reject</Button>
    let finishBtn = <Button startIcon={<CheckCircleIcon />} color="primary" variant='contained' onClick={finishEventHandler}>Finish this event</Button>
    let disableBtn = <Button startIcon={<CancelIcon />} color="secondary" variant='contained' onClick={disableEventHandler}>Disable this event</Button>
    let showActionBtns = null
    let deleteBtn = null
    let showImages = (
        <CardMedia
            className={classes.media}
            image={noImage}
            title="No image"
            key='no-image'
        />
    )

    if (onsite === true) {
        showOnsite = <Button color='secondary' variant='contained'>On site</Button>
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
            <Grid item container xs className={classes.Typography}>
                <CardActions>
                    {disableBtn}
                </CardActions>
            </Grid>

        )
    } else if (status.name === 'In progress') {
        showActionBtns = (
            <Grid item container xs className={classes.Typography}>
                <CardActions>
                    {finishBtn}
                </CardActions>
            </Grid>
        )
    }

    if (images.length !== 0) {
        showImages = images.map(img => {
            return (
                <CardMedia
                    className={classes.media}
                    image={img.url}
                    title="Event image"
                    key={img.imageId}
                />
            )
        })
    }

    return (
        <Card className={classes.root}>
            <Grid container spacing={4}>
                <Grid item>
                    {showImages}
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <CardHeader
                            title={
                                <Typography className={classes.title} variant="h1" color="textPrimary" component="h1">
                                    {details.title}
                                </Typography>
                            }
                            subheader={
                                <Grid item xs>
                                    <Typography variant="body1" color="textSecondary" component="span">
                                        <strong>Created on: </strong> {moment(details.createdDate).format('MMMM Do YYYY')}
                                    </Typography>
                                </Grid>
                            }
                        />

                        <CardContent>
                            <Grid item container xs className={classes.Typography}>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Events start from: </strong> {moment(details.startDate).format('MMMM Do YYYY')}
                                </Typography>
                            </Grid>
                            <Grid item container xs className={classes.Typography}>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Type: </strong>
                                    {showOnsite}
                                </Typography>
                            </Grid>
                            <Grid item container xs className={classes.Typography}>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Location: </strong> {details.location}
                                </Typography>
                            </Grid>
                            <Grid item container xs className={classes.Typography}>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Category: </strong>
                                    {categories.map(cate => {
                                        return (<Chip style={{margin: '5px'}} color='primary' variant='outlined' label={cate.name} key={cate.id} />)
                                    })}
                                </Typography>
                            </Grid>

                            <Grid item container xs className={classes.Typography}>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Status: </strong>
                                    <Chip color='primary' variant='outlined' label={status.name} />
                                </Typography>
                            </Grid>
                            <Grid item container xs className={classes.Typography}>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    <strong>Pending slots: </strong> {details.spot}
                                </Typography>
                            </Grid>
                            <Grid item container xs className={classes.Typography}>
                                <Typography variant="body1" color="primary" component="span">
                                    <strong>Points for this event: {details.point}</strong>
                                </Typography>
                            </Grid>
                            <Grid item container xs className={classes.description} wrap='nowrap'>
                                <Typography variant="body1" color="textPrimary" component="span">
                                    {details.description}
                                </Typography>
                            </Grid>
                            {showActionBtns}
                        </CardContent>

                    </Grid>
                    <Grid item>
                        <Grid item container xs className={classes.side}>
                            <CardActions className={classes.side}>
                                <IconButton onClick={handleClick}>
                                    <MoreVert aria-label="settings" />
                                </IconButton>
                            </CardActions>
                        </Grid>
                        <Grid item container xs className={classes.sidecontent}>
                            <Typography variant="body2" color="textSecondary" component="span">
                                <strong>by: </strong> {details.accountEmail}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.side}>
                            <Typography variant="body1" color="textPrimary" component="span">
                                <strong>to: </strong> {moment(details.endDate).format('MMMM Do YYYY')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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