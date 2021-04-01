import React, {useEffect, useState} from 'react';
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
    TextField
  } from '@material-ui/core';

import profileimg from '../../../../assets/images/avatar/user_1.png'
import axios from '../../../../api/axios'
import AlertSnackbar from '../../../FullLayout/UI/AlertSnackbar/AlertSnackbar';
const useStyles = makeStyles({
    avatar: {
        height:100,
        width:100,
        margin:'0 auto',
        marginBottom:10
    }
  })

  const Profile = (props) => {
    const classes = useStyles();
    const [details, setDetails] = useState({});
    const [error, setError] = useState()
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
    
      const handleChange = (event) => {
        setdetails({
          ...details,
          [event.target.name]: event.target.value
        });
      };

      const handleCloseErrorSnackbar = () => {
          setOpenErrorSnackbar(false)
      }

      useEffect(() => {
          axios.get('/accounts/' + props.match.params.email )
            .then(res => {
                console.log(res.data)
                setDetails(res.data)
            }).catch(err => {
                setError(err.message)
                setOpenErrorSnackbar(true)
            })
      }, [])

      let showErrorSnackbar = null
      if(openErrorSnackbar) {
          <AlertSnackbar
            isOpen={openErrorSnackbar}
            close={handleCloseErrorSnackbar}
            message={error}
            alertType='error'
          />
      }

    return (
      <>
        <Grid container spacing={3}>
          <Grid item lg={3} md={12} xs={12}>
            <Card elevation={1}>
              <CardContent>
                <Box textAlign="center">
                  <Avatar
                    alt="Travis Howard"
                    className={classes.avatar}
                    src={details.imageUrl}
                  />
                  <Typography variant="h4">{details.fullname}</Typography>
                  <Typography variant="body2">{details.email}</Typography>
                </Box>
              </CardContent>
              <Divider light/>
              <CardContent>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  color="secondary"
                >
                  Contact me
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item lg={9} md={12} xs={12}>
                <Card elevation={1}>
                    <CardHeader titleTypographyProps={{variant:'h4' }} title="Edit Profile" subheader="change the setting you want"/>
                    <CardContent>
                    <form autoComplete="off" noValidate >
                            <Grid  container spacing={3} >
                                <Grid item md={12} xs={12} >
                                <TextField
                                    fullWidth
                                    label="First name"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    value={details.firstName}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    value={details.lastName}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={details.email}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    value={details.phone}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    onChange={handleChange}
                                    required
                                    value={details.country}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                <TextField
                                    fullWidth
                                    label="Select State"
                                    name="state"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={details.state}
                                    variant="outlined"
                                >
                                    <option value="India"> India </option>
                                    <option value="USA"> USA </option>
                                    <option value="Canada"> Canada </option>
                                </TextField>
                                </Grid>
                            </Grid>
                            
                            
                            <Box
                            display="flex"
                            justifyContent="flex-start"
                            mt={3}
                            >
                            <Button
                                color="primary"
                                variant="contained"
                            >
                                Save details
                            </Button>
                            </Box>
                        
                        </form>
                    </CardContent>
                </Card>
            </Grid> */}
        </Grid>
        {showErrorSnackbar}
      </>
    );
}
 
export default Profile;