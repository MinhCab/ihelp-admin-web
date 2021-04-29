import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@material-ui/core'
import React from 'react'

const ChangePassword = (props) => {
    const [password, setPassword] = React.useState()
    const [newPassword, setNewPassword] = React.useState()
    const [confirmPassword, setConfirmPassword] = React.useState()

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

    const confirmChangePass = (event) => {
      event.preventDefault()

      if (password === newPassword) {
        setErrorMessage("New password cannot be the same with the old ones");
      } else if (newPassword !== confirmPassword) {
        setErrorMessage("New password and confirm password must be matched");
      } else {
        let changePassInfo = {
          email: props.userEmail,
          newPassword: newPassword,
          oldPassword: password,
        };
        props.confirm(changePassInfo);
      }
    }

    let showErrorMessage = null
    if(errorMessage) {
      showErrorMessage = (
        <p style={{color: 'red'}}>{errorMessage}</p>
      )
    }

    return (
      <Dialog open={props.isOpen} onClose={props.close} fullWidth maxWidth="sm">
        <DialogTitle>
          <strong style={{ fontSize: 20 }}>Change Password</strong>
        </DialogTitle>
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
            </Box>
            {showErrorMessage}
          </DialogContent>
          
          <DialogActions>
            <Button variant="contained" onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button variant="contained" type='submit' color="primary">
              Change password
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
}

export default ChangePassword
