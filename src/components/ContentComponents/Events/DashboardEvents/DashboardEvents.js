import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import moment from 'moment';

import axios from '../../../../api/axios'
import { useHistory } from 'react-router-dom';

const columns = [
  {
    field: 'createDate', headerName: 'Create date', type: 'dateTime', width: 230,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>
    }
  },
  { field: 'title', headerName: 'Title', width: 250 },
  {
    field: 'category', headerName: 'Category', width: 150,
    renderCell: (params) => {
      return <p>{params.value.name}</p>
    }
  },
  {
    field: 'authorAccount', headerName: 'Host email', width: 180,
    renderCell: (params) => {
      return <p>{params.value.email}</p>
    }
  },
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
    field: 'onsite', headerName: 'Type', width: 100,
    renderCell: (params) => {
      let showOnSite = params.value
      if (showOnSite === true) {
        return (<Button variant="contained" color='primary' size="small">
          On site
        </Button>)
      } else {
        return (<Button variant="contained" color='secondary' size="small">
          Online
      </Button>)
      }
    }
  },
  {
    field: 'status', headerName: 'Status', width: 120,
    renderCell: (params) => {
      let color = 'secondary';
      let type = params.value;
      if (type.id === 1) {
        color = 'primary'
      }
      return (
        <Button variant="contained" color={color} size="small">
          {type.name}
        </Button>
      );
    }
  }
];

// const events = [
//   { id: 1, create_date: '2015-01-01 08:22:13', title: 'Tại sao Coca ở McDonald ngon hơn?', category: 'Education', host_name: 'Jon Snow', host_email: 'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', pending_slots: 10, type: 'Online' },
//   { id: 2, create_date: '2015-01-01 08:22:13', title: 'Caviar làm máy PS5 bọc 4 cân rưỡi vàng, tay cầm bọc da cá sấu, giá 499.000 USD', category: 'Education', host_name: 'Jon Snow', host_email: 'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', pending_slots: 10, type: 'Online' },
//   { id: 3, create_date: '2015-01-01 08:22:13', title: 'Snow', category: 'Education', host_name: 'Jon Snow', host_email: 'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', pending_slots: 10, type: 'On Site' },
//   { id: 4, create_date: '2015-01-01 08:22:13', title: 'Snow', category: 'Education', host_name: 'Jon Snow', host_email: 'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', pending_slots: 10, type: 'Online' },
//   { id: 5, create_date: '2015-01-01 08:22:13', title: 'Snow', category: 'Education', host_name: 'Jon Snow', host_email: 'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', pending_slots: 10, type: 'Online' },
//   { id: 6, create_date: '2015-01-01 08:22:13', title: 'Snow', category: 'Education', host_name: 'Jon Snow', host_email: 'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', pending_slots: 10, type: 'Online' },
//   { id: 7, create_date: '2015-01-01 08:22:13', title: 'Snow', category: 'Education', host_name: 'Jon Snow', host_email: 'jon@snow.com', start_date: '2015-01-01 08:22:13', end_date: '2015-01-01 08:22:13', pending_slots: 10, type: 'Online' },
// ]


const DashboardEvents = () => {

  const [events, setEvents] = React.useState([])
  // const [categories, setCategories] = React.useState([])
  const history = useHistory()

  React.useEffect(() => {
    axios.get('/api/events?page=0')
      .then(res => {
        setEvents(res.data.events)
        console.log(res.data)
      }).catch(error => {
        console.log(error.message)
      })
  }, [])

  const showEventDetails = (event) => {
    history.push('/home/events/details/' + event.row.id)
  }

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h4' }} title="Pending events" subheader="These remaining events that waits to be confirm" />
      <CardContent>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={events} columns={columns} pageSize={5} onRowClick={(rows) => showEventDetails(rows)} />
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardEvents;
