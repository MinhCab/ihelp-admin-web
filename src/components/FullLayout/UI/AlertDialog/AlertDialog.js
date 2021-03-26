import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import React from 'react'

const DiscardAlertDialog = (props) => {
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.closing}
        >
            <DialogTitle>Your inputted information will be lost, do you still want to proceed?</DialogTitle>
            <DialogActions>
                <Button onClick={props.closing} variant='outlined' color="inherit" autoFocus>
                    Cancel
                </Button>
                <Button onClick={props.proceed} color="secondary">
                    Discard
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const StatusAlertDialog = (props) => {

    return (
      <Dialog open={props.isOpen} onClose={props.closing}>
        <DialogTitle>
          {status}
        </DialogTitle>
      </Dialog>
    );
}

export { DiscardAlertDialog, StatusAlertDialog };