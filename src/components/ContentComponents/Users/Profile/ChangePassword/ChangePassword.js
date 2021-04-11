import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@material-ui/core'
import React from 'react'

const ChangePassword = (props) => {
    const [password, setPassword] = React.useState()
    const [newPassword, setNewPassword] = React.useState()
    const [confirmPassword, setConfirmPassword] = React.useState()
    
    const editPasswordHandler = (event) => {
      setPassword(event.target.value)
    }
    
    const editNewPasswordHandler = (event) => {
      setNewPassword(event.target.value)
    }
    
    const editConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.target.value)
    }

    return (
      <Dialog open={props.isOpen} onClose={props.close} fullWidth="true" maxWidth="sm">
        <DialogTitle > <strong style={{fontSize: 20}}>Change Password</strong></DialogTitle>
        <DialogContent>
          <Box textAlign="flex-start">
            <TextField
              value={password}
              variant="outlined"
              onChange={editPasswordHandler}
              label="Current password"
              type="password"
              fullWidth
            />
            <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
            <TextField
              value={newPassword}
              variant="outlined"
              onChange={editNewPasswordHandler}
              label="New password"
              type="password"
              fullWidth
            />
            <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
            <TextField
              value={confirmPassword}
              variant="outlined"
              onChange={editConfirmPasswordHandler}
              label="Confirm new password"
              type="password"
              fullWidth
            />
            <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button variant='contained' onClick={props.confirm} color="primary">
            Change password
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default ChangePassword
