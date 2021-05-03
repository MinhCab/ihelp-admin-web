import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@material-ui/core'
import { firebase } from '../../../../../api/Firebase/firebase-config'
import 'firebase/auth'
import React from 'react'
import OTP from './OTP/OTP'

const ChangePassword = (props) => {
    const [password, setPassword] = React.useState()
    const [newPassword, setNewPassword] = React.useState()
    const [confirmPassword, setConfirmPassword] = React.useState()
    const [openOTP, setOpenOTP] = React.useState(false)

    const [errorMessage, setErrorMessage] = React.useState()
    
    const editPasswordHandler = (event) => {
      setPassword(event.target.value)
    }
    
    const editNewPasswordHandler = (event) => {
      setNewPassword(event.target.value)
    }
    
    const editConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.target.value)
    }

    const closeOTPHandler = () => {
      setOpenOTP(false)
    }

    //OTP & Recaptcha
    const confirmChangePass = (event) => {
      event.preventDefault();
      if (password === newPassword) {
            setErrorMessage("New password cannot be the same with the old ones");
          } else if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password must be matched");
          } else {
            let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
            let number = props.phone;
            firebase
              .auth()
              .signInWithPhoneNumber(number, recaptcha)
              .then(function (e) {
                let code = prompt(
                  "Enter the OTP has been sent to the phone number: " +
                    props.phone
                );
                e.confirm(code)
                  .then(function (result) {
                    if (!code) {
                      setErrorMessage(
                        "The OTP is not inputted please try again later"
                      );
                      props.close;
                      return;
                    }
                    let changePassInfo = {
                      email: props.userEmail,
                      newPassword: newPassword,
                      oldPassword: password,
                    };
                    props.confirm(changePassInfo);
                    console.log(result.user, "user");
                  })
                  .catch((err) => {
                    setErrorMessage(err.message);
                    console.log(err);
                  });
              });
          }
    }

    let showErrorMessage = null
    if(errorMessage) {
      showErrorMessage = (
        <p style={{color: 'red'}}>{errorMessage}</p>
      )
    }

    let showOTP = null
    if(openOTP) {
      showOTP = (
        <OTP 
          isOpen={showOTP}
          close={closeOTPHandler}
          phone={props.phone}
          confirm={onVerifyCodeSubmit}
        />
      )
    }

    return (
      <>
        <Dialog
          open={props.isOpen}
          onClose={props.close}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <strong style={{ fontSize: 20 }}>Change Password</strong>
          </DialogTitle>
          <label></label>
          <form onSubmit={confirmChangePass}>
            <DialogContent>
              <Box textAlign="flex-start">
                <TextField
                  value={password}
                  variant="outlined"
                  onChange={editPasswordHandler}
                  label="Current password"
                  type="password"
                  required
                  fullWidth
                />
                <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
                <TextField
                  value={newPassword}
                  variant="outlined"
                  onChange={editNewPasswordHandler}
                  label="New password"
                  type="password"
                  required
                  fullWidth
                />
                <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
                <TextField
                  value={confirmPassword}
                  variant="outlined"
                  onChange={editConfirmPasswordHandler}
                  label="Confirm new password"
                  type="password"
                  required
                  fullWidth
                />
                <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
                <div id="recaptcha"></div>
              </Box>
              {showErrorMessage}
            </DialogContent>

            <DialogActions>
              <Button variant="contained" onClick={props.close} color="primary">
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Change password
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {showOTP}
      </>
    );
}

export default ChangePassword
