import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Popover,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";

import axios from "../../../../api/axios";
import noImage from "../../../../assets/images/no-image.jpg";
import EditEvent from "../EditEvent/EditEvent";
import TabsLayout from "../../../FullLayout/UI/TabsLayout/TabsLayout";
import ParticipantDetails from "../../Users/Participants/ParticipantDetails/ParticipantDetails";
import FeedbackDetails from "../../Feedbacks/FeedbackDetails/FeedbackDetails";
import AlertSnackbar from "../../../FullLayout/UI/AlertSnackbar/AlertSnackbar";
import { useAuth } from "../../../../hoc/StoringAuth/AuthContext";
import { RejectReasonDialog } from "../../../FullLayout/UI/AlertDialog/AlertDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "auto",
    flex: "1 1 auto",
    width: "100%",
    padding: "25px",
  },

  media: {
    width: "600px",
    height: "400px",
  },

  Typography: {
    paddingBottom: "10px",
  },

  description: {
    paddingBottom: "10px",
    width: "100%",
    maxWidth: 1000,
  },

  title: {
    paddingBottom: "10px",
  },

  side: {
    justifyContent: "flex-end",
  },

  sidecontent: {
    paddingBottom: "30px",
    justifyContent: "flex-end",
  },

  chips: {
    margin: theme.spacing(0.5),
  },

  settings: {
    width: "97%",
    margin: 2,
  },
}));

const EventDetail = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openParticipantDetails, setOpenParticipantDetails] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState("");
  const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false);
  const [openRejectDialog, setOpenRejectDialog] = React.useState(false);

  const [details, setDetails] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [status, setStatus] = React.useState({});
  const [onsite, setOnsite] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [participantDetails, setParticipantDetails] = React.useState({});

  const loadInfoAPI = () => {
    axios
      .get("/api/events/" + props.match.params.id)
      .then((res) => {
        setDetails(res.data);
        setCategories(res.data.categories);
        setStatus(res.data.status);
        setOnsite(res.data.isOnsite);
        setImages(res.data.images);
      })
      .catch((err) => {
        setMessage(err.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  }

  React.useEffect(() => {
    loadInfoAPI()
  }, []);

  const approveEventHandler = () => {
    axios
      .put("/api/events/" + user.email + "/approve/" + props.match.params.id)
      .then((res) => {
        setMessage(res.data);
        setAlertType("success");
        setOpenAlertSnackbar(true);
        loadInfoAPI()
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  };

  const rejectDialogHandler = () => {
    setOpenRejectDialog(true);
  };

  const closeRejectDialogHandler = () => {
    setOpenRejectDialog(false);
  };

  const rejectEventHandler = (reason, eventId) => {
    const rejectObject = {
      eventId: eventId,
      managerEmail: user.email,
      reason: reason,
    };
    axios
      .put("/api/events/reject", rejectObject)
      .then((res) => {
        setMessage(res.data);
        setAlertType("success");
        setOpenAlertSnackbar(true);
        setOpenRejectDialog(false)
        loadInfoAPI()
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  };

  const changeStatusHandler = async(statusId) => {
    axios
      .put("/api/events/" + props.match.params.id + "/" + statusId)
      .then((res) => {
        setMessage(res.data);
        setAlertType("success");
        setOpenAlertSnackbar(true);
        loadInfoAPI()
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenEditDialog(false);
  };

  const editHandler = () => {
    setOpenEditDialog(true);
  };

  const deleteHandler = () => {
    axios
      .delete("/api/events/" + props.match.params.id)
      .then((res) => {
        history.goBack();
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  };

  const handleUpdateProcess = async (updateDetails) => {
    try {
      const response = await axios.put("/api/events", updateDetails);
      if (response.status === 200) {
        setOpenEditDialog(false);
        setOpenAlertSnackbar(true);
        setMessage("Edit event successful");
        setAlertType("success");
        setDetails(response.data);
        setCategories(response.data.categories);
        setStatus(response.data.status);
        setOnsite(response.data.isOnsite);
        setImages(response.data.images);
        setAnchorEl(null);
      }
    } catch {
      setMessage("Edit event failed, please try again");
      setAlertType("error");
      setOpenAlertSnackbar(true);
    }
  };


  //change to participants.js
  const handleParticipantDetails = (details) => {
    setParticipantDetails(details);
    setOpenParticipantDetails(true);
  };

  const handleCloseParticipantDetails = () => {
    setParticipantDetails(null);
    setOpenParticipantDetails(false);
  };
//change to participants.js

  const handleCloseAlertSnackbar = () => {
    setOpenAlertSnackbar(false);
  };

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const username = getCookie("userEmail");

  let showOnsite = (
    <Button color="primary" variant="contained">
      Online
    </Button>
  );

  let approveBtn = (
    <Button
      startIcon={<ThumbUpIcon />}
      color="primary"
      variant="contained"
      onClick={approveEventHandler}
    >
      Approve
    </Button>
  );
  
  let rejectBtn = (
    <Button
      startIcon={<ThumbDownIcon />}
      color="secondary"
      variant="contained"
      onClick={rejectDialogHandler}
    >
      Reject
    </Button>
  );

  let finishBtn = (
    <Button
      startIcon={<CheckCircleIcon />}
      color="primary"
      variant="contained"
      onClick={() => changeStatusHandler(4)}
    >
      Finish this event
    </Button>
  );

  let disableBtn = (
    <Button
      startIcon={<CancelIcon />}
      color="secondary"
      variant="contained"
      onClick={() =>changeStatusHandler(5)}
    >
      Disable this event
    </Button>
  );
  
  let showActionBtns = null;
  let deleteBtn = null;
  let editDialog = null;
  let showParticipantDetails = null;
  let showFeedbackDetails = null;
  let showAlertSnackbar = null;
  let showRejectDialog = null;
  let showImages = (
    <CardMedia
      className={classes.media}
      image={noImage}
      title="No image"
      key="no-image"
    />
  );

  if (onsite === true) {
    showOnsite = (
      <Button color="secondary" variant="contained">
        On site
      </Button>
    );
  }

  if (status.name === "Pending") {
    deleteBtn = (
      <Button
        className={classes.settings}
        color="secondary"
        variant="outlined"
        onClick={deleteHandler}
      >
        Delete
      </Button>
    );

    if (username !== details.accountEmail) {
      showActionBtns = (
        <div>
          <CardActions>
            {approveBtn}
            {rejectBtn}
          </CardActions>
        </div>
      );
    }
  } else if (status.name === "Approved") {
    showActionBtns = (
      <Grid item container xs className={classes.Typography}>
        <CardActions>{disableBtn}</CardActions>
      </Grid>
    );
  } else if (status.name === "In progress") {
    showActionBtns = (
      <Grid item container xs className={classes.Typography}>
        <CardActions>{finishBtn}</CardActions>
      </Grid>
    );
  }

  if (images.length !== 0) {
    showImages = images.map((img) => {
      return (
        <CardMedia
          className={classes.media}
          image={img.url}
          title="Event image"
          key={img.imageId}
        />
      );
    });
  }

  if (openEditDialog) {
    editDialog = (
      <EditEvent
        infor={details}
        isOpen={openEditDialog}
        close={handleClose}
        update={handleUpdateProcess}
      />
    );
  }

  if (openParticipantDetails) {
    showParticipantDetails = (
      <ParticipantDetails
        isOpen={openParticipantDetails}
        close={handleCloseParticipantDetails}
        details={participantDetails}
      />
    );
  }

  if (openAlertSnackbar) {
    showAlertSnackbar = (
      <AlertSnackbar
        isOpen={openAlertSnackbar}
        close={handleCloseAlertSnackbar}
        alertType={alertType}
        message={message}
      />
    );
  }

  if (openRejectDialog) {
    showRejectDialog = (
      <RejectReasonDialog
        isOpen={openRejectDialog}
        closing={closeRejectDialogHandler}
        rejected={rejectEventHandler}
        id={props.match.params.id}
      />
    );
  }

  return (
    <>
      <Card className={classes.root}>
        <Grid container spacing={4}>
          <Grid item>{showImages}</Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <CardHeader
                title={
                  <Typography
                    className={classes.title}
                    variant="h1"
                    color="textPrimary"
                    component="h1"
                  >
                    {details.title}
                  </Typography>
                }
                subheader={
                  <Grid item xs>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="span"
                    >
                      <strong>Created on: </strong>{" "}
                      {moment(details.createdDate).format("MMMM Do YYYY")}
                    </Typography>
                  </Grid>
                }
              />

              <CardContent>
                <Grid item container xs className={classes.Typography}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <strong>Events start from: </strong>{" "}
                    {moment(details.startDate).format("MMMM Do YYYY")}
                  </Typography>
                </Grid>
                <Grid item container xs className={classes.Typography}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <strong>Type: </strong>
                    {showOnsite}
                  </Typography>
                </Grid>
                <Grid item container xs className={classes.Typography}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <strong>Location: </strong> {details.location}
                  </Typography>
                </Grid>
                <Grid item container xs className={classes.Typography}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <strong>Category: </strong>
                    {categories.map((cate) => {
                      return (
                        <Chip
                          style={{ margin: "5px" }}
                          color="primary"
                          variant="outlined"
                          label={cate.name}
                          key={cate.id}
                        />
                      );
                    })}
                  </Typography>
                </Grid>

                <Grid item container xs className={classes.Typography}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <strong>Status: </strong>
                    <Chip
                      color="primary"
                      variant="outlined"
                      label={status.name}
                    />
                  </Typography>
                </Grid>
                <Grid item container xs className={classes.Typography}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <strong>Pending slots: </strong> {details.spot}
                  </Typography>
                </Grid>
                <Grid item container xs className={classes.Typography}>
                  <Typography variant="body1" color="primary" component="span">
                    <strong>Points for this event: {details.point}</strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs
                  className={classes.description}
                  wrap="nowrap"
                >
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    {details.description}
                  </Typography>
                </Grid>
              </CardContent>
              {showActionBtns}
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
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                >
                  <strong>by: </strong>{" "}
                  <a href={`/home/users/${details.accountEmail}`}>
                    {details.accountEmail}
                  </a>
                </Typography>
              </Grid>
              <Grid item className={classes.side}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  component="span"
                >
                  <strong>to: </strong>{" "}
                  {moment(details.endDate).format("MMMM Do YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TabsLayout
          type="event"
          id={props.match.params.id}
          participantDetails={handleParticipantDetails}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper style={{ maxWidth: "auto", textAlign: "center" }}>
            <Button
              className={classes.settings}
              color="primary"
              variant="outlined"
              onClick={editHandler}
            >
              Edit
            </Button>
            {deleteBtn}
          </Paper>
        </Popover>
      </Card>
      {editDialog}
      {showParticipantDetails}
      {showFeedbackDetails}
      {showAlertSnackbar}
      {showRejectDialog}
    </>
  );
};

export default EventDetail;
