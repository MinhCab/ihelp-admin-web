import {
  Popover,
  makeStyles,
  Grid,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  popover: {
    padding: theme.spacing(0.3),
    margin: theme.spacing(0.3),
    maxWidth: 400,
  },

  paper: {
    margin: theme.spacing(1),
    cursor: "pointer",
  },

  buttonProgress: {
    color: '#039be5',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const getSelectedValue = (value) => {
  return console.log(value);
};

const Notifications = (props) => {
  const classes = useStyles();
  const [notificationList, setNotifictionList] = useState([]);

  useEffect(() => {
    setNotifictionList(props.list);
  }, []);

  return (
    <React.Fragment>
      <Popover
        open={props.opening}
        anchorEl={props.showNoti}
        onClose={props.closing}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {props.isNotiLoading && <CircularProgress size={60} className={classes.buttonProgress} />}
        {notificationList.length > 0 ? (
          notificationList.map((noti) => {
            return (
              <Paper
                key={noti.id}
                className={classes.paper}
                elevation={3}
                onClick={() => getSelectedValue(noti.id)}
              >
                <Grid
                  className={classes.popover}
                  wrap="nowrap"
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  spacing={3}
                >
                  <Grid item zeroMinWidth xs={12}>
                    <Typography gutterBottom variant="h6" noWrap>
                      <strong>{noti.title}</strong>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      {noti.message}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {moment(noti.date).format("MMMM Do, YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            );
          })
        ) : (
          <Grid
            className={classes.popover}
            wrap="nowrap"
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            spacing={3}
          >
            <Grid item zeroMinWidth xs={12}>
              <Typography gutterBottom variant="h6" noWrap>
                <strong>You do not have any notification yet!</strong>
              </Typography>
            </Grid>
          </Grid>
        )}
        {(props.totalPages -1) !== props.currPage ? (
          <Button onClick={props.pagingAction} fullWidth>
            Show more
          </Button>
        ) : null}
      </Popover>
    </React.Fragment>
  );
};

export default Notifications;
