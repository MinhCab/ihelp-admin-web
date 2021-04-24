import { Button, Card, CardContent, CardHeader, createMuiTheme, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import ClearIcon from '@material-ui/icons/Clear';

import axios from '../../../api/axios'
import { DiscardAlertDialog } from '../../FullLayout/UI/AlertDialog/AlertDialog'
import AlertSnackbar from '../../FullLayout/UI/AlertSnackbar/AlertSnackbar'
import CreateEvent from './CreateEvent/CreateEvent'

const additionalButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#008c3a",
    },
    secondary: {
      main: "#039be5",
    },
  },
});

const additionalButtonTheme2 = createMuiTheme({
  palette: {
    primary: {
      main: "#4aedc4",
    },
  },
});


const columns = [
  {
    field: 'createDate', headerName: 'Create date', type: 'dateTime', width: 230,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>
    }
  },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'fullName', headerName: 'Host name', width: 150 },
  { field: 'authorEmail', headerName: 'Host email', width: 180 },
  {
    field: 'startDate', headerName: 'Start date', width: 200,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>
    }
  },
  {
    field: 'endDate', headerName: 'End date', width: 200,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>
    }
  },
  { field: 'spot', headerName: 'Slots', width: 90 },
  {
    field: 'isOnsite', headerName: 'Type', width: 100,
    renderCell: (params) => {
      let showOnSite = params.value
      if (showOnSite === true) {
        return (
          <Button variant="outlined" color="primary" size="small">
            On site
          </Button>
        );
      } else {
        return (
          <ThemeProvider theme={additionalButtonTheme}>
            <Button variant="outlined" color="primary" size="small">
              Online
                    </Button>
          </ThemeProvider>
        );
      }
    }
  },
  {
    field: 'status', headerName: 'Status', width: 120,
    renderCell: (params) => {
      let type = params.value;
      if (type.id === 3) {
        return (
          <ThemeProvider theme={additionalButtonTheme}>
            <Button variant="contained" color='primary' size="small">
              {type.name}
            </Button>
          </ThemeProvider>
        );
      } else if (type.id === 2) {
        return (
          <ThemeProvider theme={additionalButtonTheme}>
            <Button variant="contained" color="secondary" size="small">
              {type.name}
            </Button>
          </ThemeProvider>
        );
      } else if (type.id === 4) {
        return (
          <Button variant="contained" color='primary' size="small">
            {type.name}
          </Button>
        )
      } else if (type.id === 5) {
        return (
          <Button variant="contained" color="inherit" size="small">
            {type.name}
          </Button>
        );
      } else if (type.id === 6) {
        return (
          <Button variant="contained" color='secondary' size="small">
            {type.name}
          </Button>
        )
      } else {
        return (
          <ThemeProvider theme={additionalButtonTheme2}>
          <Button variant="contained" color='primary' size="small">
            {type.name}
          </Button>
          </ThemeProvider>
        )
      }
    }
  }
]

const Events = () => {
  const history = useHistory()
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const [openAlertSnackbar, setOpenAlertSnackbar] = useState(false)
  const [openCreateEventDialog, setOpenCreateEventDialog] = useState(false)
  const [openDiscard, setOpenDiscard] = useState(false)

  const openCreateEventDialogHandler = () => {
    setOpenCreateEventDialog(true)
  }

  const closeCreateEventDialogHandler = () => {
    setOpenDiscard(true)
  }

  const handleProceedDiscard = () => {
    setOpenCreateEventDialog(false)
    setOpenDiscard(false)
  }

  const submitCreateEventHandler = (event) => {
    axios
      .post("/api/events", event)
      .then((res) => {
        setMessage(res.data)
        setAlertType('success')
        setOpenAlertSnackbar(true)
        setOpenCreateEventDialog(false)
        setPage(0)
        setTotalItems(0)
        loadEvents()
      })
      .catch((err) => {
        setMessage(err.response.data.message)
        setAlertType('error')
        setOpenAlertSnackbar(true)
      });
  }

  const handleCancelDiscard = () => {
    setOpenDiscard(false)
  }

  const showEventDetails = (event) => {
    history.push('/home/events/details/' + event.row.id)
  }

  const pagingHandler = (params) => {
    setPage(params.page)
  }

  const searchHandler = (event) => {
    setSearch(event.target.value)
  }

  const handleCloseAlertSnackbar = () => {
    setOpenAlertSnackbar(false)
  }

  const searchAPI = () => {
    axios.get('/api/events/title/' + search + "?page=" + page)
    .then((res) => {
      console.log(res.data);
      setTotalItems(res.data.totalItems);
      setEvents(res.data.events);
      setLoading(false)
    }).catch(err => {
      setEvents([])
      setLoading(false)
    });
  }

  const confirmSearchHandler = (event) => {
    event.preventDefault()
    setPage(0)
    searchAPI()
  }

  const clearSearchHandler = () => {
    setSearch('')
  }

  const loadEvents = () => {
    axios
      .get("/api/events?page=" + page)
      .then((res) => {
        setTotalItems(res.data.totalItems);
        setEvents(res.data.events);
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Cannot get information from server, please try again");
        setAlertType("error");
        setOpenAlertSnackbar(true);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true)
      if (search.length <= 0) {
        loadEvents()
      } else {
        searchAPI()
      }
    }
  }, [page, totalItems, search]);

  let alertSnackbar = null
  let showCreateEventDialog = null
  let showDiscard = null
  if (openAlertSnackbar) {
    alertSnackbar = (
      <AlertSnackbar
        isOpen={openAlertSnackbar}
        close={handleCloseAlertSnackbar}
        alertType={alertType}
        message={message}
      />
    )
  }

  if (openCreateEventDialog) {
    showCreateEventDialog = (
      <CreateEvent
        isOpen={openCreateEventDialog}
        close={closeCreateEventDialogHandler}
        submit={submitCreateEventHandler}
      />
    )
  }

  if (openDiscard) {
    showDiscard = (
      <DiscardAlertDialog
        isOpen={openDiscard}
        closing={handleCancelDiscard}
        proceed={handleProceedDiscard}
      />
    );
  }

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Grid container spacing={3}>
              <Grid item xs>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={openCreateEventDialogHandler}
                >
                  Create
                </Button>
              </Grid>
              <Grid item>
                <form onSubmit={confirmSearchHandler}>
                  <FormControl variant="outlined">
                    <InputLabel>Search</InputLabel>
                    <OutlinedInput
                      value={search}
                      onChange={searchHandler}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={clearSearchHandler} edge="end">
                            {search.length > 0 ? <ClearIcon /> : null}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          }
        />
        <CardHeader
          titleTypographyProps={{ variant: "h4" }}
          title="Events"
          subheader="Events from the iHelp volunteers"
        />
        <CardContent>
          <div style={{ height: 650, width: "100%" }}>
            <DataGrid
              rows={events}
              columns={columns}
              pageSize={10}
              onRowClick={(rows) => showEventDetails(rows)}
              pagination
              onPageChange={pagingHandler}
              paginationMode="server"
              rowCount={totalItems}
              autoHeight
              loading={loading}
            />
          </div>
        </CardContent>
      </Card>
      {alertSnackbar}
      {showCreateEventDialog}
      {showDiscard}
    </>
  );
}

export default Events