import { CircularProgress, makeStyles } from '@material-ui/core'
import { DialogContent } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { DialogActions } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { Dialog } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect } from 'react'
import Requirement from './Requirement/Requirement'

const useStyles = makeStyles(theme => ({
    buttonProgress: {
        color: "#039be5",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    }
}))


const Requirements = (props) => {
    const classes = useStyles()
    
    const [reqList, setReqList] = React.useState(props.requirements)
    
    
    const addReqsHandler = () => {
    }
    
    let showEdit = <Requirement details='Có mặt đúng giờ' count='1'/> 

    return (
      <Dialog open={props.isOpen} onClose={props.close} fullWidth maxWidth='md'>
        {props.isLoading && (
          <CircularProgress size={60} className={classes.buttonProgress} />
        )}
        <DialogTitle>
          <Grid container item xs spacing={2} style={{ paddingBottom: 10 }}>
            <Grid item xs>
              <strong style={{ fontSize: 20 }}>
                Add requirements to participants
              </strong>
            </Grid>
            <Grid item>
              <Button
                className={classes.finalButton}
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
            {showEdit}
        </DialogContent>
        <DialogActions>
        <Button
                variant='outlined'
                color='primary'
                startIcon={<AddIcon />}
                onClick={addReqsHandler}
            >
                Add
            </Button>
        </DialogActions>
      </Dialog>
    );
}

export default Requirements
