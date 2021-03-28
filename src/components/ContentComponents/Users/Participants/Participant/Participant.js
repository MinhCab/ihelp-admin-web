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
    const details = props.infor
    return (
      <Card className={classes.root} onClick={props.viewDetails}>
        <CardMedia
          className={classes.cover}
          image={details.imageUrl}
          title="Live from space album cover"
        />
        <CardActionArea>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                <strong>{details.fullname}</strong>
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
                <strong>Gender: </strong>Male
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="body2"
              >
                <strong>Join date: </strong>20-10-2022
              </Typography>
              <Typography
                style={{ marginBottom: "10px" }}
                component="p"
                variant="body2"
              >
                <strong>Phone: </strong>{details.phone}
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
