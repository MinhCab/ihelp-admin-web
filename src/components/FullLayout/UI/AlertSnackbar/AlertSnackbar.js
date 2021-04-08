import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const AlertSnackbar = (props) => {
    return (
      <Snackbar
        open={props.isOpen}
        autoHideDuration={6000}
        onClose={props.close}
      >
        <Alert onClose={props.close} severity={props.alertType}>
          {props.message}
        </Alert>
      </Snackbar>
    );
}

export default AlertSnackbar