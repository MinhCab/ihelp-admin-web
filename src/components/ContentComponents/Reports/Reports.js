import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import React, { useState } from 'react'
import ReportDetails from './ReportDetails/ReportDetails';

const columns = [
  {
    field: "createdDate",
    headerName: "Created Date",
    width: 250,
    renderCell: (params) => {
      return <p>{moment(params.value).format("MMM Do YYYY")}</p>;
    },
  },
  { field: "email", headerName: "Author email", width: 250 },
  { field: "comment", headerName: "Comment content", width: 1000}
];

const reports = [
    { id: 1, createdDate: 'March 25, 2020', email: 'test2', comment: 'This is sucks' },
    { id: 2, createdDate: 'March 25, 2020', email: 'admin@gmail.com', comment: 'This is not so sucks' },
    { id: 3, createdDate: 'March 25, 2020', email: 'admin@gmail.com', comment: 'This is kooL' }
]

const Reports = () => {

    // const [reports, setReports] = useState([])
    const [reportDetails, setReportDetails] = useState(null)
    const [openReportDetails, setOpenReportDetails] = useState(false)
    // const [error, setError] = useState(null)
    // const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

    const showReportDetails = (event) => {
        setReportDetails(event.row)
        setOpenReportDetails(true)
    }

    const closeReportDetailsHandler = () => {
        setOpenReportDetails(false)
    }

    let showDetails = null
    openReportDetails ? showDetails = (<ReportDetails isOpen={openReportDetails} close={closeReportDetailsHandler} details={reportDetails} />) : null

    return (
      <>
        <Card>
          <CardHeader
            title={
              <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item>
                  {/* <SearchBar 
                                value={search}
                                onChange={(event) => setSearch(event.value)}
                                onRequestSearch={handleSearchRequest}
                            /> */}
                </Grid>
              </Grid>
            }
          />
          <CardHeader
            titleTypographyProps={{ variant: "h4" }}
            title="Reports"
            subheader="All of the reports on iHelp system"
          />
          <CardContent>
            <div style={{ height: 650, width: "100%" }}>
              <DataGrid
                rows={reports}
                columns={columns}
                pageSize={10}
                onRowClick={(rows) => showReportDetails(rows)}
                // pagination
                // paginationMode='server'
                // onPageChange={pagingHandler}
                // rowCount={totalItems}
              />
            </div>
          </CardContent>
        </Card>
        {showDetails}
      </>
    );
}

export default Reports
