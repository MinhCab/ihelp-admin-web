import React from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Avatar,
  makeStyles
} from '@material-ui/core';

import Logo from '../Logo/LogoIcon'
import axios from '../../../api/axios';
import { Redirect } from 'react-router-dom';
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
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  React.useEffect(() => {
    const token = getCookie('accessToken')
    if(token !== '') {return (<Redirect from="/login" to="/home" exact/>)}
  },[])

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginInfo = {
      email: email,
      password: password
    }

    axios.post('/login', loginInfo)
      .then(res => {
        console.log(props)
        if (res.data) {
          saveTokenAndEmailToCookies(res.data.accessToken, email)
          props.history.push('/home')
        }
      }).catch(error => {
        setErrorMessage(error.message)
        return
      })


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

  let showError = null;
  if (errorMessage) {
    showError = <p>{errorMessage}</p>
  }

  return (
    <div
      className={classes.root}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        textAlign="center"
        justifyContent="center"
      >
        <Container maxWidth="sm">

          <Avatar className={classes.badge}><Logo /></Avatar>
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
              <Box p={2}><TextField fullWidth id="username" onChange={handleInput} value={email} required label="Username" variant="outlined" /></Box>
              <Box p={2}><TextField fullWidth id="password" onChange={handleInputPass} value={password} required label="Password" variant="outlined" type="password" /></Box>
              <Box p={2}><Button fullWidth size="large" disabled={!email || !password} type="submit" color="secondary" variant="contained" disableElevation >Login</Button></Box>
            </form>

            <Box p={2}>
              {showError}
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Login;
