import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Participant from './Participant/Participant'

import axios from '../../../../api/axios'
import AlertSnackbar from '../../../FullLayout/UI/AlertSnackbar/AlertSnackbar'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: 20,
        justifyContent: 'space-evenly',
    },
}))

const Participants = (props) => {
  const classes = useStyles();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      axios
        .get("/accounts/" + props.participantType +"/" + props.id)
        .then((res) => {
          console.log(res);
          setParticipants(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(
            "Participants error: Cannot get information from server, please try again"
          );
          setOpenErrorSnackbar(true);
          setLoading(false);
        });
    }
  }, []);

  let showErrorSnackbar = null;
  let showParticipants = <p>No participants available</p>;
  if (openErrorSnackbar) {
    <AlertSnackbar
      isOpen={openErrorSnackbar}
      close={handleCloseErrorSnackbar}
      alertType="error"
      message={error}
    />;
  }

  if (participants.length !== 0) {
    showParticipants = participants.map((par) => {
      return <Participant key={par.email} infor={par} viewDetails={props.participantDetails}/>;
    });
  }

  return (
    <>
      <Grid container item xs className={classes.root}>
          {showParticipants}
          {/* <Participant viewDetails={props.participantDetails}/> */}
      </Grid>
      {showErrorSnackbar}
    </>
  );
}

export default Participants
