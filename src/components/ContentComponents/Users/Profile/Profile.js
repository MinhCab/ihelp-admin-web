import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
  Avatar,
  Divider,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import AlertSnackbar from "../../../FullLayout/UI/AlertSnackbar/AlertSnackbar";
import moment from "moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PhoneInput from 'material-ui-phone-number'

import { DiscardAlertDialog } from "../../../FullLayout/UI/AlertDialog/AlertDialog";
import PhotoUploadDialog from "../../../FullLayout/UI/PhotoUploadDialog/PhotoUploadDialog";
import axios from "../../../../api/axios";
import ChangePassword from "./ChangePassword/ChangePassword";
import ProfileSelfEvents from "../../Events/ProfileSelfEvents/ProfileSelfEvents";
import ProfileSelfServices from "../../Services/ProfileSelfServices/ProfileSelfServices";
import { useAuth } from "../../../../hoc/StoringAuth/AuthContext"

const useStyles = makeStyles({
  avatar: {
    height: 100,
    width: 100,
    margin: "0 auto",
    marginBottom: 10,
  },

  buttonProgress: {
    color: "#039be5",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

const Profile = (props) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [details, setDetails] = useState({});

  const [fullname, setFullname] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [phone, setPhone] = useState(0);
  const [gender, setGender] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [role, setRole] = useState({});

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState();
  const [openAlertSnackbar, setOpenAlertSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [activeEditForm, setActiveEditForm] = useState(false);
  const [openDiscardDialog, setOpenDiscardDialog] = useState(false);
  const [openPhotoUploadDialog, setOpenPhotoUploadDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  const editFullnameHandler = (event) => {
    setFullname(event.target.value);
  };

  const editEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const editBirthDateHandler = (date) => {
    setBirthDate(date);
  };

  const editPhoneHandler = (value) => {
    setPhone(value);
  };

  const editGenderHandler = (event) => {
    setGender(event.target.value);
  };

  const editAvatarHandler = () => {
    setOpenPhotoUploadDialog(true);
  };

  const handleClosePhotoUploadDialog = () => {
    setOpenPhotoUploadDialog(false);
  };

  const handleUploadImage = (file) => {
    setImage(file);
    setOpenPhotoUploadDialog(false);
  };

  const handleCloseErrorSnackbar = () => {
    setOpenAlertSnackbar(false);
  };

  const discardEditFormHandler = () => {
    setOpenDiscardDialog(true);
  };

  const closeWithoutEditHandler = () => {
    setOpenDiscardDialog(false);
  };

  const proceedDiscardFormHandler = () => {
    setDefaultDetails();
    setActiveEditForm(false);
    setOpenDiscardDialog(false);
  };

  const proceedEditFormHandler = async () => {
    if (!loading) {
      setLoading(true);
      const profile = {
        dateOfBirth: moment(birthDate).format("yyyy-MM-DD"),
        email: email,
        fullname: fullname,
        gender: gender,
        phone: phone,
      };
      try {
        const response = await axios.put("/accounts", profile);
        console.log(response);
        if (response.status === 200) {
          setDetails(response.data);
          setMessage("Update profile Complete");
          setAlertType("success");
          setOpenAlertSnackbar(true);
          setLoading(false);
        }
      } catch (error) {
        console.log("voo dday chwa");
        setMessage("Update profile failed, please try again");
        setOpenAlertSnackbar(true);
        setAlertType("error");
        setLoading(false);
      }
    }
    setActiveEditForm(false);
  };

  const editProfileHandler = () => {
    setDefaultDetails();
    setActiveEditForm(true);
  };

  const setDefaultDetails = () => {
    setFullname(details.fullName);
    setEmail(details.email);
    setBirthDate(details.dateOfBirth);
    setPhone(details.phone);
    setGender(details.gender);
    setImageUrl(details.imageUrl);
    setImage(null);
  };

  
  const changePasswordHandler = () => {
    setOpenChangePasswordDialog(true);
  };
  
  const confirmChangePassword = () => {};
  
  const closeChangePasswordHandler = () => {
    setOpenChangePasswordDialog(false);
  };

  const updateRoleHandler = async(newRole) => {
    try {
      const response = await axios.put("/accounts/" + details.email + "/role/" + newRole);
      console.log(response);
      if (response.status === 200) {
        setMessage("Change Role: Update account: " + details.email + " to " + newRole + " completed");
        setAlertType("success");
        setOpenAlertSnackbar(true);
        setDetails(response.data);
        setLoading(false);
      }
    } catch (error) {
      setMessage("Change Role: Update role failed, please try again");
      setOpenAlertSnackbar(true);
      setAlertType("error");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      axios
        .get("/accounts/" + props.match.params.email)
        .then((res) => {
          console.log(res.data);
          setDetails(res.data);
          setLoading(false);
          setRole(res.data.role)
        })
        .catch((err) => {
          setMessage(err.message);
          setOpenAlertSnackbar(true);
          setAlertType("error");
          setLoading(false);
        });
    }
  }, [details]);

  let showErrorSnackbar = null;
  let showDiscardDialog = null;
  let showImageUploadDialog = null;
  let showChangePasswordDialog = null;
  let showChangeRoleButton = null;

  if (openAlertSnackbar) {
    showErrorSnackbar = (
      <AlertSnackbar
        isOpen={openAlertSnackbar}
        close={handleCloseErrorSnackbar}
        message={message}
        alertType={alertType}
      />
    );
  }

  openDiscardDialog
    ? (showDiscardDialog = (
        <DiscardAlertDialog
          isOpen={openDiscardDialog}
          closing={closeWithoutEditHandler}
          proceed={proceedDiscardFormHandler}
        />
      ))
    : null;

  if (openPhotoUploadDialog) {
    showImageUploadDialog = (
      <PhotoUploadDialog
        isOpen={openPhotoUploadDialog}
        cancel={handleClosePhotoUploadDialog}
        confirm={handleUploadImage}
        image={image}
      />
    );
  }

  if (user.email !== details.email) {
    if (user.role.id !== role.id) {
      if (role.id === "user") {
        showChangeRoleButton = (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={() => updateRoleHandler("manager")}
            style={{ marginBottom: 10 }}
          >
            Promote to Manager
          </Button>
        );
      } else {
        showChangeRoleButton = (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            onClick={() => updateRoleHandler("user")}
            style={{ marginBottom: 10 }}
          >
            Demote to User
          </Button>
        );
      }
    }
  }

  if (openChangePasswordDialog) {
    showChangePasswordDialog = (
      <ChangePassword
        isOpen={openChangePasswordDialog}
        close={closeChangePasswordHandler}
      />
    );
  }

  let showEditForm = (
    <Card elevation={1}>
      <CardContent>
        <Box textAlign="center">
          <IconButton onClick={editAvatarHandler}>
            <Avatar
              alt="Travis Howard"
              className={classes.avatar}
              src={details.imageUrl}
            />
          </IconButton>
          <Typography variant="h4">{details.fullName}</Typography>
          <Grid container style={{ marginTop: 10 }} spacing={1}>
            <Grid item xs>
              <Paper
                className={classes.paper}
                style={{ padding: 5, color: "white", background: "#0066ff" }}
              >
                <Typography>
                  <strong>Balance Point</strong>
                </Typography>
                {details.balancePoint}
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper
                className={classes.paper}
                style={{ padding: 5, background: "#00ff99" }}
              >
                <Typography>
                  <strong>Contribution Point</strong>
                </Typography>
                {details.contributionPoint}
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper
                className={classes.paper}
                style={{ padding: 5, height: 75, background: "#ff99ff" }}
              >
                <Typography>
                  <strong>Role</strong>
                </Typography>
                <br />
                {role.id}
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="flex-start" marginTop="20px">
          <Typography gutterBottom>
            <strong>Email: </strong> {details.email}
          </Typography>
          <Divider light style={{ marginTop: 20 }} />
          <Typography style={{ marginTop: 20 }} gutterBottom>
            <strong>Date of Birth: </strong>{" "}
            {moment(details.dateOfBirth).format("MMM Do YYYY")}
          </Typography>
          <Divider light style={{ marginTop: 20 }} />
          <Typography style={{ marginTop: 20 }} gutterBottom>
            <strong>Phone number: </strong> {details.phone}
          </Typography>
          <Divider light style={{ marginTop: 20 }} />
          <Typography style={{ marginTop: 20 }} gutterBottom>
            <strong>Gender: </strong> {details.gender ? "Male" : "Female"}
          </Typography>
        </Box>
      </CardContent>
      <Divider light />
      <CardContent>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="primary"
          onClick={editProfileHandler}
          style={{ marginBottom: 10 }}
        >
          Edit Profile
        </Button>
        {showChangeRoleButton}
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={changePasswordHandler}
        >
          Change Password
        </Button>
      </CardContent>
    </Card>
  );

  if (activeEditForm) {
    showEditForm = (
      <Card elevation={1}>
        <CardContent>
          <Box textAlign="center">
            <Avatar
              alt="Travis Howard"
              className={classes.avatar}
              src={imageUrl}
            />
            <Typography variant="h4">
              <TextField
                value={fullname}
                variant="outlined"
                onChange={editFullnameHandler}
                label="Fullname"
                fullWidth
              />
            </Typography>
          </Box>
          <Box textAlign="flex-start" marginTop="40px">
            <TextField
              value={email}
              variant="outlined"
              onChange={editEmailHandler}
              label="Email Address"
              type="email"
              disabled
              fullWidth
            />
            <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="dialog"
                format="dd/MM/yyyy"
                margin="normal"
                label="Birthdate"
                value={birthDate}
                onChange={editBirthDateHandler}
                fullWidth
              />
            </MuiPickersUtilsProvider>

            <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
            <PhoneInput
              defaultCountry={"vn"}
              regions="asia"
              value={phone}
              onChange={editPhoneHandler}
              variant="outlined"
              fullWidth
            />
            <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
            <TextField
              select
              value={gender}
              onChange={editGenderHandler}
              label="Gender"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="true">Male</MenuItem>
              <MenuItem value="false">Female</MenuItem>
            </TextField>
          </Box>
        </CardContent>
        <Divider light />
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={proceedEditFormHandler}
          >
            Update Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={discardEditFormHandler}
          >
            Discard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={3} md={12} xs={12}>
          {showEditForm}
        </Grid>
        <Grid item lg={9} md={12} xs={12}>
          <ProfileSelfServices email={props.match.params.email} />
        </Grid>
        <Grid item md={12} xs={12}>
          <ProfileSelfEvents email={props.match.params.email} />
        </Grid>
      </Grid>
      {showErrorSnackbar}
      {showDiscardDialog}
      {showImageUploadDialog}
      {showChangePasswordDialog}
      {loading && (
        <CircularProgress size={60} className={classes.buttonProgress} />
      )}
    </>
  );
};

export default Profile;
