import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Participant from './Participant/Participant'

import axios from '../../../../api/axios'
import AlertSnackbar from '../../../FullLayout/UI/AlertSnackbar/AlertSnackbar'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: 20,
        justifyContent: 'space-between',
        
    },
}))

const Participants = (props) => {
    const classes = useStyles()
    // const [participants, setParticipants] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState('')
    // const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

    // const handleCloseErrorSnackbar = () => {
    //     setOpenErrorSnackbar(false)
    // }

    // useEffect(() => {
    //     if(!loading) {
    //         setLoading(true)
    //         axios.get("/ihelp/accounts/event/" + props.eventID)
    //         .then((res) => {
    //           console.log(res);
    //           setParticipants(res.data)
    //           setLoading(false)
    //         }).catch(err => {
    //             console.log(err.message)
    //             setError('Participants error: Cannot get information from server, please try again')
    //             setOpenErrorSnackbar(true)
    //             setLoading(false)
    //         })
    //     }
    // }, [])

    // let showErrorSnackbar = null
    // if(openErrorSnackbar) {
    //     <AlertSnackbar
    //       isOpen={openErrorSnackbar}
    //       close={handleCloseErrorSnackbar}
    //       alertType="error"
    //       message={error}
    //     />;
    // }

    return (
        <>
      <Grid container item xs className={classes.root}>
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        <Participant />
        {/* {participants.map(par => {
            return (<Participant key={par.email} infor={par} />)
        })} */}
      </Grid>
      {/* {showErrorSnackbar} */}
      </>
    );
}

export default Participants
