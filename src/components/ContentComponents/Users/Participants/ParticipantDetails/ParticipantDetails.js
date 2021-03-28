import { Avatar, Box, Dialog, DialogContent, DialogTitle, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    avatarLabel: {
        display: 'flex',
        justifyContent: 'center',
    },

    avatar: {
        width: theme.spacing(14),
        height: theme.spacing(14)
    }
}))

const ParticipantDetails = (props) => {
    const details = props.details
    const classes = useStyles()

    return (
      <Dialog fullWidth open={props.isOpen} onClose={props.close}>
        <DialogContent>
          <Grid container spacing={3}>
              <Grid item xs={4}>
                <Avatar
                  className={classes.avatar}
                  alt="Participant Avatar"
                  src="https://firebasestorage.googleapis.com/v0/b/ihelp-307104.appspot.com/o/images%2Fevents%2F20181209_000945_IMG_5756.JPG?alt=media&token=df883e19-b906-498b-8b18-91002acb0a36"
                />
              </Grid>
              <Grid>
                <Typography
                  style={{ marginTop: 10 }}
                  component="h3"
                  variant="h4"
                  color="textPrimary"
                >
                  <strong>Le Bui Hoang Minh</strong>
                </Typography>

                <Typography
                  style={{ marginTop: 10 }}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  minhcab19345@gmail.com
                </Typography>
              </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
}

export default ParticipantDetails