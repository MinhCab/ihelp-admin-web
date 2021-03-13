import { Button, Card, CardHeader, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import DashboardEvents from './DashboardEvents/DashboardEvents'


const Events = () => {
    const history = useHistory()

    const createEventHandler = () => {
        history.push('/home/events/create')
    }

    return (
        <Card>
            <CardHeader
                title={
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Button color='primary' variant='contained' onClick={createEventHandler}>Create</Button>
                        </Grid>
                        <Grid item>
                            <TextField placeholder="Search" variant='outlined' />
                        </Grid>
                    </Grid>
                }
            />
            <DashboardEvents />
        </Card>

    )
}

export default Events