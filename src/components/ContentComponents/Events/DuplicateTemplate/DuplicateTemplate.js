import {
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    makeStyles,
    Switch,
    TextField,
    List,
    Button,
    ListItem,
    ListItemText,
    DialogActions,
    CircularProgress,
  } from "@material-ui/core";
  import { Autocomplete } from "@material-ui/lab";
  import { enGB } from "date-fns/locale";
  import moment from "moment";
  import React, { useEffect } from "react";
  import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
  import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from "react-places-autocomplete";
  import { TextArea } from "semantic-ui-react";
  
  import axios from '../../../../api/axios'
import { useAuth } from "../../../../hoc/StoringAuth/AuthContext";
import AlertSnackbar from "../../../FullLayout/UI/AlertSnackbar/AlertSnackbar";
  
  const useStyles = makeStyles((theme) => ({
    descriptionField: {
      width: "100%",
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
  
  const DuplicateTemplate = (props) => {
    const classes = useStyles();
    const { user } = useAuth()
    const info = props.details;
    const oldEndDate  = new Date(info.endDate);
    const [categories, setCategories] = React.useState([]);
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState()
    const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false)
  
    const [title, setTitle] = React.useState(`${info.title} - Season ${new Date().getFullYear()}`);
    const [startDate, setStartDate] = React.useState()
    const [endDate, setEndDate] = React.useState()
    const [category, setCategory] = React.useState([]);
    const [quota, setQuota] = React.useState(info.quota);
    const [point, setPoint] = React.useState(info.point);
    const [onSite, setOnSite] = React.useState(info.isOnsite);
    const [location, setLocation] = React.useState(info.location);
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null,
    });
    const [description, setDescription] = React.useState(info.description);
  
    Date.prototype.addDays = function(days) {
      let date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date;
    }
  
    const handleTitleInput = (event) => {
      setTitle(event.target.value);
    };
  
    const handleCategoryInput = (value) => {
      setCategory(value)
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

    const handleCloseAlertSnackbar = () => {
      setOpenAlertSnackbar(false)
    }
  
    const duplicateProcess = (event) => {
      event.preventDefault()

      //check current date is the same with the old date or not
      // if(moment(startDate).isAfter(oldEndDate)) {

      let cateIDs = [];
  
      category.map((cate) => {
        return cateIDs.push(cate.id);
      });

      const duplicateEventDetails = {
        authorEmail: user.email,
        categoryIds: cateIDs,
        description: description,
        endDate: moment(endDate).format("yyyy-MM-DD HH:mm:ss"),
        images: info.images,
        latitude: coordinates.lat,
        location: location,
        longitude: coordinates.lng,
        onsite: onSite,
        point: point,
        quota: quota,
        startDate: moment(startDate).format("yyyy-MM-DD HH:mm:ss"),
        statusId: 2,
        title: title,
      };
      props.submit(duplicateEventDetails)
      // } else {
      //   setMessage('Event cannot being created during the time that previous event is occuring')
      //   setAlertType('error')
      //   setOpenAlertSnackbar(true)
      // }

    }
    
    useEffect(() => {
      setCategory(info.categories)
      axios
        .get("/api/event-categories")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err)
        });
    }, []);
  
    let showType = null;
    let showUploadPhotoDialog = null
    let showLocationField = (
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
              {loading && (
                <CircularProgress size={60} className={classes.buttonProgress} />
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
          </>
        )}
      </PlacesAutocomplete>
    );
  
    if (onSite === true) {
      showType = "On site";
    } else {
      showType = "Online";
      showLocationField = null;
    }

    let showAlertSnackbar = null
    if(openAlertSnackbar) {
      <AlertSnackbar 
        isOpen={openAlertSnackbar}
        close={handleCloseAlertSnackbar}
        message={message}
        alertType={alertType}
      />
    }
  
    return (
      <>
        <Dialog fullWidth maxWidth="md" open={props.isOpen} onClose={props.close}>
          {props.isLoading && (
            <CircularProgress size={60} className={classes.buttonProgress} />
          )}
          <DialogTitle>
            <strong style={{ fontSize: 20 }}>Create new season</strong>
          </DialogTitle>
          <form onSubmit={duplicateProcess}>
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
                minimumDate={new Date().addDays(15)}
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
              <Autocomplete
                multiple
                id="tags-outlined"
                options={categories}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.name === value.name}
                filterSelectedOptions
                onChange={(event, value) => handleCategoryInput(value)}
                value={category}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={category}
                    variant="outlined"
                    label="Categories"
                    inputProps={{
                      ...params.inputProps,
                      required: category.length === 0,
                    }}
                    required
                  />
                )}
              />
              <br />
              <TextField
                style={{ marginBottom: 20 }}
                required
                variant="outlined"
                value={quota}
                onChange={handleQuotaInput}
                label="Number of participants"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 100 } }}
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
                InputProps={{ inputProps: { min: 10 } }}
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
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {showUploadPhotoDialog}
        {showAlertSnackbar}
      </>
    );
  };;
  
  export default DuplicateTemplate;