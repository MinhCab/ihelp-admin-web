import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Input,
  makeStyles,
  Select,
  Switch,
  TextField,
  List,
  Grid,
  Button,
  MenuItem,
  Chip,
  ListItem,
  ListItemText,
  DialogActions
} from "@material-ui/core";
import { enGB } from "date-fns/locale";
import React, { useEffect } from "react";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import PlacesAutocomplete from "react-places-autocomplete";
import { TextArea } from "semantic-ui-react";

import axios from '../../../../api/axios'
import noImage from '../../../../assets/images/no-image.jpg'

const useStyles = makeStyles((theme) => ({
  finalButton: {
    margin: theme.spacing(0.5),
  },

  titleField: {
    fontSize: 60,
  },

  descriptionField: {
    width: '100%',
    height: "200px",
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

  imagePreview: {
    width: 400,
    height: 300,
}
}));

const EditEvent = (props) => {
  const classes = useStyles()
  const [categories, setCategories] = React.useState([])

  const [title, setTitle] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [category, setCategory] = React.useState([]);
  const [quota, setQuota] = React.useState(1);
  const [point, setPoint] = React.useState(0);
  const [onSite, setOnSite] = React.useState(true);
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

  useEffect(() => {
    axios
      .get("/api/event-categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        // openAlert(true)
        // const alertInfo = {
        //     type: 'error',
        //     message: err.message,
        //     isOpen: openAlert
        // }
        // setAlert.receiveMessage(alertInfo)
      });
  }, []);

  let showType = null;
  let showImage = noImage
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

  // if (!props.image) {
  //   showImage = props.image
  // }

  return (
    <Dialog open={props.isOpen} onClose={props.close}>
      <DialogTitle>
        <h2>Edit Events</h2>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <img
            className={classes.imagePreview}
            alt="cover photo"
            src={showImage}
          />
        </DialogContentText>
        <DialogContentText>
          <TextField
            variant="outlined"
            value={title}
            onChange={handleTitleInput}
            label="Title"
            fullWidth
          />
        </DialogContentText>
        <DialogContentText>
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
                  className={"input" + (focus === END_DATE ? " -focused" : "")}
                  {...endDateInputProps}
                  label="To"
                  variant="outlined"
                />
              </>
            )}
          </DateRangePicker>
        </DialogContentText>
        <DialogContentText>
          <Button
            variant="contained"
            component="label"
            color="primary"
            onClick={console.log("clicked")}
          >
            Upload Cover Photo
          </Button>
        </DialogContentText>
        <DialogContentText>
          <Select
            style={{ maxWidth: "100%" }}
            required
            id="txtCategory"
            select="true"
            value={category}
            multiple
            onChange={handleCategoryInput}
            input={
              <TextField fullWidth variant="outlined" label="Categories" />
            }
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
        </DialogContentText>
        <DialogContentText>
          <TextField
            variant="outlined"
            value={quota}
            onChange={handleQuotaInput}
            label="Number of participants"
          />
        </DialogContentText>
        <DialogContentText>
          <TextField
            variant="outlined"
            value={point}
            onChange={handlePointInput}
            label="Points per participant"
          />
        </DialogContentText>
        <DialogContentText>
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
        </DialogContentText>
        {showLocationField}
        <DialogContentText>
          <TextArea
            required
            placeholder="Description"
            value={description}
            className={classes.descriptionField}
            onChange={(event) => handleDescriptionInput(event)}
          />
        </DialogContentText>
        <DialogActions>
          <Button
            fullWidth
            onClick={props.update}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvent;