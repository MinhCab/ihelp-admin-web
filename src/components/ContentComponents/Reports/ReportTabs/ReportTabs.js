import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views'
import React from 'react'
import GeneralReports from '../GeneralReports/GeneralReports';
import AllReports from '../AllReports/AllReports';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      marginTop: 20
    }
  }));

const ReportTabs = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="General Reports" />
            <Tab label="All Reports" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <GeneralReports showReportDetails={props.showReportDetails}/>
          <AllReports showReportDetails={props.showReportDetails} />
        </SwipeableViews>
      </div>
    );
}

export default ReportTabs
