import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, CardHeader, createMuiTheme, ThemeProvider } from '@material-ui/core';
import moment from 'moment'
import Button from '@material-ui/core/Button'

import axios from '../../../../api/axios'
import { useHistory } from 'react-router';
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
    field: 'createDate', headerName: 'Create date', type: 'dateTime', width: 180,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>
    }
  },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'fullName', headerName: 'Host name', width: 150 },
  { field: 'accountEmail', headerName: 'Host email', width: 150 },
  {
    field: 'startDate', headerName: 'Start date', width: 180,
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
];

const DashboardServices = () => {

  const history = useHistory()
  const [services, setServices] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [totalItems, setTotalItems] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false)
  }

  React.useEffect(() => {
    if(!loading) {
      setLoading(true)
      axios
        .get("/api/services/status/2?page=" + page)
        .then((res) => {
          setTotalItems(res.data.totalItems);
          setServices(res.data.services);
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
        });
    }
  }, [page, totalItems])

  const showServiceDetails = (event) => {
    history.push('/home/services/' + event.row.id)
  }

  const pagingHandler = (params) => {
    setPage(params.page)
  }

  let showErrorSnackbar = null
  if(openErrorSnackbar) {
    <AlertSnackbar 
      isOpen={openErrorSnackbar}
      close={handleCloseErrorSnackbar}
      alertType='error'
      message={error}
    />
  }

  return (
    <>
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: "h4" }}
          title="Pending services"
          subheader="These remaining services that waits to be confirm"
        />
        <CardContent>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={services}
              columns={columns}
              pageSize={10}
              onRowClick={(rows) => showServiceDetails(rows)}
              pagination
              paginationMode="server"
              onPageChange={pagingHandler}
              rowCount={totalItems}
              loading={loading}
            />
          </div>
        </CardContent>
      </Card>
      {showErrorSnackbar}
    </>
  );
}

export default DashboardServices;
