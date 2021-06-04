import { CircularProgress, makeStyles } from '@material-ui/core'
import { DialogContent } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { DialogActions } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { Dialog } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect } from 'react'
import EditRequirement from './EditRequirement/EditRequirement'

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

  const [isNewReq, setIsNewReq] = React.useState(false)
  const [reqList, setReqList] = React.useState([])
  const [reqCount, setReqCount] = React.useState(0)

  const convertStringToList = (str) => {
    if (str) {
      let list = str.split('/n')
      setReqCount(list.length)
      setReqList(list)
    }
  }

  const addReqsHandler = () => {
    setIsNewReq(true)
  }

  const closeNewReqsHandler = () => {
    setIsNewReq(false)
  }

  const saveReqsHandler = () => {
    let copyList = reqList
    let reqStr = copyList.join('/n')
    props.save(reqStr)
  }

  const newReqsHandler = (details, count) => {
    setIsNewReq(false)
    let list = reqList
    list.push(details)
    setReqCount(list.length)
    setReqList(list)
  }

  const updateReqsHandler = (details, count) => {
    let list = reqList
    list.splice(count - 1, 1, details);
    setReqCount(list.length)
    setReqList(list)
  }

  const deleteReqsHandler = (count) => {
    let list = reqList
    list.splice(count - 1, 1)
    setReqCount(list.length)
    setReqList(list)
  }

  useEffect(() => {
    convertStringToList(props.requirements)
  }, [])

  let showEdit = null
  reqCount >> 0 ? showEdit = (reqList.map((req, index) => {
    return <EditRequirement key={req} details={req} count={index + 1} isNew={false} delete={deleteReqsHandler} save={updateReqsHandler} />
  })) : null

  let showAdd = null
  if (isNewReq) {
    showAdd = (
      <EditRequirement details='' count={reqCount + 1} save={newReqsHandler} isNew={isNewReq} close={closeNewReqsHandler} />
    )
  }

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
              onClick={saveReqsHandler}
            >
              Save
              </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {showEdit}
        {showAdd}
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
