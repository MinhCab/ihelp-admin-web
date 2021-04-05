import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, makeStyles, Paper, Popover, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import React from 'react'
import { useHistory } from 'react-router';

import axios from "../../../../api/axios"
import noImage from '../../../../assets/images/no-image.jpg'
import TabsLayout from '../../../FullLayout/UI/TabsLayout/TabsLayout';
import ParticipantDetails from '../../Users/Participants/ParticipantDetails/ParticipantDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'auto',
        flex: '1 1 auto',
        width: '100%',
        padding: '25px'
    },

    media: {
        width: '600px',
        height: '400px',
    },

    Typography: {
        paddingBottom: '10px',
    },

    description: {
        paddingBottom: '10px',
        width: '100%',
        maxWidth: 1000
    },

    title: {
        paddingBottom: '10px'
    },

    side: {
        justifyContent: 'flex-end'
    },

    sidecontent: {
        paddingBottom: '30px',
        justifyContent: 'flex-end'
    },

    chips: {
        margin: theme.spacing(0.5),
    },

    settings: {
        width: '97%',
        margin: 2
    }
}))

const ServiceDetail = (props) => {

    const classes = useStyles();
    const history = useHistory()
    const [openEditDialog, setOpenEditDialog] = React.useState(false)
    const [openFeedbackDetails, setOpenFeedbackDetails] = React.useState(false)
    const [openParticipantDetails, setOpenParticipantDetails] = React.useState(false)

    const [details, setDetails] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [status, setStatus] = React.useState({})
    const [images, setImages] = React.useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [participantDetails, setParticipantDetails] = React.useState({})

    React.useEffect(() => {
        axios.get("/api/services/" + props.match.params.id)
            .then(res => {
                setDetails(res.data)
                setCategories(res.data.categories)
                setStatus(res.data.status)
                setImages(res.data.images)
                console.log(res.data)
            }).catch(error => {
                console.log(error.message)
            })
    }, [])

    const approveEventHandler = () => {
        console.log('Approve service clicked')
        axios.put('/api/services/' + props.match.params.id + '/3')
            .then(res => {
                window.location.reload();
            }).catch(error => {
                console.log(error.message)
            })
    }

    const rejectEventHandler = () => {
        console.log('Reject service clicked')
        axios.put('/api/services/' + props.match.params.id + '/6')
            .then(res => {
                window.location.reload()
            }).catch(error => {
                console.log(error.message)
            })
    }

    const disableEventHandler = () => {
        console.log('Disable service clicked')
        axios.put('/api/services/' + props.match.params.id + '/5')
            .then(res => {
                window.location.reload();
            }).catch(error => {
                console.log(error.message)
            })
    }

    const finishEventHandler = () => {
        console.log('Finish service clicked')
        axios.put('/api/services/' + props.match.params.id + '/4')
            .then(res => {
                window.location.reload();
            }).catch(error => {
                console.log(error.message)
            })
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenEditDialog(false)
    };

    const editHandler = () => {
        // const { serviceDetails } = React.useContext(StoreContext) //cách lấy ra nhưng phải sử dụng reducer để thay đổi giá trị
        console.log('Edit service clicked')
        setOpenEditDialog(true)
    }

    const deleteHandler = () => {
        console.log('Delete service clicked')
        axios.delete('/api/services/' + props.match.params.id)
            .then(res => {
                console.log(res)
                history.goBack()
            }).catch(err => {
                console.log(err.message)
            })
    }

    const handleUpdateProcess = (updateDetails) => {
      
    }

    const handleParticipantDetails = (details) => {
      console.log('participant ' + details.email + ' clicked')
      setParticipantDetails(details)
      setOpenParticipantDetails(true)
    }

    const handleCloseParticipantDetails = () => {
      setParticipantDetails(null)
      setOpenParticipantDetails(false)
    }

    const handleFeedbackDetails = (details) => {
      console.log('feedback clicked')
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

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const username = getCookie('userEmail')

    // let showOnsite = <Button color='primary' variant='contained'>Online</Button>
    let approveBtn = <Button startIcon={<ThumbUpIcon />} color="primary" variant='contained' onClick={approveEventHandler}>Approve</Button>
    let rejectBtn = <Button startIcon={<ThumbDownIcon />} color="secondary" variant='contained' onClick={rejectEventHandler}>Reject</Button>
    let finishBtn = <Button startIcon={<CheckCircleIcon />} color="primary" variant='contained' onClick={finishEventHandler}>Finish this service</Button>
    let disableBtn = <Button startIcon={<CancelIcon />} color="secondary" variant='contained' onClick={disableEventHandler}>Disable this service</Button>
    let showActionBtns = null
    let deleteBtn = null
    let editDialog = null
    let showParticipantDetails = null
    let showImages = (
        <CardMedia
            className={classes.media}
            image={noImage}
            title="No image"
            key='no-image'
        />
    )

    if (status.name === "Pending") {
      deleteBtn = (
        <Button
          className={classes.settings}
          color="secondary"
          variant="outlined"
          onClick={deleteHandler}
        >
          Delete
        </Button>
      );

      if (username !== details.accountEmail) {
        showActionBtns = (
          <div>
            <CardActions>
              {approveBtn}
              {rejectBtn}
            </CardActions>
          </div>
        );
      }
    } else if (status.name === "Approved") {
      showActionBtns = (
        <Grid item container xs className={classes.Typography}>
          <CardActions>{disableBtn}</CardActions>
        </Grid>
      );
    } else if (status.name === "In progress") {
      showActionBtns = (
        <Grid item container xs className={classes.Typography}>
          <CardActions>{finishBtn}</CardActions>
        </Grid>
      );
    }

    if (images.length !== 0) {
      showImages = images.map((img) => {
        return (
          <CardMedia
            className={classes.media}
            image={img.url}
            title="Event image"
            key={img.imageId}
          />
        );
      });
    }

    if(openEditDialog) {
        editDialog = (
            <EditEvent infor={details} isOpen={openEditDialog} close={handleClose} update={handleUpdateProcess}/>
        )
    }

    if(openParticipantDetails) {
      showParticipantDetails = (
        <ParticipantDetails
          isOpen={openParticipantDetails}
          close={handleCloseParticipantDetails}
          details={participantDetails}
        />
      )
    }

    return (
        <>
        <Card className={classes.root}>
          <Grid container spacing={4}>
            <Grid item>{showImages}</Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <CardHeader
                  title={
                    <Typography
                      className={classes.title}
                      variant="h1"
                      color="textPrimary"
                      component="h1"
                    >
                      {details.title}
                    </Typography>
                  }
                  subheader={
                    <Grid item xs>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        component="span"
                      >
                        <strong>Created on: </strong>{" "}
                        {moment(details.createdDate).format("MMMM Do YYYY")}
                      </Typography>
                    </Grid>
                  }
                />

                <CardContent>
                  <Grid item container xs className={classes.Typography}>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                    >
                      <strong>Service start from: </strong>{" "}
                      {moment(details.startDate).format("MMMM Do YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item container xs className={classes.Typography}>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                    >
                      <strong>Location: </strong> {details.location}
                    </Typography>
                  </Grid>
                  <Grid item container xs className={classes.Typography}>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                    >
                      <strong>Category: </strong>
                      {categories.map((cate) => {
                        return (
                          <Chip
                            style={{ margin: "5px" }}
                            color="primary"
                            variant="outlined"
                            label={cate.name}
                            key={cate.id}
                          />
                        );
                      })}
                    </Typography>
                  </Grid>

                  <Grid item container xs className={classes.Typography}>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                    >
                      <strong>Status: </strong>
                      <Chip
                        color="primary"
                        variant="outlined"
                        label={status.name}
                      />
                    </Typography>
                  </Grid>
                  <Grid item container xs className={classes.Typography}>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                    >
                      <strong>Pending slots: </strong> {details.spot}
                    </Typography>
                  </Grid>
                  <Grid item container xs className={classes.Typography}>
                    <Typography
                      variant="body1"
                      color="primary"
                      component="span"
                    >
                      <strong>Points for this service: {details.point}</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    xs
                    className={classes.description}
                    wrap="nowrap"
                  >
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="span"
                    >
                      {details.description}
                    </Typography>
                  </Grid>
                </CardContent>
                {showActionBtns}
              </Grid>
              <Grid item>
                <Grid item container xs className={classes.side}>
                  <CardActions className={classes.side}>
                    <IconButton onClick={handleClick}>
                      <MoreVert aria-label="settings" />
                    </IconButton>
                  </CardActions>
                </Grid>
                <Grid item container xs className={classes.sidecontent}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <strong>by: </strong> <a href={`/home/users/${details.accountEmail}`}>{details.accountEmail}</a>
                  </Typography>
                </Grid>
                <Grid item className={classes.side}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <strong>to: </strong>{" "}
                    {moment(details.endDate).format("MMMM Do YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <TabsLayout type='service' id={props.match.params.id} participantDetails={handleParticipantDetails} feedbackDetails={handleFeedbackDetails}/>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Paper style={{ maxWidth: "auto", textAlign: "center" }}>
              <Button
                className={classes.settings}
                color="primary"
                variant="outlined"
                onClick={editHandler}
              >
                Edit
              </Button>
              {deleteBtn}
            </Paper>
          </Popover>
        </Card>
        {editDialog}
        {showParticipantDetails}
      </>
    );
}

export default ServiceDetail