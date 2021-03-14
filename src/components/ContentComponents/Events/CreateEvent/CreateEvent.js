import { Button, Card, CardContent, CardHeader, Grid, makeStyles, Typography, TextField, MenuItem, Select, Input, Switch, FormControlLabel, Snackbar } from '@material-ui/core'
import moment from 'moment'
import React, { useEffect } from 'react'
import { enGB } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Form, TextArea } from 'semantic-ui-react'

import axios from '../../../../api/axios'
import { Alert } from '@material-ui/lab'


const useStyles = makeStyles(theme => ({
    finalButton: {
        margin: theme.spacing(0.5)
    },

    titleField: {
        fontSize: 60
    }
}))

const CreateEvent = () => {
    const classes = useStyles()
    const [openAlert, setOpenAlert] = React.useState(false)
    const [categories, setCategories] = React.useState([])

    const [title, setTitle] = React.useState('')
    const [startDate, setStartDate] = React.useState()
    const [endDate, setEndDate] = React.useState()
    const [category, setCategory] = React.useState('')
    const [quota, setQuota] = React.useState(1)
    const [point, setPoint] = React.useState(0)
    const [onSite, setOnSite] = React.useState(true)
    const [location, setLocation] = React.useState('')
    const [description, setDescription] = React.useState('')

    const handleTitleInput = (event) => {
        setTitle(event.target.value)
    }

    const handleCategoryInput = (event) => {
        setCategory(event.target.value)
    }

    const handleQuotaInput = (event) => {
        setQuota(event.target.value)
    }

    const handlePointInput = (event) => {
        setPoint(event.target.value)
    }

    const handleOnsiteTypeInput = () => {
        setOnSite(!onSite)
    }

    const handleLocationInput = (event) => {
        setLocation(event.target.value)
    }

    const handleDescriptionInput = (event) => {
        setDescription(event.target.value)
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleCreateEvent = () => {
        let realLocation = location

        if (onSite === false) {
            realLocation = 'Online'
        }

        event = {
            authorEmail: author,
            categoryId: category,
            description: description,
            endDate: new Date(endDate).setUTCMilliseconds(),
            id: "",
            images: [],
            location: realLocation,
            onsite: onSite,
            point: point,
            quota: quota,
            startDate: new Date(startDate).setUTCMilliseconds(),
            statusId: 2,
            title: title
        }

        axios.post('/api/events', event)
            .then(res => {
                console.log(res)
                showAlert = (
                    <Alert onClose={handleCloseAlert} severity="success">
                        {res.data}
                    </Alert>
                )
                setOpenAlert(true)
            }).catch(err => {
                console.log(err)
                showAlert = (
                    <Alert onClose={handleCloseAlert} severity="error">
                        {err.message}
                    </Alert>
                )
                setOpenAlert(true)
            })
    }

    const getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    useEffect(() => {
        axios.get('/api/event-category')
            .then(res => {
                console.log(res.data)
                setCategories(res.data)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    const author = getCookie('userEmail')
    const createdDate = new Date()
    let event = null
    let showType = 'On site'
    let showAlert = null
    let showLocationField = (
        <Grid item>
            <Typography variant='body1' color='textPrimary' component='span'>
                <strong>Location: </strong>
                <Input id='txtLocation' value={location} onChange={(event) => handleLocationInput(event)} />
            </Typography>

        </Grid>
    )

    if (onSite === false) {
        showType = 'Online'
        showLocationField = null
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title={
                        <Grid container item xs spacing={2} style={{ paddingBottom: 10 }}>
                            <Grid item xs>
                                <Typography variant="h1" color="textPrimary" component="h2">
                                    <Input className={classes.titleField} placeholder='Title' id='txtEventTitle' value={title} onChange={(event) => handleTitleInput(event)} />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button className={classes.finalButton} color='primary' variant='contained' onClick={handleCreateEvent}>Create</Button>
                                <Button className={classes.finalButton} color='secondary' variant='contained'>Discard</Button>
                            </Grid>
                        </Grid>
                    }

                    subheader={
                        <Grid container item xs spacing={2}>
                            <Grid item xs>
                                <strong>Created on: </strong> {moment(createdDate).format('MMM Do YYYY')}
                            </Grid>
                            <Grid item>
                                <strong>by: </strong> {author}
                            </Grid>
                        </Grid>
                    }
                />

                <CardContent>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        minimumDate={new Date()}
                        minimumLength={1}
                        format='dd MMM yyyy'
                        locale={enGB}
                    >
                        {({ startDateInputProps, endDateInputProps, focus }) => (
                            <Grid item container xs spacing={3} style={{ marginBottom: 20 }}>
                                <Grid item xs>
                                    <Typography variant="body1" color="textPrimary" component="span">
                                        <strong>This event starts: </strong>
                                        <TextField
                                            className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                            {...startDateInputProps}
                                            placeholder='from'
                                            variant='outlined'
                                        />

                                        <ArrowForwardIcon style={{ margin: '10 10 auto' }} />

                                        <TextField
                                            className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                            {...endDateInputProps}
                                            placeholder='to'
                                            variant='outlined'
                                        />
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </DateRangePicker>
                    <Grid item container xs spacing={3}>
                        <Grid item xs>
                            <Typography variant="body1" color="textPrimary" component="span" style={{ marginRight: 10 }}>
                                <strong>Category: </strong>
                            </Typography>

                            <Select
                                id="txtCategory"
                                variant='outlined'
                                value={category}
                                select='true'
                                onChange={(event) => handleCategoryInput(event)}
                            >
                                {categories.map(cate => {
                                    return <MenuItem key={cate.id} value={cate.id} >{cate.name}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item container xs spacing={3} style={{ marginTop: 20 }}>
                        <Grid item xs>
                            <Typography variant="body1" color="textPrimary" component="span" style={{ marginRight: 10 }}>
                                <strong>Number of participants: </strong>
                            </Typography>
                            <TextField
                                id="txtQuota"
                                variant="outlined"
                                type='number'
                                InputProps={{ inputProps: { min: 1 } }}
                                style={{ maxWidth: 100 }}
                                onChange={(event) => handleQuotaInput(event)}
                                value={quota}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary" component="span" style={{ marginRight: 10 }}>
                                <strong>Points per participant: </strong>
                            </Typography>
                            <TextField
                                id="txtPoint"
                                variant="outlined"
                                type='number'
                                InputProps={{ inputProps: { min: 0 } }}
                                style={{ maxWidth: 100 }}
                                onChange={(event) => handlePointInput(event)}
                                value={point}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs spacing={3} style={{ marginTop: 20 }}>
                        <Grid item xs>
                            <Typography variant='body1' color='textPrimary' component='span' style={{ marginRight: 10 }}>
                                <strong>Event's type: </strong>
                                <FormControlLabel
                                    control={<Switch name="onSiteType" checked={onSite} onChange={handleOnsiteTypeInput} color="primary" />}
                                    label={showType}
                                    labelPlacement="end"
                                />
                            </Typography>
                        </Grid>
                        {showLocationField}
                    </Grid>
                    <Grid item container spacing={3} style={{ marginTop: 20 }}>
                        <Grid item xs={12}>
                            <Form>
                                <TextArea placeholder='Description' value={description} style={{ width: '100%', padding: 10 }} onChange={(event) => handleDescriptionInput(event)} />
                            </Form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                {showAlert}
            </Snackbar>
        </React.Fragment>
    )
}

export default CreateEvent