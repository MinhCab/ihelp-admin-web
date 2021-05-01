import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, MenuItem, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import PhoneInput from 'material-ui-phone-number'
import DateFnsUtils from "@date-io/date-fns";
import React, { useState } from 'react'
import moment from 'moment';

const CreateUser = (props) => {
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [gender, setGender] = useState(true)
    const [birthDate, setBirthDate] = useState()
    const [phone, setPhone] = useState('')
    // const [sendEmail, setSendEmail] = useState(true)

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

    // const sendEmailHandler = () => {
    //     setSendEmail(!sendEmail)
    // }

    const createUserHandler = (event) => {
        event.preventDefault()
        const newUser = {
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
                  disableToolbar
                  variant="dialog"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Birthdate"
                  value={birthDate}
                  onChange={birthDateHandler}
                  fullWidth
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
              {/* <FormControlLabel
                value="start"
                control={<Checkbox value={sendEmail} onChange={sendEmailHandler} color="primary" />}
                label="Send email to user "
                labelPlacement="start"
              /> */}
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
