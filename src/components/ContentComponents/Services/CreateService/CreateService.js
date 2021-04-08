import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
  TextField,
  MenuItem,
  Select,
  Input,
  ListItem,
  ListItemText,
  List,
  Chip,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { TextArea } from "semantic-ui-react";

import { ServiceConfirmationDialog } from "../../../FullLayout/UI/ConfirmationDialog/ConfirmationDialog";
import { storage } from "../../../../api/Firebase/firebase-config";
import PhotoUploadDialog from "../../../FullLayout/UI/PhotoUploadDialog/PhotoUploadDialog";
import axios from "../../../../api/axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

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
}));

const CreateService = (props) => {
  const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [confirmInfo, setConfirmInfo] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [openPhotoUpload, setOpenPhotoUpload] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [category, setCategory] = React.useState([]);
  const [quota, setQuota] = React.useState(1);
  const [point, setPoint] = React.useState(0);
  const [location, setLocation] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [description, setDescription] = React.useState("");

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryInput = (event) => {
    setCategory(event.target.value);
  };

  const handleQuotaInput = (event) => {
    setQuota(event.target.value);
  };

  const handlePointInput = (event) => {
    setPoint(event.target.value);
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

  const handleProceedConfirmation = async () => {
    let images = [];
    let imageURL = await uploadImageToFirebase();

    if (imageURL) {
      images = [
        {
          type: "cover",
          url: imageURL,
        },
      ];
    }

    let cateIDs = [];

    category.map((cate) => {
      return cateIDs.push(cate.id);
    });

    const service = {
      authorEmail: author,
      categoryIds: cateIDs,
      description: description,
      endDate: moment(endDate).format("yyyy-MM-DD HH:mm:ss"),
      id: "",
      location: location,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      point: point,
      quota: quota,
      startDate: moment(startDate).format("yyyy-MM-DD HH:mm:ss"),
      statusId: 3,
      title: title,
      images: images,
    };

    props.submit(service);

    setOpenConfirmation(false);
  };

  const handleCreateServiceButton = () => {
    setConfirmInfo({
      title: title.toUpperCase(),
      startDate: startDate.toString(),
      endDate: endDate,
      category: category,
      quota: quota,
      point: point,
      description: description,
      location: location,
    });
    setOpenConfirmation(true);
  };

  const handleOpenPhotoUploadDialog = () => {
    setOpenPhotoUpload(true);
  };

  const handleClosePhotoUploadDialog = () => {
    setOpenPhotoUpload(false);
  };

  const handleUploadImage = (file) => {
    setImage(file);
    setOpenPhotoUpload(false);
  };

  const uploadImageToFirebase = async () => {
    if (image === null) {
      return null;
    } else {
      return new Promise((resolve, reject) => {
        const uploadImageTask = storage
          .ref(`images/services/${image.name}`)
          .put(image);
        uploadImageTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            reject("upload image to firebase - reject: " + error);
          },
          () => {
            storage
              .ref("images/services/")
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
    axios.get("/api/service-categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const author = getCookie("userEmail");
  const createdDate = new Date();
  let showConfirmation = null;
  let showImageName = null;
  let showImageUploadDialog = null;
  let showLocationField = (
    <Grid item>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={handleSelectGoogleLocation}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Typography variant="body1" color="textPrimary" component="span">
            <strong>Location: </strong>{" "}
            <TextField
              variant="outlined"
              {...getInputProps({ placeholder: "Type location" })}
            />
            <List className={classes.locationSuggest}>
              {loading ? <div>...loading</div> : null}

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
          </Typography>
        )}
      </PlacesAutocomplete>
    </Grid>
  );

  if (openConfirmation) {
    if (confirmInfo !== null) {
      showConfirmation = (
        <ServiceConfirmationDialog
          details={confirmInfo}
          cancel={handleCancelConfirmation}
          proceed={handleProceedConfirmation}
          isOpen={openConfirmation}
        />
      );
    } else {
      // console.log("Event is null");
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
      />
    );
  }

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={props.isOpen} onClose={props.close}>
        <DialogContent>
          <Card>
            <form onSubmit={handleCreateServiceButton}>
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
                        onClick={props.close}
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
                  minimumDate={new Date()}
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
                          <strong>This service will start on: </strong>
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
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                      style={{ marginRight: 10 }}
                    >
                      <strong>Category: </strong>
                    </Typography>

                    <Select
                      required
                      id="txtCategory"
                      select="true"
                      value={category}
                      multiple
                      onChange={handleCategoryInput}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => {
                        return (
                          <div>
                            {selected.map((value) => {
                              return <Chip key={value.id} label={value.name} />;
                            })}
                          </div>
                        );
                      }}
                    >
                      {categories.map((cate) => {
                        return (
                          <MenuItem key={cate.id} value={cate}>
                            {cate.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                      style={{ marginRight: 10 }}
                    >
                      <strong>Number of participants: </strong>
                    </Typography>
                    <TextField
                      required
                      id="txtQuota"
                      variant="outlined"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      style={{ maxWidth: 100 }}
                      onChange={(event) => handleQuotaInput(event)}
                      value={quota}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                      style={{ marginRight: 10 }}
                    >
                      <strong>Points per participant: </strong>
                    </Typography>
                    <TextField
                      required
                      id="txtPoint"
                      variant="outlined"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      style={{ maxWidth: 100 }}
                      onChange={(event) => handlePointInput(event)}
                      value={point}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs spacing={3} style={{ marginTop: 20 }}>
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
    </>
  );
};

export default CreateService;
