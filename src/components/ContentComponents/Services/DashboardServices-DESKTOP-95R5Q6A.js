import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, CardHeader } from '@material-ui/core';

import axios from '../../../api/axios'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'createDate', headerName: 'Create date', type: 'dateTime', width: 130 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'host_name', headerName: 'Host by', width: 130 },
  { field: 'host_email', headerName: 'Email', width: 130 }, 
  { field: 'startDate', headerName: 'Start date', width: 130 },
  { field: 'end_date', headerName: 'End date', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  // {
  //   field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName')} ${params.getValue('lastName')}`,
  // },
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

const getRowClicked = rows => {
  return console.log(rows.row.id)
}

const DashboardServices = () => {

  const [services, setServices] = useState([])

  useEffect(() => {
    axios.get('services')
      .then(res => {
        setServices(res.data)
        console.log('Services: ' + res.data)
      })
  }, [])

  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h4' }} title="Pending services" subheader="These remaining services that waits to be confirm" />
      <CardContent>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={services} columns={columns} pageSize={5} onRowClick={(rows) => getRowClicked(rows)}/>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardServices;
