import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  Switch,
  TextField,
  List,
  Button,
  MenuItem,
  Chip,
  ListItem,
  ListItemText,
  DialogActions,
  Select,
  Input,
} from "@material-ui/core";
import { enGB } from "date-fns/locale";
import moment from "moment";
import React, { useEffect } from "react";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import PlacesAutocomplete from "react-places-autocomplete";
import { TextArea } from "semantic-ui-react";

import axios from '../../../../api/axios'
import PhotoUploadDialog from '../../../FullLayout/UI/PhotoUploadDialog/PhotoUploadDialog'

const useStyles = makeStyles((theme) => ({

  descriptionField: {
    width: '100%',
    height: "200px",
    padding: theme.spacing(0.5),
    fontSize: 25,
  },

  locationSuggest: {
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 300,
    position: "absolute",
  },

  imagePreview: {
    width: 400,
    height: 300,
}
}));

const EditEvent = (props) => {
  const classes = useStyles();
  const info = props.infor;
  const [categories, setCategories] = React.useState([]);
  // const [openPhotoDialog, setOpenPhotoDialog] = React.useState(false)

  const [title, setTitle] = React.useState(info.title);
  const [startDate, setStartDate] = React.useState(new Date(info.startDate));
  const [endDate, setEndDate] = React.useState(new Date(info.endDate));
  const [category, setCategory] = React.useState(info.categories);
  const [quota, setQuota] = React.useState(info.quota);
  const [point, setPoint] = React.useState(info.point);
  const [onSite, setOnSite] = React.useState(info.onsite);
  const [location, setLocation] = React.useState(info.location);
  // const [images, setImages] = React.useState(info.images)
  // const [image, setImage] = React.useState(null)
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [description, setDescription] = React.useState(info.description);

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryInput = (event) => {
    console.log("lên đây r nè");
    setCategory(event.target.value)
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

  // const handleUploadPhoto = () => {
  //   setOpenPhotoDialog(true)
  // }

  // const handleClosePhotoDialog = () => {
  //   setOpenPhotoDialog(false);
  // }

  // const handleConfirmPhotoDialog = () => {
  //   console.log('confirm clicked')
  // }

  const updateProcess = (event) => {
    event.preventDefault()
    let cateIDs = [];

    category.map((cate) => {
      return cateIDs.push(cate.id);
    });
    const updateDetails = {
      categoryIds: cateIDs,
      description: description,
      endDate: moment(endDate).format("yyyy-MM-DD HH:mm:ss"),
      id: info.id,
      latitude: coordinates.lat,
      location: location,
      longitude: coordinates.lng,
      onsite: onSite,
      point: point,
      quota: quota,
      startDate: moment(startDate).format("yyyy-MM-DD HH:mm:ss"),
      title: title,
    };
    console.log(updateDetails)
    props.update(updateDetails)
    };

  
  useEffect(() => {
    axios
      .get("/api/event-categories")
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let showType = null;
  let showUploadPhotoDialog = null
  let showLocationField = (
    <DialogContentText>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={handleSelectGoogleLocation}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <TextField
              variant="outlined"
              {...getInputProps({ placeholder: "Type location" })}
              fullWidth
              label="Location"
              required
              style={{ marginBottom: 20 }}
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
          </>
        )}
      </PlacesAutocomplete>
    </DialogContentText>
  );

  if (onSite === true) {
    showType = "On site";
  } else {
    showType = "Online";
    showLocationField = null;
  }

  // if(openPhotoDialog) {
  //   showUploadPhotoDialog = (
  //     <PhotoUploadDialog
  //       isOpen={openPhotoDialog}
  //       cancel={handleClosePhotoDialog}
  //       confirm={handleConfirmPhotoDialog}
  //       image={image}
  //     />
  //   )
  // }

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={props.isOpen} onClose={props.close}>
        <DialogTitle>
          <strong style={{ fontSize: 20 }}>Edit Events</strong>
        </DialogTitle>
        <form onSubmit={updateProcess}>
          <DialogContent>
            <TextField
              required
              variant="outlined"
              value={title}
              onChange={handleTitleInput}
              label="Title"
              fullWidth
              style={{ marginBottom: 20 }}
            />
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
                <>
                  <TextField
                    style={{ marginBottom: 20 }}
                    required
                    className={
                      "input" + (focus === START_DATE ? " -focused" : "")
                    }
                    {...startDateInputProps}
                    label="From"
                    variant="outlined"
                  />
                  <TextField
                    style={{ marginBottom: 20 }}
                    required
                    className={
                      "input" + (focus === END_DATE ? " -focused" : "")
                    }
                    {...endDateInputProps}
                    label="To"
                    variant="outlined"
                  />
                </>
              )}
            </DateRangePicker>
            <Select
              style={{ marginBottom: 20 }}
              required
              id="txtCategory"
              select="true"
              value={category}
              multiple
              onChange={(event) => handleCategoryInput(event)}
              input={<Input />}
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
            <br />
            <TextField
              style={{ marginBottom: 20 }}
              required
              variant="outlined"
              value={quota}
              onChange={handleQuotaInput}
              label="Number of participants"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
            />
            <br />
            <TextField
              style={{ marginBottom: 20 }}
              required
              variant="outlined"
              value={point}
              onChange={handlePointInput}
              label="Points per participant"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
            />
            <br />
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
            {showLocationField}
            <TextArea
              style={{ marginBottom: 20 }}
              required
              placeholder="Description"
              value={description}
              className={classes.descriptionField}
              onChange={(event) => handleDescriptionInput(event)}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* <Dialog open={props.isOpen} onClose={props.close}>
        <DialogTitle></DialogTitle>
          
            <form autoComplete="off">
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="txtTitle"
                    onChange={handleTitleInput}
                    required
                    value={title}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={12} xs={12}>
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
                      <>
                        <TextField
                          required
                          className={
                            "input" + (focus === START_DATE ? " -focused" : "")
                          }
                          {...startDateInputProps}
                          label="From"
                          variant="outlined"
                        />
                        <TextField
                          required
                          className={
                            "input" + (focus === END_DATE ? " -focused" : "")
                          }
                          {...endDateInputProps}
                          label="To"
                          variant="outlined"
                        />
                      </>
                    )}
                  </DateRangePicker>
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    // onChange={handleChange}
                    required
                    // value={details.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    // onChange={handleChange}
                    type="number"
                    // value={details.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    // onChange={handleChange}
                    required
                    // value={details.country}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    // onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    // value={details.state}
                    variant="outlined"
                  >
                    <option value="India"> India </option>
                    <option value="USA"> USA </option>
                    <option value="Canada"> Canada </option>
                  </TextField>
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="flex-start" mt={3}>
                <Button color="primary" variant="contained">
                  Save details
                </Button>
              </Box>
            </form>
      </Dialog> */}
      {showUploadPhotoDialog}
    </>
  );
};;

export default EditEvent;