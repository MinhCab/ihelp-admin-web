import { Avatar, Dialog, DialogContent, Button, Grid, makeStyles, Typography, DialogActions, Divider } from '@material-ui/core'
import WcIcon from '@material-ui/icons/Wc';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import PhoneIcon from '@material-ui/icons/Phone';
import BalancePointsIcon from '@material-ui/icons/SettingsInputSvideo';
import React from 'react'
import { useHistory } from 'react-router';
import moment from 'moment';

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
    const history = useHistory()

    const handleViewProfile = () => {
      history.push('/home/users/' + details.email)
    }

    return (
      <Dialog fullWidth open={props.isOpen} onClose={props.close}>
        <DialogContent style={{marginBottom: 10}}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Avatar
                className={classes.avatar}
                alt="Participant Avatar"
                src={details.imageUrl}
              />
            </Grid>
            <Grid>
              <Typography
                style={{ marginTop: 10 }}
                component="h3"
                variant="h4"
                color="textPrimary"
              >
                <strong>{details.fullName}</strong>
              </Typography>

              <Typography
                style={{ marginTop: 10 }}
                variant="subtitle1"
                color="textSecondary"
              >
                {details.email}
              </Typography>

              <div style={{ marginTop: 30 }}>
                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >
                  <WcIcon style={{ marginRight: 10 }} /> {details.gender ? <>Male</> : <>Female</>}
                </Typography>

                <br />

                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >
                  <AlarmOnIcon style={{ marginRight: 10 }} /> Joint this event
                  on {moment(details.joinDate).format('MMMM DD, YYYY')}
                </Typography>

                <br />

                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >
                  <PhoneIcon style={{ marginRight: 10 }} /> {details.phone}
                </Typography>

                <br />

                <Typography
                  component="span"
                  variant="body1"
                  color="primary"
                >
                  <strong><BalancePointsIcon style={{ marginRight: 10 }} />Balance points: {details.balancePoint}</strong>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button fullWidth variant='contained' color='primary' onClick={handleViewProfile}>View full profile</Button>
          <Button fullWidth variant='contained' color='secondary'>Kick user out of event</Button>
        </DialogActions>
      </Dialog>
    );
}

export default ParticipantDetails