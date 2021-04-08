import React from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Avatar,
  makeStyles,
  CircularProgress
} from '@material-ui/core';

import Logo from '../../FullLayout/Logo/LogoIcon'
import axios from '../../../api/axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../hoc/StoringAuth/AuthContext';
import AlertSnackbar from '../../FullLayout/UI/AlertSnackbar/AlertSnackbar';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
// import { requestFirebaseNotificationPermission } from '../../../api/Firebase/firebase-config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100vh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  fonts: {
    fontSize: 40
  },
  badge: {
    margin: '0 auto',
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: 30
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
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

const Login = () => {
  const classes = useStyles();
  const history = useHistory()
  const { setAccessToken, loadInfo } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [alertType, setAlertType] = React.useState('')
  const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  })

  const getCookie = (cname) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  // //This function is for getting the FCM token for firebase to send notification
  // const getFCMTokenFromFirebase = () => {
  //   requestFirebaseNotificationPermission()
  //   .then((firebaseToken) => {
  //     console.log('firebaseToken: ' + firebaseToken)
  //     setFcmToken(firebaseToken)
  //   }).catch(err => {
  //     console.log(err)
  //     return err
  //   })
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const loginInfo = {
        email: email,
        password: password
      }
  
      axios.post('/login', loginInfo)
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            saveTokenAndEmailToCookies(res.data.accessToken, email);
            setAccessToken(res.data.accessToken);
            // getFCMTokenFromFirebase()
            loadInfo()
            setSuccess(true);
            setLoading(false);
            history.push("/home/dashboard");
            console.log("token: " + getCookie("accessToken"));
          }
        }).catch(error => {
          if (error.message === 'Request failed with status code 400') {
            setErrorMessage('Invalid username & password')
            setAlertType("error");
            setLoading(false);
            setOpenAlertSnackbar(true)
          } else {
            setErrorMessage('Network error, please try again later')
            setAlertType("error");
            setLoading(false);
            setOpenAlertSnackbar(true)
          }
          return
        })
    }

  }

  const saveTokenAndEmailToCookies = (token, userEmail) => {
    document.cookie = 'accessToken=' + token;
    document.cookie = 'userEmail=' + userEmail
  }

  const handleInput = (event) => {
    setEmail(event.target.value)

  }
  const handleInputPass = (event) => {
    setPassword(event.target.value)
  }

  const handleCloseAlertSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlertSnackbar(false);
  }

  let showError = null;
  let alertSnackbar = null

  if (errorMessage) {
    showError = <p>{errorMessage.message}</p>
  }

  if (openAlertSnackbar) {
    alertSnackbar = (
      <AlertSnackbar 
        message={errorMessage}
        isOpen={openAlertSnackbar}
        close={handleCloseAlertSnackbar}
        alertType={alertType}
      />
    )
  }

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        textAlign="center"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Avatar className={classes.badge}>
            <Logo />
          </Avatar>
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
            className={classes.fonts}
          >
            Login
          </Typography>

          <Box p={3}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Box p={2}>
                <TextField
                  fullWidth
                  id="username"
                  onChange={handleInput}
                  value={email}
                  required
                  label="Username"
                  variant="outlined"
                />
              </Box>
              <Box p={2}>
                <TextField
                  fullWidth
                  id="password"
                  onChange={handleInputPass}
                  value={password}
                  required
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </Box>
              <Box p={2}>
                <div className={classes.wrappper}>
                  <Button
                    className={buttonClassname}
                    fullWidth
                    size="large"
                    disabled={!email || !password}
                    type="submit"
                    color="primary"
                    variant="contained"
                    disableElevation
                  >
                    Login
                  </Button>
                  {loading && <CircularProgress size={60} className={classes.buttonProgress} />}
                </div>
              </Box>
            </form>
            <Box p={2}>{showError}</Box>
          </Box>
        </Container>
      </Box>
      {alertSnackbar}
    </div>
  );
};

export default Login;
