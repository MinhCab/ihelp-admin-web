import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'

const FeedbackDetails = (props) => {
    const details = props.details
    const status = props.details.status

    let showValidatingButtons = null
    if(status.id === 2) {
        showValidatingButtons = (
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.validateFeedback(3, details.id)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => props.validateFeedback(6, details.id)}
            >
              Reject
            </Button>
          </DialogActions>
        );
    }

    return (
        <Dialog open={props.isOpen} onClose={props.close}>
            <DialogTitle>
                    <p style={{fontSize: 20}}>
                        <strong>Feedback from </strong><a href={`/home/users/${details.email}`}>{details.email}</a>
                    </p>
                    <strong>Created date: </strong> {details.createdDate}
                    <br/>
                    <strong>Status: </strong> {status.name}
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom >
                    {details.comment}
                </Typography>
            </DialogContent>
            {showValidatingButtons}
        </Dialog>
    )
}

export default FeedbackDetails
