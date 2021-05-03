import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import React from 'react'

const OTP = (props) => {
    const [otp, setOTP] = React.useState('')

    const editOTPHandler = (event) => {
        setOTP(event.target.value)
    }
    
    const confirmChange = () => {
        props.confirm(otp)
    }

    return (
        <Dialog open={props.isOpen} onClose={props.close} fullWidth maxWidth='md'>
            <DialogTitle>Enter the OTP has been sent to this phone number: {props.phone}</DialogTitle>
            <DialogContent>
                <TextField fullWidth type='number' variant='outlined' value={otp} onChange={editOTPHandler} />
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmChange}>Verify user</Button>
            </DialogActions>
        </Dialog>
    )
}

export default OTP
