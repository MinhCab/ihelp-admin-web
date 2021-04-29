import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button'

import axios from '../../../api/axios'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'create_date', headerName: 'Create date', type: 'dateTime', width: 230 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'category.name', headerName: 'Category', width: 150 },
  { field: 'host_name', headerName: 'Host by', width: 150 }, 
  { field: 'accountEmail', headerName: 'Email', width: 150 },
  { field: 'startDate', headerName: 'Start date', width: 200 },
  { field: 'endDate', headerName: 'End date', width: 200 },
  { field: 'spot', headerName: 'Slots', width: 100 },
  {
    field: 'status.name', headerName: 'Status', width: 120,
    renderCell: (params) => {
      let color = 'primary';
      let type = params.value;
      return (
        <Button variant="contained" color={color} size="small">
          {type}
        </Button>
      );
    }
  }
  // {
  //   field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName')} ${params.getValue('lastName')}`,
  // },
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

const getRowsValue = (event) => { console.log(event.row.id) }

const DashboardEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('events')
      .then(res => {
        setEvents(res.data)
        console.log(res)
      })
  }, [])

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h4' }} title="Pending events" subheader="These remaining events that waits to be confirm" />
      <CardContent>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={events} columns={columns} pageSize={5} onRowClick={(rows) => getRowsValue(rows)}/>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardEvents;
