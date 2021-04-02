import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@material-ui/core'
import React from 'react'

const ChangePassword = (props) => {
    return (
      <Dialog open={props.isOpen} onClose={props.close} fullWidth="true" maxWidth="sm">
        <DialogTitle > <strong style={{fontSize: 20}}>Change Password</strong></DialogTitle>
        <DialogContent>
          <Box textAlign="flex-start">
            <TextField
              // value={email}
              variant="outlined"
              // onChange={editEmailHandler}
              label="Current password"
              type="password"
              fullWidth
            />
            <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
            <TextField
              // value={phone}
              variant="outlined"
              // onChange={editPhoneHandler}
              label="New password"
              type="password"
              fullWidth
            />
            <Divider light style={{ marginTop: 20, marginBottom: 20 }} />
            <TextField
              // value={phone}
              variant="outlined"
              // onChange={editPhoneHandler}
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
