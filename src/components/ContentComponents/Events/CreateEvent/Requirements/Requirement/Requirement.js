import { TextField } from '@material-ui/core'
import { CardContent } from '@material-ui/core'
import { Card } from '@material-ui/core'
import React from 'react'

const Requirement = (props) => {
    const [reqDetails, setReqDetails] = React.useState(props.details)

    const handleRequirementDetails = (event) => {
        setReqDetails(event.target.value)
    }
    return (
      <Card>
        <CardContent>
          <TextField
            variant="outlined"
            value={reqDetails}
            onChange={handleRequirementDetails}
            label={`Requirement ${props.count}`}
            fullWidth
          />
        </CardContent>
      </Card>
    );
}

export default Requirement
