import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views'
import React from 'react'
import Participants from '../../../ContentComponents/Users/Participants/Participants';
import Feedbacks from '../../../ContentComponents/Feedbacks/Feedbacks';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      marginTop: 20
    }
  }));

const TabsLayout = (props) => {
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
            <Tab label="Participants" />
            <Tab label="Feedbacks" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          {/* <TabPanel content="Item One" />
          <TabPanel content="Iten Two" /> */}
          <Participants eventID={props.eventID}/>
          <Feedbacks eventID={props.eventID}/>
        </SwipeableViews>
      </div>
    );
}

export default TabsLayout
