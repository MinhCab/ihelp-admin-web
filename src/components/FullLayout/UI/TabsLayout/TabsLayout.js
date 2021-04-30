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
            {props.type === 'event' ? (<Tab label="Participants" />) : (<Tab label="Service Users" />)}
            <Tab label="Feedbacks" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <Participants
            type={props.type}
            participantDetails={props.participantDetails}
            id={props.id}
            basePoint={props.basePoint}
          />
          <Feedbacks
            type={props.type}
            feedbackDetails={props.feedbackDetails}
            id={props.id}
          />
        </SwipeableViews>
      </div>
    );
}

export default TabsLayout
