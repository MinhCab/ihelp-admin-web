import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Input,
  Switch,
  FormControlLabel,
  ListItem,
  ListItemText,
  List,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AddIcon from '@material-ui/icons/Add';
import { TextArea } from "semantic-ui-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { EventConfirmationDialog } from "../../../FullLayout/UI/ConfirmationDialog/ConfirmationDialog";
import { storage } from "../../../../api/Firebase/firebase-config";
import PhotoUploadDialog from "../../../FullLayout/UI/PhotoUploadDialog/PhotoUploadDialog";
import axios from "../../../../api/axios";
import { useAuth } from "../../../../hoc/StoringAuth/AuthContext";
import AlertSnackbar from "../../../FullLayout/UI/AlertSnackbar/AlertSnackbar";
import { Autocomplete } from "@material-ui/lab";
import Requirements from "./Requirements/Requirements";
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  finalButton: {
    margin: theme.spacing(0.5),
  },

  titleField: {
    fontSize: 60,
  },

  descriptionField: {
    width: "100%",
    height: "400px",
    padding: theme.spacing(0.5),
    fontSize: 25,
  },

  locationSuggest: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 300,
    position: "absolute",
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

const CreateEvent = (props) => {
  const classes = useStyles();
  const { role } = useAuth();
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [confirmInfo, setConfirmInfo] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [openPhotoUpload, setOpenPhotoUpload] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState("");
  const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false);
  const [openRequirements, setOpenRequirements] = React.useState(false)
  const [reqCount, setReqCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [category, setCategory] = React.useState([]);
  const [quota, setQuota] = React.useState(1);
  const [point, setPoint] = React.useState(0);
  const [onSite, setOnSite] = React.useState(true);
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [requirements, setRequirements] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryInput = (value) => {
    setCategory(value);
  };

  const handleQuotaInput = (event) => {
    setQuota(event.target.value);
  };

  const handlePointInput = (event) => {
    setPoint(event.target.value);
  };

  const handleOnsiteTypeInput = () => {
    setOnSite(!onSite);
  };

  const handleSelectGoogleLocation = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLocation(value);
    setCoordinates(latLng);
  };

  const handleDescriptionInput = (event) => {
    setDescription(event.target.value);
  };

  const handleCancelConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleProceedConfirmation = async (event) => {
    if(!loading) {
      setLoading(true)
      event.preventDefault();
      const imageURL = await uploadImageToFirebase();
  
      let images = [];
      if (imageURL) {
        images = [
          {
            type: "cover",
            url: imageURL,
          },
        ];
      }
  
      let realLocation = location;
  
      if (onSite === false) {
        realLocation = "Online";
      }
  
      let cateIDs = [];
  
      category.map((cate) => {
        return cateIDs.push(cate.id);
      });
  
      let status;
      role.id === "admin" ? (status = 3) : (status = 2);
  
      const eventDetails = {
        authorEmail: author,
        categoryIds: cateIDs,
        description: description,
        endDate: moment(endDate).format("yyyy-MM-DD HH:mm:ss"),
        images: images,
        id: "",
        latitude: coordinates.lat,
        location: realLocation,
        longitude: coordinates.lng,
        onsite: onSite,
        point: point,
        quota: quota,
        startDate: moment(startDate).format("yyyy-MM-DD HH:mm:ss"),
        statusId: status,
        title: title,
        requirement: requirements,
      };
  
      props.submit(eventDetails);
      setOpenConfirmation(false);
      setLoading(false)
    }
  };

  const handleCreateEventButton = (event) => {
    event.preventDefault();
    if (!image) {
      setMessage("Need to have a cover photo when create a new event");
      setAlertType("info");
      setOpenAlertSnackbar(true);
    } else {
      let realLocation = location;

      if (onSite === false) {
        realLocation = "Online";
      }

      setConfirmInfo({
        title: title.toUpperCase(),
        startDate: startDate.toString(),
        endDate: endDate,
        category: category,
        onsite: onSite,
        quota: quota,
        point: point,
        description: description,
        location: realLocation,
      });
      setOpenConfirmation(true);
    }
  };

  const handleDiscardEventButton = () => {
    props.close();
  };

  const handleOpenPhotoUploadDialog = () => {
    setOpenPhotoUpload(true);
  };

  const handleClosePhotoUploadDialog = () => {
    setOpenPhotoUpload(false);
  };

  const handleOpenRequirementsDialog = () => {
    setOpenRequirements(true)
  }

  const handleCloseRequirementsDialog = () => {
    setOpenRequirements(false)
  }

  const handleSaveRequirements = (reqs) => {
    setOpenRequirements(false)
    setRequirements(reqs)
    let list = reqs.split('/n')
    setReqCount(list.length)
  }

  const handleUploadImage = (file) => {
    setImage(file);
    setOpenPhotoUpload(false);
  };

  const closeAlertSnackbarHandler = () => {
    setOpenAlertSnackbar(false);
  };

  const uploadImageToFirebase = async () => {
    if (image === null) {
      return null;
    } else {
      return new Promise((resolve, reject) => {
        const uploadImageTask = storage
          .ref(`images/events/${image.name}`)
          .put(image);
        uploadImageTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            reject("upload image to firebase - reject: " + error);
          },
          () => {
            storage
              .ref("images/events/")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                resolve(url);
              });
          }
        );
      });
    }
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

  useEffect(() => {
    axios
      .get("/api/event-categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setAlertType("error");
        setOpenAlertSnackbar(true);
      });
  }, []);

  const author = getCookie("userEmail");
  const createdDate = new Date();
  let showType = "On site";
  let showConfirmation = null;
  let showImageName = null;
  let showImageUploadDialog = null;
  let showAlertSnackbar = null;
  let showRequirementsDialog = null;
  let showLocationField = (
    <Grid item>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={handleSelectGoogleLocation}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography
                style={{ marginRight: 10 }}
                variant="body1"
                color="textPrimary"
                component="span"
              >
                <strong>Location: </strong>
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                {...getInputProps({ placeholder: "Type location" })}
              />
              <List className={classes.locationSuggest}>
                {loading && (
                  <CircularProgress
                    size={60}
                    className={classes.buttonProgress}
                  />
                )}

                {suggestions.map((suggest) => {
                  return (
                    <ListItem
                      button
                      divider
                      {...getSuggestionItemProps(suggest)}
                      key={suggest.index}
                    >
                      <ListItemText>{suggest.description}</ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        )}
      </PlacesAutocomplete>
    </Grid>
  );

  if (onSite === false) {
    showType = "Online";
    showLocationField = null;
  }

  if (openConfirmation) {
    if (confirmInfo !== null) {
      showConfirmation = (
        <EventConfirmationDialog
          details={confirmInfo}
          cancel={handleCancelConfirmation}
          proceed={handleProceedConfirmation}
          isOpen={openConfirmation}
          isLoading={props.isLoading}
        />
      );
    }
  }

  if (image !== null) {
    showImageName = (
      <Typography variant="body1" color="textPrimary" component="span">
        <strong>Uploaded photo: </strong> {image.name}
      </Typography>
    );
  }

  if (openPhotoUpload) {
    showImageUploadDialog = (
      <PhotoUploadDialog
        isOpen={openPhotoUpload}
        cancel={handleClosePhotoUploadDialog}
        confirm={handleUploadImage}
        image={image}
        isLoading={loading}
      />
    );
  }

  if (openAlertSnackbar) {
    showAlertSnackbar = (
      <AlertSnackbar
        isOpen={openAlertSnackbar}
        close={closeAlertSnackbarHandler}
        alertType={alertType}
        message={message}
      />
    );
  }

  if(openRequirements) {
    showRequirementsDialog = (
      <Requirements 
        isOpen={openRequirements}
        close={handleCloseRequirementsDialog}
        save={handleSaveRequirements}
        requirements={requirements}
        isLoading={loading}
      />
    )
  }

  let showReqDes = null
  requirements.length >> 0 ? showReqDes = (
    <p>
    There are {reqCount} requirements
      <Button
      startIcon={<CreateIcon />}
      variant="outlined"
      component="label"
      color="primary"
      onClick={handleOpenRequirementsDialog}
    >
        Edit
  </Button>
  </p>) : showReqDes = (
    <p>
    There are no requirements yet
      <Button
      style={{marginLeft: 10}}
      startIcon={<AddIcon />}
      variant="outlined"
      component="label"
      color="primary"
      onClick={handleOpenRequirementsDialog}
    >
        Add
  </Button>
  </p>)

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={props.isOpen} onClose={props.close}>
        <DialogContent>
          <Card>
            <form onSubmit={handleCreateEventButton}>
              <CardHeader
                title={
                  <Grid
                    container
                    item
                    xs
                    spacing={2}
                    style={{ paddingBottom: 10 }}
                  >
                    <Grid item xs>
                      <Typography
                        variant="h1"
                        color="textPrimary"
                        component="h2"
                      >
                        <Input
                          required
                          className={classes.titleField}
                          placeholder="Title"
                          id="txtEventTitle"
                          value={title}
                          onChange={(event) => handleTitleInput(event)}
                        />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.finalButton}
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Create
                      </Button>
                      <Button
                        className={classes.finalButton}
                        color="secondary"
                        variant="contained"
                        onClick={handleDiscardEventButton}
                      >
                        Discard
                      </Button>
                    </Grid>
                  </Grid>
                }
                subheader={
                  <Grid container item xs spacing={2}>
                    <Grid item xs>
                      <strong>Created on: </strong>{" "}
                      {moment(createdDate).format("MMM Do YYYY")}
                    </Grid>
                    <Grid item>
                      <strong>by: </strong> {author}
                    </Grid>
                  </Grid>
                }
              />

              <CardContent>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  minimumDate={new Date().addDays(15)}
                  minimumLength={1}
                  format="dd MMM yyyy"
                  locale={enGB}
                >
                  {({ startDateInputProps, endDateInputProps, focus }) => (
                    <Grid
                      item
                      container
                      xs
                      spacing={3}
                      style={{ marginBottom: 20 }}
                    >
                      <Grid item xs>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="span"
                        >
                          <strong>This event will start on: </strong>
                          <TextField
                            required
                            className={
                              "input" +
                              (focus === START_DATE ? " -focused" : "")
                            }
                            {...startDateInputProps}
                            placeholder="from"
                            variant="outlined"
                          />

                          <ArrowForwardIcon style={{ margin: "10 10 auto" }} />

                          <TextField
                            required
                            className={
                              "input" + (focus === END_DATE ? " -focused" : "")
                            }
                            {...endDateInputProps}
                            placeholder="to"
                            variant="outlined"
                          />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="span"
                          style={{ marginRight: 10 }}
                        >
                          <strong>Cover photo: </strong>
                        </Typography>
                        <Button
                          variant="contained"
                          component="label"
                          color="primary"
                          onClick={handleOpenPhotoUploadDialog}
                        >
                          Upload File
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </DateRangePicker>
                <Grid item container xs spacing={3}>
                  <Grid item xs>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="span"
                          style={{ marginRight: 10 }}
                        >
                          <strong>Category: </strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={categories}
                          getOptionLabel={(option) => option.name}
                          filterSelectedOptions
                          fullWidth
                          onChange={(event, value) =>
                            handleCategoryInput(value)
                          }
                          value={category}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              inputProps={{
                                ...params.inputProps,
                                required: category.length === 0,
                              }}
                              required
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                      style={{ marginRight: 10 }}
                    >
                      {showImageName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs spacing={3} style={{ marginTop: 20 }}>
                  <Grid item xs>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="span"
                          style={{ marginRight: 10 }}
                        >
                          <strong>Requirements: </strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {showReqDes}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs spacing={3} style={{ marginTop: 20 }}>
                  <Grid item xs>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="span"
                          style={{ marginRight: 10 }}
                        >
                          <strong>Number of participants: </strong>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          required
                          id="txtQuota"
                          variant="outlined"
                          type="number"
                          InputProps={{ inputProps: { min: 1, max: 100 } }}
                          style={{ maxWidth: 100 }}
                          onChange={(event) => handleQuotaInput(event)}
                          value={quota}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="span"
                          style={{ marginRight: 10 }}
                        >
                          <strong>Points per participant: </strong>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          required
                          id="txtPoint"
                          variant="outlined"
                          type="number"
                          InputProps={{ inputProps: { min: 10 } }}
                          style={{ maxWidth: 100 }}
                          onChange={(event) => handlePointInput(event)}
                          value={point}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs spacing={3} style={{ marginTop: 20 }}>
                  <Grid item xs>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                      style={{ marginRight: 10 }}
                    >
                      <strong>Event's type: </strong>
                      <FormControlLabel
                        control={
                          <Switch
                            name="onSiteType"
                            checked={onSite}
                            onChange={handleOnsiteTypeInput}
                            color="primary"
                          />
                        }
                        label={showType}
                        labelPlacement="end"
                      />
                    </Typography>
                  </Grid>
                  {showLocationField}
                </Grid>
                <Grid item container spacing={3} style={{ marginTop: 20 }}>
                  <Grid item xs={12}>
                    <TextArea
                      required
                      placeholder="Description"
                      value={description}
                      className={classes.descriptionField}
                      onChange={(event) => handleDescriptionInput(event)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
      {showConfirmation}
      {showImageUploadDialog}
      {showAlertSnackbar}
      {showRequirementsDialog}
    </>
  );
};

export default CreateEvent;
