import { Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
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
    }
}))

const EventDetail = (props) => {

    const classes = useStyles();
    const [details, setDetails] = React.useState({})
    const [category, setCategory] = React.useState({})
    const [status, setStatus] = React.useState({})
    const [onsite, setOnsite] = React.useState(false)

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

    let showOnsite = <Chip color='primary' label='Online' />
    let approveBtn = <Button size="small" color="primary" variant='contained'>Approve</Button>
    let rejectBtn = <Button size="small" color="secondary" variant='contained'>Reject</Button>
    let showActionBtns = null

    if (onsite === true) {
        showOnsite = <Chip color='secondary' label='On site' />
    }

    if (status.name === 'Pending') {
        showActionBtns = (
            <CardActions>
                {approveBtn}
                {rejectBtn}   
            </CardActions>
        )
    } else if(status.name === 'Approved') {
        showActionBtns = (
            <CardActions>
                {rejectBtn}   
            </CardActions>
        )
    } else if(status.name === 'Rejected') {
        showActionBtns = (
            <CardActions>
                {approveBtn}   
            </CardActions>
        )
    }

    return (
        <Card className={classes.root}>
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
                        <Typography className={classes.Typography} variant="h1" color="textPrimary" component="h1">
                            {details.title}
                        </Typography>
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
                    </Grid>
                </Grid>
            </CardContent>
            <hr/>
            <br/>   
            {showActionBtns}
        </Card>
    );
}

export default EventDetail