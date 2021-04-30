import { Avatar, Dialog, DialogContent, Button, Grid, makeStyles, Typography, DialogActions, ThemeProvider, createMuiTheme, Divider } from '@material-ui/core'
import WcIcon from '@material-ui/icons/Wc';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import PhoneIcon from '@material-ui/icons/Phone';

import StarIcon from '@material-ui/icons/Star';
import React from 'react'
import { useHistory } from 'react-router';
import moment from 'moment';

const additionalTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bf00',
    },
    secondary: {
      main: '#d700d7'
    }
  },
})

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    }
}))

const ParticipantDetails = (props) => {
    const details = props.details
    const classes = useStyles()
    const history = useHistory()

    const handleViewProfile = () => {
      history.push('/home/users/' + details.email)
    }

    let showRating = []
    if(details.rating) {
        for(let i=0; i<details.rating; i++) {
          showRating.push(<StarIcon key={i} />)
        }
    }

    return (
      <Dialog fullWidth maxWidth="sm" open={props.isOpen} onClose={props.close}>
        <DialogContent style={{ marginBottom: 10 }}>
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
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <WcIcon style={{ marginRight: 10 }} />{" "}
                    </Grid>
                    <Grid item>{details.gender ? <>Male</> : <>Female</>}</Grid>
                  </Grid>
                </Typography>

                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <AlarmOnIcon style={{ marginRight: 10 }} />
                    </Grid>
                    <Grid item>
                      Joint this event on{" "}
                      {moment(details.joinDate).format("MMMM DD, YYYY")}
                    </Grid>
                  </Grid>
                </Typography>

                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <PhoneIcon style={{ marginRight: 10 }} />
                    </Grid>
                    <Grid item>{details.phone}</Grid>
                  </Grid>
                </Typography>

                {props.type === "event" ? (
                  details.rating ? (
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="primary"
                      >
                        <Grid container direction="row" alignItems="center">
                          <Grid item>Rating:</Grid>
                          <Grid item>{showRating}</Grid>
                        </Grid>
                      </Typography>

                      <ThemeProvider theme={additionalTheme}>
                        <Typography
                          style={{ marginBottom: "10px" }}
                          color="primary"
                          component="p"
                          variant="body2"
                        >
                          <Grid container direction="row" alignItems="center">
                            <Grid item>Earned points: </Grid>
                            <Grid item>
                              {details.rating >> 1 ? props.basePoint : 0}
                            </Grid>
                          </Grid>
                        </Typography>
                      </ThemeProvider>
                      {details.rating === 3 ? (
                        <ThemeProvider theme={additionalTheme}>
                          <Typography
                            style={{ marginBottom: "10px" }}
                            color="secondary"
                            component="p"
                            variant="body2"
                          >
                            <Grid container direction="row" alignItems="center">
                              <Grid item>Contribution points earned:</Grid>
                              <Grid item>{details.contributionPoint}</Grid>
                            </Grid>
                          </Typography>
                        </ThemeProvider>
                      ) : null}
                    </>
                  ) : null
                ) : (
                  <>
                    <Divider style={{ marginBottom: "10px" }} />
                    <ThemeProvider theme={additionalTheme}>
                      <Typography
                        style={{ marginBottom: "10px" }}
                        color="secondary"
                        component="p"
                        variant="body2"
                      >
                        <Grid container direction="row" alignItems="center">
                          <Grid item>Contribution points earned:</Grid>
                          <Grid item>{details.contributionPoint}</Grid>
                        </Grid>
                      </Typography>
                    </ThemeProvider>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleViewProfile}
          >
            View full profile
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default ParticipantDetails