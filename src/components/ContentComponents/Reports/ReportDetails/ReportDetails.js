import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'

const ReportDetails = (props) => {
    const details = props.details
    return (
        <Dialog open={props.isOpen} onClose={props.close}>
            <DialogTitle>
                    <h3>
                        Report from <a href={`/home/users/${details.email}`}>{details.email}</a>
                    </h3>
                    <strong>Created date: </strong> {details.createdDate}
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom >
                    {details.comment}
                </Typography>
            </DialogContent>
        </Dialog>
    )
}

export default ReportDetails
