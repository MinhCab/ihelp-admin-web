import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, CardHeader, createMuiTheme, ThemeProvider } from '@material-ui/core';
import moment from 'moment'
import Button from '@material-ui/core/Button'

import axios from '../../../../api/axios'
import { useHistory } from 'react-router';

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
  {
    field: 'serviceType', headerName: 'Service Type', width: 150,
    renderCell: (params) => {
      return <p>{params.value.name}</p>
    }
  },
  {
    field: 'accountEmail', headerName: 'Host email', width: 150
  },
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

// const services = [
//   { id: 1, create_date: '2015-01-01 08:22:13', title: 'Snow', host_name: 'Jon Snow', host_email:'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', category: 'Food'},
//   { id: 2, create_date: '2015-01-01 08:22:13', title: 'Snow', host_name: 'Jon Snow', host_email:'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', category: 'Food'},
//   { id: 3, create_date: '2015-01-01 08:22:13', title: 'Snow', host_name: 'Jon Snow', host_email:'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', category: 'Food'},
//   { id: 4, create_date: '2015-01-01 08:22:13', title: 'Snow', host_name: 'Jon Snow', host_email:'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', category: 'Food'},
//   { id: 5, create_date: '2015-01-01 08:22:13', title: 'Snow', host_name: 'Jon Snow', host_email:'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', category: 'Food'},
//   { id: 6, create_date: '2015-01-01 08:22:13', title: 'Snow', host_name: 'Jon Snow', host_email:'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', category: 'Food'},
//   { id: 7, create_date: '2015-01-01 08:22:13', title: 'Snow', host_name: 'Jon Snow', host_email:'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', category: 'Food'},
// ]

const DashboardServices = () => {

  const [services, setServices] = React.useState([])

  const history = useHistory()

  React.useEffect(() => {
    axios.get('/api/services/status/2')
      .then(res => {
        console.log(res)
        setServices(res.data)
      }).catch(err => {
        console.log(err.message)
      })
  }, [])

  const showServiceDetails = (event) => {
    history.push('/home/services/' + event.row.id)
  }

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h4' }} title="Pending services" subheader="These remaining services that waits to be confirm" />
      <CardContent>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={services} columns={columns} pageSize={5} onRowClick={(rows) => showServiceDetails(rows)} />
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardServices;
