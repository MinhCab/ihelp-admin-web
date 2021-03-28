import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, CardHeader, createMuiTheme, ThemeProvider } from '@material-ui/core';
import moment from 'moment'
import Button from '@material-ui/core/Button'

import axios from '../../../../api/axios'
import { useHistory } from 'react-router';
import AlertSnackbar from '../../../FullLayout/UI/AlertSnackbar/AlertSnackbar';

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#76ff03',
    },
    inherit: {
      main: '#7c4dff',
    },
    secondary: {
      main: '#2979ff',
    },
    default: {
      main: '#ff1744',
    }
  }
})

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
      let stats = params.value;
      let color = 'default'
      if (stats.id === 1) {
        color = 'secondary'
      } else if (stats.id === 2) {
        color = 'inherit'
      } else if (stats.id === 3) {
        color = 'primary'
      }
      return (
        <ThemeProvider theme={buttonTheme}>
          <Button variant="contained" color={color} size="small">
            {stats.name}
          </Button>
        </ThemeProvider>

      );
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
          console.log(res.data);
          setTotalItems(res.data.totalItems);
          setServices(res.data.services);
          setLoading(false)
        })
        .catch((err) => {
          console.log(err.message);
          setError('Cannot get information from server, please try again')
          setOpenErrorSnackbar(true)
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
            />
          </div>
        </CardContent>
      </Card>
      {showErrorSnackbar}
    </>
  );
}

export default DashboardServices;
