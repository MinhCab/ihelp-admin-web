import { Button, Card, CardContent, CardHeader, createMuiTheme, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, ThemeProvider } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router'
import ClearIcon from '@material-ui/icons/Clear';

import axios from '../../../api/axios'
import { DiscardAlertDialog } from '../../FullLayout/UI/AlertDialog/AlertDialog'
import AlertSnackbar from '../../FullLayout/UI/AlertSnackbar/AlertSnackbar'
import CreateService from './CreateService/CreateService'

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
        field: 'createDate', headerName: 'Create date', type: 'dateTime', width: 180,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'accountEmail', headerName: 'Host email', width: 250 },
    { field: 'fullName', headerName: 'Host name', width: 220 },
    {
        field: 'startDate', headerName: 'Start date', width: 180,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    {
        field: 'endDate', headerName: 'End date', width: 180,
        renderCell: (params) => {
            return <p>{moment(params.value).format("MMM Do YYYY")}</p>
        }
    },
    { field: 'spot', headerName: 'Slots', width: 100 },
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

const Services = () => {
  const history = useHistory();
  const [services, setServices] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const [search, setSearch] = React.useState('')

  const [loading, setLoading] = React.useState(false);
  const [openDiscard, setOpenDiscard] = React.useState(false)
  const [openCreateServiceDialog, setOpenCreateServiceDialog] = React.useState(false)
  const [openAlertSnackbar, setOpenAlertSnackbar] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [alertType, setAlertType] = React.useState('')

  const loadServices = () => {
    axios
      .get("/api/services?page=" + page)
      .then((res) => {
        setTotalItems(res.data.totalItems);
        setServices(res.data.services);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    if (!loading) {
      setLoading(true)
      if (search.length <= 0) {
        loadServices()
      } else {
        searchAPI()
      }
    }
  }, [page, totalItems, search]);

  const showServiceDetails = (event) => {
    history.push("/home/services/" + event.row.id);
  };

  const pagingHandler = (params) => {
    setPage(params.page);
  };

  const searchHandler = (event) => {
    setSearch(event.target.value)
  }

  const createServiceHandler = () => {
    setOpenCreateServiceDialog(true);
  };

  const handleCancelDiscard = () => {
    setOpenDiscard(false);
  };

  const handleProceedDiscard = () => {
    setOpenCreateServiceDialog(false)
    setOpenDiscard(false)
  };

  const closeCreateServiceDialogHandler = () => {
    setOpenDiscard(true)
  }

  const handleCloseAlertSnackbar = () => {
      setOpenAlertSnackbar(false)
  }

  const searchAPI = () => {
    axios.get('/api/services/title/' + search + "?page=" + page)
    .then((res) => {
      setTotalItems(res.data.totalItems);
      setServices(res.data.services);
      setLoading(false)
    }).catch(err => {
      setServices([])
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

  const submitCreateServiceHandler = (service) => {
    axios
      .post("/api/services", service)
      .then((res) => {
        setMessage(res.data)
        setAlertType('success')
        setOpenAlertSnackbar(true)
        setOpenCreateServiceDialog(false)
        setPage(0)
        setTotalItems(0)
        loadServices()
      })
      .catch((err) => {
        setOpenAlertSnackbar(true)
        setMessage('Create Service: Cannot create this service, please try again')
        setAlertType('error')
      });
  }

  let showDiscard = null
  let showCreateServiceDialog = null
  let alertSnackbar = null

  if(openCreateServiceDialog) {
      showCreateServiceDialog = (
        <CreateService
          isOpen={openCreateServiceDialog}
          close={closeCreateServiceDialogHandler}
          submit={submitCreateServiceHandler}
        />
      );
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
                  onClick={createServiceHandler}
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
          title="Services"
          subheader="Services on iHelp system"
        />
        <CardContent>
          <div style={{ height: 650, width: "100%" }}>
            <DataGrid
              rows={services}
              columns={columns}
              pageSize={10}
              onRowClick={(rows) => showServiceDetails(rows)}
              pagination
              onPageChange={pagingHandler}
              paginationMode="server"
              rowCount={totalItems}
              loading={loading}
              autoHeight
            />
          </div>
        </CardContent>
      </Card>
      {alertSnackbar}
      {showCreateServiceDialog}
      {showDiscard}
    </>
  );
}

export default Services