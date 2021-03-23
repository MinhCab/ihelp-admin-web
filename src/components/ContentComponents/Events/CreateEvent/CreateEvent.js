import { Button, Card, CardContent, CardHeader, Grid, makeStyles, Typography, TextField, MenuItem, Select, Input, Switch, FormControlLabel } from '@material-ui/core'
import moment from 'moment'
import React, { useEffect } from 'react'
import { enGB } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Form, TextArea } from 'semantic-ui-react'
import { useHistory } from 'react-router'

import axios from '../../../../api/axios'
import { EventConfirmationDialog } from '../../../FullLayout/UI/ConfirmationDialog/ConfirmationDialog'
import AlertDialog from '../../../FullLayout/UI/AlertDialog/AlertDialog'
import { storage } from '../../../../api/config/firebase/FirebaseStorage/firebase-storage'
import PhotoUploadDialog from '../../../FullLayout/UI/PhotoUploadDialog/PhotoUploadDialog'

const useStyles = makeStyles(theme => ({
    finalButton: {
        margin: theme.spacing(0.5)
    },

    titleField: {
        fontSize: 60
    },

    descriptionField: {
        width: '100%',
        height: '400px',
        padding: theme.spacing(0.5),
        fontSize: 25
    },
}))

const CreateEvent = () => {
    const classes = useStyles()
    const history = useHistory()
    const [openConfirmation, setOpenConfirmation] = React.useState(false)
    const [confirmInfo, setConfirmInfo] = React.useState(null)
    const [categories, setCategories] = React.useState([])
    const [openDiscard, setOpenDiscard] = React.useState(false)
    const [image, setImage] = React.useState(null)
    const [openPhotoUpload, setOpenPhotoUpload] = React.useState(false)

    const [title, setTitle] = React.useState('')
    const [startDate, setStartDate] = React.useState()
    const [endDate, setEndDate] = React.useState()
    const [category, setCategory] = React.useState({})
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

    const handleCancelConfirmation = () => {
        console.log('Cancel clicked')
        setOpenConfirmation(false)
    }

    const handleProceedConfirmation = async () => {
        console.log('Procced clicked')

        const imageURL = await uploadImageToFirebase()

        let realLocation = location

        if (onSite === false) {
            realLocation = 'Online'
        }

        const event = {
            authorEmail: author,
            categoryId: category,
            description: description,
            endDate: new Date().getMilliseconds(endDate),
            id: "",
            location: realLocation,
            onsite: onSite,
            point: point,
            quota: quota,
            startDate: new Date().getMilliseconds(startDate),
            statusId: 2,
            title: title,
            image: {
                type: 'jpg',
                url: imageURL
            }
        }

        console.log(event)

        axios.post('/api/events', event)
            .then(res => {
                console.log(res.data)
                history.push('/home/events')
            }).catch(err => {
                console.log(err)
            })
        setOpenConfirmation(false)
    }

    const handleCreateEventButton = () => {
        let realLocation = location

        if (onSite === false) {
            realLocation = 'Online'
        }

        setConfirmInfo({
            title: title.toUpperCase(),
            startDate: startDate.toString(),
            endDate: endDate.toString(),
            category: categories.find(res => res.id === category).name,
            onsite: onSite,
            quota: quota,
            point: point,
            description: description,
            location: realLocation,
        })
        setOpenConfirmation(true)
    }

    const handleDiscardEventButton = () => {
        setOpenDiscard(true)
    }

    const handleCancelDiscard = () => {
        setOpenDiscard(false)
    }

    const handleProceedDiscard = () => {
        history.goBack()
    }

    const handleOpenPhotoUploadDialog = () => {
        setOpenPhotoUpload(true)
    }

    const handleClosePhotoUploadDialog = () => {
        setOpenPhotoUpload(false)
    }

    const handleUploadImage = (file) => {
        setImage(file)
        setOpenPhotoUpload(false)
    }

    const uploadImageToFirebase = async () => {
        return new Promise((resolve, reject) => {
            const uploadImageTask = storage.ref(`images/events/${image.name}`).put(image)
            uploadImageTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error)
                    reject('upload image to firebase - reject: ' + error)
                },
                () => {
                    storage
                        .ref("images/events/")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log('upload image to firebase - resolve: ' + url)
                            resolve(url)
                        })
                }
            )
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
                // openAlert(true)
                // const alertInfo = {
                //     type: 'error',
                //     message: err.message,
                //     isOpen: openAlert
                // }
                // setAlert.receiveMessage(alertInfo)
            })
    }, [])

    const author = getCookie('userEmail')
    const createdDate = new Date()
    let showType = 'On site'
    let showConfirmation = null
    let showDiscard = null
    let showImageName = null
    let showImageUploadDialog = null
    let showLocationField = (
        <Grid item>
            <Typography variant='body1' color='textPrimary' component='span'>
                <strong>Location: </strong>
                <Input required id='txtLocation' value={location} onChange={(event) => handleLocationInput(event)} />
            </Typography>
        </Grid>
    )

    if (onSite === false) {
        showType = 'Online'
        showLocationField = null
    }

    if (openConfirmation) {
        if (confirmInfo !== null) {
            showConfirmation = (
                <EventConfirmationDialog
                    details={confirmInfo}
                    cancel={handleCancelConfirmation}
                    proceed={handleProceedConfirmation}
                    isOpen={openConfirmation}
                />
            )
        } else {
            console.log('Event is null')
        }
    }

    if (openDiscard) {
        showDiscard = <AlertDialog
            isOpen={openDiscard}
            closing={handleCancelDiscard}
            proceed={handleProceedDiscard}
        />
    }

    if (image !== null) {
        showImageName = (
            <Typography variant='body1' color='textPrimary' component='span'>
                <strong>Uploaded photo: </strong> {image.name}
            </Typography>
        )
    }

    if (openPhotoUpload) {
        showImageUploadDialog = (
            <PhotoUploadDialog
                isOpen={openPhotoUpload}
                cancel={handleClosePhotoUploadDialog}
                confirm={handleUploadImage}
                image={image}
            />
        )
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    title={
                        <Grid container item xs spacing={2} style={{ paddingBottom: 10 }}>
                            <Grid item xs>
                                <Typography variant="h1" color="textPrimary" component="h2">
                                    <Input required className={classes.titleField} placeholder='Title' id='txtEventTitle' value={title} onChange={(event) => handleTitleInput(event)} />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button className={classes.finalButton} color='primary' variant='contained' onClick={handleCreateEventButton}>Create</Button>
                                <Button className={classes.finalButton} color='secondary' variant='contained' onClick={handleDiscardEventButton}>Discard</Button>
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
                                            required
                                            className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                            {...startDateInputProps}
                                            placeholder='from'
                                            variant='outlined'
                                        />

                                        <ArrowForwardIcon style={{ margin: '10 10 auto' }} />

                                        <TextField
                                            required
                                            className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                            {...endDateInputProps}
                                            placeholder='to'
                                            variant='outlined'
                                        />
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" color="textPrimary" component="span" style={{ marginRight: 10 }}>
                                        <strong>Cover photo: </strong>
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color="primary"
                                        onClick={handleOpenPhotoUploadDialog}
                                    >Upload File</Button>
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
                                required
                                id="txtCategory"
                                variant='outlined'
                                select='true'
                                value={category}
                                onChange={(event) => handleCategoryInput(event)}
                            >
                                {categories.map(cate => {
                                    return <MenuItem key={cate.id} value={cate.id} >{cate.name}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary" component="span" style={{ marginRight: 10 }}>
                                {showImageName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs spacing={3} style={{ marginTop: 20 }}>
                        <Grid item xs>
                            <Typography variant="body1" color="textPrimary" component="span" style={{ marginRight: 10 }}>
                                <strong>Number of participants: </strong>
                            </Typography>
                            <TextField
                                required
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
                                required
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
                                <TextArea required placeholder='Description' value={description} className={classes.descriptionField} onChange={(event) => handleDescriptionInput(event)} />
                            </Form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {showConfirmation}
            {showDiscard}
            {showImageUploadDialog}
        </React.Fragment>
    )
}

export default CreateEvent