import { Card, CardActionArea, CardContent, CardMedia, createMuiTheme, Divider, Grid, makeStyles, ThemeProvider, Typography } from '@material-ui/core';
import moment from 'moment';
import StarIcon from '@material-ui/icons/Star';
import React from 'react'

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
    root: {
      display: 'flex',
      width: 460,
      marginTop: 20,
      background: '#f0f0f0'
    },
    details: {
      flexDirection: 'row',
    },
    content: {
      flex: '1 0 auto'
    },
    cover: {
      width: 300,
      height: 170
    },
    rating: {
      verticalAlign: 'middle'
    },
  }));

const Participant = (props) => {
    const classes = useStyles()
    const details = props.infor

    let showRating = []
    if(details.rating) {
        for(let i=0; i<details.rating; i++) {
          showRating.push(<StarIcon key={i} color='primary' />)
        }
    }

    let showPointsInformation = (
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
    );

    if(props.type === 'event') {
      showPointsInformation = details.rating ? (
        <>
          <Divider style={{ marginBottom: "10px" }} />
          <Typography component="span" variant="body1" color="primary">
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
                <Grid item>{details.rating >> 1 ? props.basePoint : 0}</Grid>
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
      ) : null;
    }

    return (
      <Card className={classes.root} onClick={() => props.viewDetails(details)}>
        <CardMedia
          image={details.imageUrl}
          className={classes.cover}
          title="Live from space album cover"
        />
        <CardActionArea>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <strong>{details.fullName}</strong>
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="subtitle1"
                color="textSecondary"
              >
                {details.email}
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="body2"
              >
                <strong>Gender: </strong>{" "}
                {details.gender ? <>Male</> : <>Female</>}
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="body2"
              >
                <strong>Join date: </strong>
                {moment(details.joinDate).format("MMMM DD, YYYY")}
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="body2"
              >
                <strong>Phone: </strong>
                {details.phone}
              </Typography>

              {showPointsInformation}
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    );
}

export default Participant
