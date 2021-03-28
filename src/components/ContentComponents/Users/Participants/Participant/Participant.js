import { Card, CardActionArea, CardContent, CardMedia, Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react'

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
  }));

const Participant = (props) => {
    const classes = useStyles()
    return (
      <Card className={classes.root} onClick={props.viewDetails}>
        <CardMedia
          className={classes.cover}
          image="https://firebasestorage.googleapis.com/v0/b/ihelp-307104.appspot.com/o/images%2Fevents%2F20181209_000945_IMG_5756.JPG?alt=media&token=df883e19-b906-498b-8b18-91002acb0a36"
          title="Live from space album cover"
        />
        <CardActionArea>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <strong>Le Bui Hoang Minh</strong>
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}  
                component="p"
                variant="subtitle1"
                color="textSecondary"
              >
                minhcab19345@gmail.com
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="body2"
              >
                <strong>Gender: </strong>Male
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="body2"
              >
                <strong>Date of Birth: </strong>20-10-2022
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="body2"
              >
                <strong>Phone: </strong>0938015473
              </Typography>
              <Divider style={{ marginBottom: "10px" }} />
              <Typography
                style={{ marginBottom: "10px" }}
                color="primary"
                component="p"
                variant="body2"
              >
                <strong>Remaining points: </strong>4241
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    );
}

export default Participant
