import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  createMuiTheme,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Popover,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { MoreVert, Visibility } from "@material-ui/icons";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";

import axios from "../../../../api/axios";
import noImage from "../../../../assets/images/no-image.jpg";
import EditEvent from "../EditEvent/EditEvent";
import TabsLayout from "../../../FullLayout/UI/TabsLayout/TabsLayout";
import ParticipantDetails from "../../Users/Participants/ParticipantDetails/ParticipantDetails";
import AlertSnackbar from "../../../FullLayout/UI/AlertSnackbar/AlertSnackbar";
import { useAuth } from "../../../../hoc/StoringAuth/AuthContext";
import { RejectReasonDialog } from "../../../FullLayout/UI/AlertDialog/AlertDialog";
import DuplicateTemplate from "../DuplicateTemplate/DuplicateTemplate";
import Requirements from "./Requirements/Requirements";

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

  buttonProgress: {
    color: "#039be5",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const additionalButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#008c3a",
    },
    secondary: {
      main: "#039be5",
    },
  },
});

const additionalButtonTheme2 = createMuiTheme({
  palette: {
    primary: {
      main: "#4aedc4",
    },
  },
});

const EventDetail = (props) => {
  const classes = useStyles();
  const [accEmail, setAccEmail] = React.useState();
  const history = useHistory();
  const { user } = useAuth();
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openParticipantDetails, setOpenParticipantDetails] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState("");
  const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false);
  const [openRejectDialog, setOpenRejectDialog] = React.useState(false);
  const [openDuplicateDialog, setOpenDuplicateDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openRequirementsDialog, setOpenRequirementsDialog] = React.useState(false)
  // const [openDiscardDialog, setOpenDiscardDialog] = React.useState(false)

  const [details, setDetails] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [status, setStatus] = React.useState({});
  const [onsite, setOnsite] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [participantDetails, setParticipantDetails] = React.useState({});
  const [disableApprove, setDisableApprove] = React.useState(false);

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const loadInfoAPI = () => {
    axios
      .get("/api/events/" + props.match.params.id)
      .then((res) => {
        console.log(res)
        isUserHasEnoughPoint(res.data.accountEmail);
        setDetails(res.data);
        setAccEmail(res.data.accountEmail);
        setCategories(res.data.categories);
        setStatus(res.data.status);
        setOnsite(res.data.isOnsite);
        setImages(res.data.images);
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
        setLoading(false);
      });
  };

  const isUserHasEnoughPoint = (accEmail) => {
    axios
      .get("/api/events/account/" + accEmail + "/" + props.match.params.id)
      .then((res) => {
        setDisableApprove(!res.data);
      })
      .catch((err) => {
        console.log("ha" + err);
      });
  };

  React.useEffect(() => {
    if (!loading) {
      setLoading(true);
      loadInfoAPI();
    }
  }, []);

  const approveEventHandler = () => {
    if (!loading) {
      setLoading(true);
      axios
        .put("/api/events/" + user.email + "/approve/" + props.match.params.id)
        .then((res) => {
          setMessage(res.data);
          setAlertType("success");
          setOpenAlertSnackbar(true);
          loadInfoAPI();
        })
        .catch((error) => {
          setMessage(error.response.data.message);
          setAlertType("error");
          setOpenAlertSnackbar(true);
          setLoading(false);
        });
    }
  };

  const rejectDialogHandler = () => {
    setOpenRejectDialog(true);
  };

  const closeRejectDialogHandler = () => {
    setOpenRejectDialog(false);
  };

  const rejectEventHandler = (reason, eventId) => {
    if (!loading) {
      setLoading(true);
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
          setOpenRejectDialog(false);
          loadInfoAPI();
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          setAlertType("error");
          setOpenAlertSnackbar(true);
          setLoading(false);
        });
    }
  };

  const enableHandler = () => {
    if (!loading) {
      setLoading(true);
      axios
        .put("/api/events/enable/" + props.match.params.id)
        .then((res) => {
          setMessage(res.data);
          setAlertType("success");
          setOpenAlertSnackbar(true);
          loadInfoAPI();
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          setAlertType("error");
          setOpenAlertSnackbar(true);
          setLoading(false);
        });
    }
  };

  const disableHandler = () => {
    if (!loading) {
      setLoading(true);
      axios
        .put("/api/events/disable/" + props.match.params.id)
        .then((res) => {
          setMessage(res.data);
          setAlertType("success");
          setOpenAlertSnackbar(true);
          loadInfoAPI();
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          setAlertType("error");
          setOpenAlertSnackbar(true);
        });
    }
  };

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
    if (!loading) {
      setLoading(true);
      axios
        .delete("/api/events/" + props.match.params.id)
        .then((res) => {
          setLoading(false);
          history.goBack();
        })
        .catch((error) => {
          setLoading(false);
          setMessage(error.response.data.error);
          setAlertType("error");
          setOpenAlertSnackbar(true);
        });
    }
  };

  //Autocomplete api
  const autoCompleteHandler = () => {
    if (!loading) {
      setLoading(true);
      axios
        .put("/api/events/complete/" + props.match.params.id)
        .then((res) => {
          setMessage(res.data);
          setAlertType("success");
          setOpenAlertSnackbar(true);
          loadInfoAPI();
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          setAlertType("error");
          setOpenAlertSnackbar(true);
        });
    }
  };

  const backToPendingHandler = () => {
    if (!loading) {
      setLoading(true);
      axios
        .put("/api/events/" + props.match.params.id + "/2")
        .then((res) => {
          setMessage(res.data);
          setAlertType("success");
          setOpenAlertSnackbar(true);
          loadInfoAPI();
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          setAlertType("error");
          setOpenAlertSnackbar(true);
        });
    }
  }

  const copyTemplateHandler = () => {
    setOpenDuplicateDialog(true);
  };

  const handleUpdateProcess = async (updateDetails) => {
    console.log('Before update: ' + updateDetails)
    if (!loading) {
      setLoading(true);
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
          setLoading(false);
        }
      } catch {
        setLoading(false);
        setMessage("Edit event failed, please try again");
        setAlertType("error");
        setOpenAlertSnackbar(true);
      }
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

  const submitCreateTemplate = (newEvent) => {
    if (!loading) {
      setLoading(true);
      axios
        .post("/api/events", newEvent)
        .then((res) => {
          setAlertType("success");
          setMessage(res.data);
          setOpenAlertSnackbar(true);
          setLoading(false);
          setOpenDuplicateDialog(false);
        })
        .catch((err) => {
          setAlertType("error");
          setMessage(err.response.data.message);
          setOpenAlertSnackbar(true);
          setLoading(false);
        });
    }
  };

  const handleCloseDuplicateDialog = () => {
    setAnchorEl(null);
    setOpenDuplicateDialog(false);
  };

  const openRequirementsHandler = () => {
    setOpenRequirementsDialog(true)
  }
  
  const closeRequirementsHandler = () => {
    setOpenRequirementsDialog(false)
  }

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

  const redirectToReference = (ref) => {
    history.replace('/home/events/details/' + ref)
  }

  let showOnsite = (
    <Button color="primary" variant="contained">
      Online
    </Button>
  );

  let approveBtn = (
    <ThemeProvider theme={additionalButtonTheme}>
      <Button
        startIcon={<ThumbUpIcon />}
        color="primary"
        variant="contained"
        onClick={approveEventHandler}
        disabled={disableApprove}
      >
        Approve
      </Button>
    </ThemeProvider>
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

  let enableBtn = (
    <ThemeProvider theme={additionalButtonTheme}>
      <Button
        startIcon={<CheckCircleIcon />}
        color="primary"
        variant="contained"
        onClick={enableHandler}
      >
        Enable this event
      </Button>
    </ThemeProvider>
  );

  let disableBtn = (
    <Button
      startIcon={<CancelIcon />}
      color="secondary"
      variant="contained"
      onClick={disableHandler}
    >
      Disable this event
    </Button>
  );

  //Autocomplete button
  let autoCompleteBtn = (
    <Button
      startIcon={<CheckCircleIcon />}
      color="primary"
      variant="contained"
      onClick={autoCompleteHandler}
    >
      Complete this event
    </Button>
  );

  let backToPendingBtn = (
    <Button
      startIcon={<CheckCircleIcon />}
      color="primary"
      variant="contained"
      onClick={backToPendingHandler}
    >
      Back to Pending
    </Button>
  )

  let showActionBtns = null;
  let deleteBtn = null;
  let editDialog = null;
  let showParticipantDetails = null;
  let showFeedbackDetails = null;
  let showAlertSnackbar = null;
  let showRejectDialog = null;
  let currentDate = moment();
  let restrictedDate = new Date(details.createdDate).addDays(3)
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
        <CardActions>
          {disableBtn}
          {autoCompleteBtn}
        </CardActions>
      </Grid>
    );
  } else if (status.name === "Rejected" && moment(currentDate).isSameOrBefore(restrictedDate)) {
    showActionBtns = (
      <div>
          <CardActions>
            {approveBtn}
            {backToPendingBtn}
          </CardActions>
        </div>
    )
  } else if( status.name === "Ongoing" ) {
    showActionBtns = (
      <Grid item container xs className={classes.Typography}>
        <CardActions>
          {disableBtn}
        </CardActions>
      </Grid>
    );
  } else if (
    status.name === "Disabled" &&
    moment(currentDate).isBefore(details.endDate)
  ) {
    showActionBtns = (
      <Grid item container xs className={classes.Typography}>
        <CardActions>{enableBtn}</CardActions>
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
        isLoading={loading}
      />
    );
  }

  if (openParticipantDetails) {
    showParticipantDetails = (
      <ParticipantDetails
        isOpen={openParticipantDetails}
        close={handleCloseParticipantDetails}
        details={participantDetails}
        basePoint={details.point}
        type="event"
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

  let showStatus = null;
  if (status.id === 3) {
    showStatus = (
      <ThemeProvider theme={additionalButtonTheme}>
        <Chip color="primary" label={status.name} />
      </ThemeProvider>
    );
  } else if (status.id === 2) {
    showStatus = (
      <ThemeProvider theme={additionalButtonTheme}>
        <Chip color="secondary" label={status.name} />
      </ThemeProvider>
    );
  } else if (status.id === 4) {
    showStatus = <Chip color="primary" label={status.name} />;
  } else if (status.id === 5) {
    showStatus = <Chip color="inherit" label={status.name} />;
  } else if (status.id === 6) {
    showStatus = <Chip color="secondary" label={status.name} />;
  } else {
    showStatus = (
      <ThemeProvider theme={additionalButtonTheme2}>
        <Chip color="primary" label={status.name} />
      </ThemeProvider>
    );
  }

  let copyTemplateBtn = null;
  if (status.id === 4) {
    copyTemplateBtn = (
      <Button
        className={classes.settings}
        color="primary"
        variant="outlined"
        onClick={copyTemplateHandler}
      >
        Create new season
      </Button>
    );
  }

  let duplicateDialog = null;
  if (openDuplicateDialog) {
    duplicateDialog = (
      <DuplicateTemplate
        details={details}
        isOpen={openDuplicateDialog}
        close={handleCloseDuplicateDialog}
        submit={submitCreateTemplate}
        isLoading={loading}
        templateId={props.match.params.id}
      />
    );
  }

  let showRequirements = null 
  if(details.suggestion) {
    showRequirements = (
      <Grid item container xs className={classes.Typography}>
        <Typography
          variant="body1"
          color="textPrimary"
          component="span"
        >
          <strong>Additional Informations: </strong>
          <Button
            color='primary'
            variant='outlined'
            startIcon={<Visibility />}
            onClick={openRequirementsHandler}
          >
            Show
          </Button>
        </Typography>
      </Grid>
    )
  } else {
    <Grid item container xs className={classes.Typography}>
      <Typography
        variant="body1"
        color="textPrimary"
        component="span"
      >
        No addtional information
      </Typography>
    </Grid>
  }

  let requirementsDialog = null
  if(openRequirementsDialog) {
    requirementsDialog = (
      <Requirements isOpen={openRequirementsDialog} close={closeRequirementsHandler} requirements={details.suggestion} />
    )
  }

  let showRefence = null
  if(details.referencedEventId) {
    showRefence = (
      <Grid item container xs className={classes.Typography}>
        <Typography
          variant="body1"
          color="textPrimary"
          component="span"
        >
          <strong>Reference from: </strong> <a href={`/home/events/details/${details.referencedEventId}`}>
                    {details.referencedEventId}
                  </a>
        </Typography>
      </Grid>
    )
  }

  // let showDiscardDialog = null
  // if(openDiscardDialog) => {
  //   showDiscardDialog = (
  //     <DiscardAlertDialog
  //       isOpen={openDiscardDialog}
  //       closing={handleCloseDiscardDialog}

  //     />
  //   )
  // }

  return (
    <>
      <Card className={classes.root}>
        {loading && (
          <CircularProgress size={60} className={classes.buttonProgress} />
        )}
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
                    <strong>Tags: </strong>
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

                {showRequirements}

                <Grid item container xs className={classes.Typography}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <strong>Status: </strong>
                    {showStatus}
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
                {showRefence}
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
          basePoint={details.point}
          cateId={5}
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
            {copyTemplateBtn}
            {deleteBtn}
          </Paper>
        </Popover>
      </Card>
      {editDialog}
      {showParticipantDetails}
      {showFeedbackDetails}
      {showAlertSnackbar}
      {showRejectDialog}
      {duplicateDialog}
      {requirementsDialog}
    </>
  );
};

export default EventDetail;
