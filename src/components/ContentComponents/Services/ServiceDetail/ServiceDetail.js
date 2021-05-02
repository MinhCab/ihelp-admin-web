import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  createMuiTheme,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Popover,
  ThemeProvider,
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
import TabsLayout from "../../../FullLayout/UI/TabsLayout/TabsLayout";
import ParticipantDetails from "../../Users/Participants/ParticipantDetails/ParticipantDetails";
import AlertSnackbar from "../../../FullLayout/UI/AlertSnackbar/AlertSnackbar";
import { useAuth } from "../../../../hoc/StoringAuth/AuthContext";
import { RejectReasonDialog } from "../../../FullLayout/UI/AlertDialog/AlertDialog";
import EditService from "../EditService/EditService";

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

const ServiceDetail = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openParticipantDetails, setOpenParticipantDetails] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState("");
  const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false);
  const [openRejectDialog, setOpenRejectDialog] = React.useState(false)

  const [details, setDetails] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [status, setStatus] = React.useState({});
  const [images, setImages] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [participantDetails, setParticipantDetails] = React.useState({});

  const loadInfoAPI = () => {
    axios
      .get("/api/services/" + props.match.params.id)
      .then((res) => {
        setDetails(res.data);
        setCategories(res.data.categories);
        setStatus(res.data.status);
        setImages(res.data.images);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  }

  React.useEffect(() => {
    loadInfoAPI()
  }, []);

  const approveServiceHandler = () => {
    axios
      .put("/api/services/" + user.email + '/approve/' + props.match.params.id)
      .then((res) => {
        setMessage(res.data)
        setAlertType('success')
        setOpenAlertSnackbar(true)
        loadInfoAPI()
      })
      .catch((error) => {
        setMessage(error.response.data.error)
        setAlertType('error')
        setOpenAlertSnackbar(true)
      });
  };

  const rejectDialogHandler = () => {
    setOpenRejectDialog(true)
  }

  const closeRejectDialogHandler = () => {
    setOpenRejectDialog(false)
  }

  const rejectServiceHandler = (reason, serviceId) => {
    const rejectObject = {
      serviceId: serviceId,
      managerEmail: user.email,
      reason: reason,
    };
    axios
      .put("/api/services/reject", rejectObject)
      .then((res) => {
        setMessage(res.data)
        setAlertType('success')
        setOpenAlertSnackbar(true)
        setOpenRejectDialog(false)
        loadInfoAPI()
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  }; 

  const enableHandler = () => {
    axios
    .put("/api/services/enable/" + props.match.params.id)
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

  const disableHandler = () => {
    axios
    .put("/api/services/disable/" + props.match.params.id)
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
      .delete("/api/services/" + props.match.params.id)
      .then((res) => {
        history.goBack();
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  };

  const handleUpdateProcess = async(updateDetails) => {
    try {
      const response = await axios.put("/api/services", updateDetails);
      if (response.status === 200) {
        setOpenEditDialog(false);
        setOpenAlertSnackbar(true);
        setMessage("Edit service successful");
        setAlertType("success");
        setDetails(response.data);
        setCategories(response.data.categories);
        setStatus(response.data.status);
        setImages(response.data.images);
        setAnchorEl(null);
      }
    } catch {
      setMessage("Edit service failed, please try again");
      setAlertType("error");
      setOpenAlertSnackbar(true);
    }
  };

  const closeAlertSnackbar = () => {
    setOpenAlertSnackbar(false);
  };

  const handleParticipantDetails = (details) => {
    setParticipantDetails(details);
    setOpenParticipantDetails(true);
  };

  const handleCloseParticipantDetails = () => {
    setParticipantDetails(null);
    setOpenParticipantDetails(false);
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

  let approveBtn = (
    <Button
      startIcon={<ThumbUpIcon />}
      color="primary"
      variant="contained"
      onClick={approveServiceHandler}
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

  let enableBtn = (
    <ThemeProvider theme={additionalButtonTheme}>
      <Button
        startIcon={<CheckCircleIcon />}
        color="primary"
        variant="contained"
        onClick={enableHandler}
      >
        Enable this service
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
      Disable this service
    </Button>
  );
  
  let showActionBtns = null;
  let deleteBtn = null;
  let editDialog = null;
  let showParticipantDetails = null;
  let showAlertSnackbar = null;
  let showFeedbackDetails = null;
  let showRejectDialog = null;
  let showStatus = null
  let currentDate = moment()
  let showImages = (
    <CardMedia
      className={classes.media}
      image={noImage}
      title="No image"
      key="no-image"
    />
  );

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
  } else if (status.name === "Approved" || status.name === 'Ongoing') {
    showActionBtns = (
      <Grid item container xs className={classes.Typography}>
        <CardActions>{disableBtn}</CardActions>
      </Grid>
    );
  } else if (status.name === "Disabled" && moment(currentDate).isBefore(details.endDate)) {
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
          title="Service image"
          key={img.imageId}
        />
      );
    });
  }

  if (openEditDialog) {
    editDialog = (
      <EditService
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
        basePoint={details.point}
        type='service'
      />
    );
  }

  if (openAlertSnackbar) {
    showAlertSnackbar = (
      <AlertSnackbar
        isOpen={openAlertSnackbar}
        close={closeAlertSnackbar}
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
        rejected={rejectServiceHandler}
        id={props.match.params.id}
      />
    );
  }

  if(status.id === 3) {
    showStatus = (
      <ThemeProvider theme={additionalButtonTheme}>
        <Chip color="primary" label={status.name} />
      </ThemeProvider>
    ); 
  } else if(status.id === 2) {
    showStatus = (
      <ThemeProvider theme={additionalButtonTheme}>
        <Chip color="secondary" label={status.name} />
      </ThemeProvider>
    ); 
  } else if(status.id === 4) {
    showStatus = <Chip color="primary" label={status.name} />;  
  } else if(status.id === 5) {
    showStatus = <Chip color="inherit" label={status.name} />; 
  } else if(status.id === 6) {
    showStatus = <Chip color="secondary" label={status.name} />; 
  } else {
    showStatus = (
      <ThemeProvider theme={additionalButtonTheme2}>
        <Chip color="primary" label={status.name} />
      </ThemeProvider>
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
                    <strong>Service start from: </strong>{" "}
                    {moment(details.startDate).format("MMMM Do YYYY")}
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
                <Grid item container xs className={classes.Typography}>
                  <Typography variant="body1" color="primary" component="span">
                    <strong>Points for this service: {details.point}</strong>
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
          type="service"
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
      {showAlertSnackbar}
      {showRejectDialog}
      {showFeedbackDetails}
    </>
  );
};

export default ServiceDetail;
