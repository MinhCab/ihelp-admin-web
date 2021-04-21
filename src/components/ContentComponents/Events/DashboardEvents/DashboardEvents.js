import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, CardHeader, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import moment from 'moment';

import axios from '../../../../api/axios'
import { useHistory } from 'react-router-dom';
import AlertSnackbar from '../../../FullLayout/UI/AlertSnackbar/AlertSnackbar';

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
            <Button variant="outlined" color='secondary' size="small">
              Online
            </Button>
          </ThemeProvider>
        )
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
];


const DashboardEvents = () => {

  const history = useHistory()
  const [events, setEvents] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [totalItems, setTotalItems] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false)
  const [error, setError] = React.useState('')

  const showEventDetails = (event) => {
    history.push('/home/events/details/' + event.row.id)
  }

  const pagingHandler = (params) => {
    setPage(params.page)
  }

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false)
  }

  React.useEffect(() => {
    if(!loading) {
      setLoading(true)
      axios
        .get("/api/events/status/2?page=" + page)
        .then((res) => {
          setTotalItems(res.data.totalItems);
          setEvents(res.data.events);
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
        }); 
    }
  }, [page, totalItems])
  
  let showErrorSnackbar = null
  if(openErrorSnackbar) {
    showErrorSnackbar = (
      <AlertSnackbar 
        isOpen={openErrorSnackbar} 
        close={handleCloseErrorSnackbar}
        alertType='error'
        message={error}
      />
    )
  }

  return (
    <>
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: "h4" }}
          title="Pending events"
          subheader="These remaining events that waits to be confirm"
        />
        <CardContent>
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={events}
              columns={columns}
              pageSize={10}
              onRowClick={(rows) => showEventDetails(rows)}
              pagination
              paginationMode="server"
              onPageChange={pagingHandler}
              rowCount={totalItems}
              autoHeight="true"
              loading={loading}
            />
          </div>
        </CardContent>
      </Card>
      {showErrorSnackbar}
    </>
  );
}

export default DashboardEvents;
