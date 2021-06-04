import { TextField } from '@material-ui/core'
import { CardActions } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { CardContent } from '@material-ui/core'
import { Card } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import React from 'react'

const EditRequirement = (props) => {
  const [reqDetails, setReqDetails] = React.useState(props.details)
  const [openEdit, setOpenEdit] = React.useState(false)

  const handleRequirementDetails = (event) => {
    setReqDetails(event.target.value)
  }

  const editHandler = () => {
    setOpenEdit(true)
  }

  const saveHandler = (event) => {
    event.preventDefault()
    if (!props.isNew) {
      setOpenEdit(false)
    }
    props.save(reqDetails, props.count)
  }

  const removeHandler = () => {
    if(props.isNew) {
      props.close()
    } else {
      props.delete(props.count)
    }
  }

  let editForm = (
    <form onSubmit={saveHandler}>
      <CardContent>
        <TextField
          required
          variant="outlined"
          value={reqDetails}
          onChange={handleRequirementDetails}
          label={`Requirement ${props.count}`}
          fullWidth
        />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          type='submit'
        >
          Save
      </Button>
      <Button
          color="secondary"
          variant="outlined"
          onClick={removeHandler}
        >
          Remove
      </Button>
      </CardActions>
    </form>
  )

  let normalForm = (
    <Grid container item xs>
      <Grid item xs>
        <CardContent>
          <strong>Additional {props.count}: </strong> {reqDetails}
        </CardContent>
      </Grid>
      <Grid item>
        <IconButton onClick={editHandler}>
          <CreateIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
  
  let showForm = null
  if(props.isNew || openEdit) {
    showForm = editForm
  } else {
    showForm = normalForm
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      {showForm}
    </Card>
  );
}

export default EditRequirement
