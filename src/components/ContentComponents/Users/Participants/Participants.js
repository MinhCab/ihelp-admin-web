import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Participant from './Participant/Participant'

import axios from '../../../../api/axios'
import AlertSnackbar from '../../../FullLayout/UI/AlertSnackbar/AlertSnackbar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: 20,
    justifyContent: "space-evenly",
  },
  buttonProgress: {
    color: "#039be5",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

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
        .get("/accounts/" + props.type +"/" + props.id)
        .then((res) => {
          setParticipants(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response.data.message);
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
      return <Participant basePoint={props.basePoint} type={props.type} key={par.email} infor={par} viewDetails={props.participantDetails}/>;
    });
  }

  return (
    <>
      {loading && (
        <CircularProgress size={60} className={classes.buttonProgress} />
      )}
      <Grid container item xs className={classes.root}>
        {showParticipants}
      </Grid>
      {showErrorSnackbar}
    </>
  );
}

export default Participants
