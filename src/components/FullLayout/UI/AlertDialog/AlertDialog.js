import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import React from 'react'
import { TextArea } from 'semantic-ui-react'

const useStyles = makeStyles((theme) => ({
    descriptionField: {
        width: "100%",
        height: "100px",
        padding: theme.spacing(0.5),
        fontSize: 20,
    },
}))

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

const RejectReasonDialog = (props) => {
    const classes = useStyles()
    const [reason, setReason] = React.useState('')

    const reasonHandler = (event) => {
        setReason(event.target.value)
    }

    const submitReason = (event) => {
        event.preventDefault()
        props.rejected(reason, props.id)
    }

    return (
        <Dialog fullWidth='true' maxWidth='md' open={props.isOpen} onClose={props.closing}>
            <DialogTitle>Can you give us a reason why this will be rejected</DialogTitle>
            <form onSubmit={submitReason}>
            <DialogContent>
                <TextArea className={classes.descriptionField} fullWidth value={reason} onChange={reasonHandler} />
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={props.closing}>Cancel</Button>
                <Button color="secondary" variant="outlined" type='submit'>Reject</Button>
            </DialogActions>
            </form>
        </Dialog>
    )
}

export { DiscardAlertDialog, StatusAlertDialog, RejectReasonDialog };