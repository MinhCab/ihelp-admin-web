import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, makeStyles, MenuItem, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import PhoneInput from 'material-ui-phone-number'
import DateFnsUtils from "@date-io/date-fns";
import React, { useState } from 'react'
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: '#039be5',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const CreateUser = (props) => {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [gender, setGender] = useState(true)
    const [birthDate, setBirthDate] = useState()
    const [phone, setPhone] = useState('')

    const fullnameHandler = (event) => {
        setFullname(event.target.value)
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const genderHandler = (event) => {
        setGender(event.target.value)
    }

    const birthDateHandler = (date) => {
        setBirthDate(date)
    }

    const phoneHandler = (value) => {
        setPhone(value)
    }

    const createUserHandler = (event) => {
        event.preventDefault()
        const newUser = {
          avatarUrl: null,
          dateOfBirth: moment(birthDate).format("yyyy-MM-DD"),
          email: email,
          fullName: fullname,
          gender: gender,
          password: "123",
          phone: phone,
        };
        props.submit(newUser)
    }

    return (
      <Dialog fullWidth maxWidth="xs" open={props.isOpen} onClose={props.close}>
        {props.isLoading && (
          <CircularProgress size={60} className={classes.buttonProgress} />
        )}
        <DialogTitle>
          <strong style={{ fontSize: 20 }}>Create new user</strong>
        </DialogTitle>
        <form onSubmit={createUserHandler}>
          <DialogContent>
            <Box textAlign="flex-start">
              <TextField
                required
                value={fullname}
                variant="outlined"
                onChange={fullnameHandler}
                label="Fullname"
                fullWidth
              />
              <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
              <TextField
                required
                value={email}
                variant="outlined"
                onChange={emailHandler}
                label="Email Address"
                type="email"
                fullWidth
              />
              <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  margin="normal"
                  label="Birthdate"
                  format="dd/MM/yyyy"
                  value={birthDate}
                  onChange={birthDateHandler}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  fullWidth
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>

              <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
              <PhoneInput
                required
                defaultCountry={"vn"}
                regions="asia"
                value={phone}
                onChange={phoneHandler}
                variant="outlined"
                fullWidth
              />
              <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
              <TextField
                required
                select
                value={gender}
                onChange={genderHandler}
                label="Gender"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="true">Male</MenuItem>
                <MenuItem value="false">Female</MenuItem>
              </TextField>
              <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
}

export default CreateUser
