import { Dialog, DialogContent, Typography, Grid, DialogActions, DialogTitle, Button } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

const ConfirmationDialog = (props) => {
    const details = props.details

    let showType = 'On site'
    if (!props.details.onsite) showType = 'Online'

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.cancel}
        >
            <DialogTitle >Your {props.createOn} will be created with the following information: </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>Title: </strong> {details.title}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>Start from: </strong> {moment(details.startDate).format('MMM Do YYYY')}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>to: </strong> {moment(details.endDate).format('MMM Do YYYY')}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>Category: </strong> {details.category}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>Event's type: </strong> {showType}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>Number of participants: </strong> {details.quota}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>Points per participant: </strong> {details.point}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>Description: </strong> {details.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant='body1' color='textPrimary' component='span'>
                            <strong>Do you want to create this {props.createOn}? </strong>
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={props.cancel} color="secondary">
                    Cancel
                </Button>
                <Button variant='outlined' onClick={props.proceed} color="primary" autoFocus>
                    Proceed
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog