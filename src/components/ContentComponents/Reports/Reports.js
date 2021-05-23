import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import React, { useState } from 'react'
import AlertSnackbar from '../../FullLayout/UI/AlertSnackbar/AlertSnackbar'
import ReportTabs from './ReportTabs/ReportTabs'
import ReportDetails from './ReportDetails/ReportDetails'

const Reports = () => {
    
    const [error, setError] = useState(null)
    const [reportDetails, setReportDetails] = useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
    const [openReportDetails, setOpenReportDetails] = useState(false)

    const handleCloseErrorSnackbar = () => {
      setOpenErrorSnackbar(false)
    }

    const closeReportDetailsHandler = () => {
      setOpenReportDetails(false);
    }

    const showReportDetailsHandler = (details) => {
      setReportDetails(details)
      setOpenReportDetails(true)
    }

    let showErrorSnackbar = null
    if(openErrorSnackbar) {
      showErrorSnackbar = (
        <AlertSnackbar 
          isOpen={openErrorSnackbar}
          close={handleCloseErrorSnackbar}
          message={error}
          alertType='error'
        />
      )
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
            <ReportTabs showReportDetails={showReportDetailsHandler}/>
          </CardContent>
        </Card>
        {showDetails}
        {showErrorSnackbar}
      </>
    );
}

export default Reports
